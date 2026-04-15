import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesByRoom,
  createNewMessage,
  resetMessageError,
  receiveRealtimeMessage,
  updateRealtimeMessage,
  removeRealtimeMessage,
} from "../../../store/slices/messageSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSocket } from "../../../hooks/useSocket";

const SOCKET_EVENTS = {
  CHAT_MESSAGE_RECEIVE: "chatMessage:receive",
  CHAT_MESSAGE_UPDATE: "chatMessage:update",
  CHAT_MESSAGE_SOFT_DELETE: "chatMessage:softDelete",
  CHAT_ROOM_JOIN: "chatRoom:join",
  CHAT_ROOM_LEAVE: "chatRoom:leave",
  USER_TYPING: "user:typing",
  USER_STOP_TYPING: "user:stopTyping",
};

const Chat = ({ selectedRoomId }) => {
  const dispatch = useDispatch();
  const { messages, isLoading, error } = useSelector((state) => state.message);
  const { currentUser, token } = useSelector((state) => state.auth);
  const { emitEventWithAck, onEvent } = useSocket(token);
  const previousRoomIdRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);
  const [typingUserIds, setTypingUserIds] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      content: "",
      senderId: currentUser ? currentUser.id : null,
      chatRoomId: selectedRoomId,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (selectedRoomId) {
      dispatch(getMessagesByRoom(selectedRoomId));
    }
  }, [dispatch, selectedRoomId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetMessageError());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (!selectedRoomId) {
      previousRoomIdRef.current = null;
      setTypingUserIds([]);
      return;
    }

    const joinSelectedRoom = async () => {
      const previousRoomId = previousRoomIdRef.current;
      if (previousRoomId && previousRoomId !== selectedRoomId) {
        await emitEventWithAck(SOCKET_EVENTS.CHAT_ROOM_LEAVE, {
          chatRoomId: previousRoomId,
        });
      }

      const joinAck = await emitEventWithAck(SOCKET_EVENTS.CHAT_ROOM_JOIN, {
        chatRoomId: selectedRoomId,
      });

      if (!joinAck?.success) {
        console.warn("Join chat room failed:", joinAck?.message);
        return;
      }

      previousRoomIdRef.current = selectedRoomId;
    };

    joinSelectedRoom();

    return () => {
      const roomIdToLeave = previousRoomIdRef.current;
      if (roomIdToLeave) {
        emitEventWithAck(SOCKET_EVENTS.CHAT_ROOM_LEAVE, {
          chatRoomId: roomIdToLeave,
        });
      }
    };
  }, [emitEventWithAck, selectedRoomId]);

  const emitStopTyping = useCallback(() => {
    if (!selectedRoomId || !isTypingRef.current) return;

    emitEventWithAck(SOCKET_EVENTS.USER_STOP_TYPING, {
      chatRoomId: selectedRoomId,
    });
    isTypingRef.current = false;
  }, [emitEventWithAck, selectedRoomId]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      emitStopTyping();
    };
  }, [emitStopTyping]);

  useEffect(() => {
    const unsubscribeReceive = onEvent(
      SOCKET_EVENTS.CHAT_MESSAGE_RECEIVE,
      (payload) => {
        const incomingMessage = payload?.message;
        if (!incomingMessage || incomingMessage.roomId !== selectedRoomId)
          return;

        dispatch(receiveRealtimeMessage(incomingMessage));
      },
    );

    const unsubscribeUpdate = onEvent(
      SOCKET_EVENTS.CHAT_MESSAGE_UPDATE,
      (payload) => {
        const updatedMessage = payload?.message;
        if (!updatedMessage || updatedMessage.roomId !== selectedRoomId) return;

        dispatch(updateRealtimeMessage(updatedMessage));
      },
    );

    const unsubscribeDelete = onEvent(
      SOCKET_EVENTS.CHAT_MESSAGE_SOFT_DELETE,
      (payload) => {
        const deletedMessage = payload?.message;
        if (!deletedMessage || deletedMessage.roomId !== selectedRoomId) return;

        dispatch(removeRealtimeMessage(deletedMessage.id));
      },
    );

    const unsubscribeTyping = onEvent(SOCKET_EVENTS.USER_TYPING, (payload) => {
      const typingUserId = Number(payload?.userId);
      const typingRoomId = Number(payload?.chatRoomId);

      if (
        !typingUserId ||
        !typingRoomId ||
        typingRoomId !== Number(selectedRoomId) ||
        typingUserId === Number(currentUser?.id)
      ) {
        return;
      }

      setTypingUserIds((prev) =>
        prev.includes(typingUserId) ? prev : [...prev, typingUserId],
      );
    });

    const unsubscribeStopTyping = onEvent(
      SOCKET_EVENTS.USER_STOP_TYPING,
      (payload) => {
        const typingUserId = Number(payload?.userId);
        const typingRoomId = Number(payload?.chatRoomId);

        if (
          !typingUserId ||
          !typingRoomId ||
          typingRoomId !== Number(selectedRoomId)
        ) {
          return;
        }

        setTypingUserIds((prev) => prev.filter((id) => id !== typingUserId));
      },
    );

    return () => {
      unsubscribeReceive();
      unsubscribeUpdate();
      unsubscribeDelete();
      unsubscribeTyping();
      unsubscribeStopTyping();
    };
  }, [currentUser?.id, dispatch, onEvent, selectedRoomId]);

  const handleContentChange = useCallback(
    (event) => {
      const contentValue = event.target.value || "";
      if (!selectedRoomId) return;

      if (contentValue.trim()) {
        if (!isTypingRef.current) {
          emitEventWithAck(SOCKET_EVENTS.USER_TYPING, {
            chatRoomId: selectedRoomId,
          });
          isTypingRef.current = true;
        }

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          emitStopTyping();
        }, 1200);
      } else {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
          typingTimeoutRef.current = null;
        }
        emitStopTyping();
      }
    },
    [emitEventWithAck, emitStopTyping, selectedRoomId],
  );

  const contentField = register("content", {
    required: "Message content is required",
    onChange: handleContentChange,
  });

  const handleSendMessage = async (data) => {
    if (!data.content.trim() || !selectedRoomId) return;

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    emitStopTyping();

    dispatch(
      createNewMessage({
        ...data,
        chatRoomId: selectedRoomId,
        senderId: currentUser?.id,
      }),
    );

    reset({ content: "" });
  };

  if (!selectedRoomId) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-900 text-slate-300">
        <p className="text-lg">Please select a chat room to start messaging.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gray-900 text-slate-300">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-gray-900 text-slate-300">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 p-5 sm:p-6">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-400">
              No messages yet. Start the conversation!
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                message.senderId === currentUser?.id ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-[#db3f7a] to-[#a82d5f] flex-shrink-0 text-xs font-semibold text-white">
                {(message.sender?.fullname || message.senderName || "U")
                  .charAt(0)
                  .toUpperCase()}
              </div>

              {/* Message Bubble */}
              <div
                className={`flex max-w-xs flex-col gap-1 ${
                  message.senderId === currentUser?.id
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <p className="text-xs font-medium text-gray-400">
                  {message.sender?.fullname || message.senderName || "Unknown"}
                </p>
                <div
                  className={`rounded-xl px-4 py-2.5 transition duration-200 ${
                    message.senderId === currentUser?.id
                      ? "bg-gradient-to-r from-[#db3f7a] to-[#a82d5f] text-white"
                      : "bg-gray-800 text-slate-300"
                  }`}
                >
                  <p className="break-words text-sm">{message.content}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {message.createdAt
                    ? new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>
            </div>
          ))
        )}

        {typingUserIds.length > 0 && (
          <div className="text-xs italic text-gray-400">
            {typingUserIds.length === 1
              ? "Someone is typing..."
              : `${typingUserIds.length} people are typing...`}
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex gap-3 border-t border-gray-700 bg-gray-850 p-4 sm:p-5"
      >
        <input
          type="text"
          {...contentField}
          placeholder="Type your message..."
          className="flex-1 rounded-lg bg-gray-800 px-4 py-2.5 text-slate-300 placeholder-gray-500 transition duration-200 focus:border-[#db3f7a] focus:outline-none focus:ring-2 focus:ring-[#db3f7a]/30"
        />

        <button
          type="submit"
          disabled={!!errors.content || !selectedRoomId}
          className="rounded-lg bg-gradient-to-r from-[#db3f7a] to-[#a82d5f] px-6 py-2.5 font-medium text-white transition duration-200 hover:from-[#a82d5f] hover:to-[#7a1f47] disabled:cursor-not-allowed disabled:opacity-50 active:scale-95"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
