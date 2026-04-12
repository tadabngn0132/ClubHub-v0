import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesByRoom,
  createNewMessage,
  resetMessageError,
} from "../../../store/slices/messageSlice";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Chat = ({ selectedRoomId }) => {
  const dispatch = useDispatch();
  const { messages, isLoading, error } = useSelector((state) => state.message);
  const { currentUser } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
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
  }, [error]);

  const handleSendMessage = async (data) => {
    if (!data.content.trim() || !selectedRoomId) return;

    dispatch(
      createNewMessage({
        ...data,
        chatRoomId: selectedRoomId,
        senderId: currentUser?.id,
      }),
    );
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
                {message.senderName?.charAt(0).toUpperCase() || "U"}
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
                  {message.senderName || "Unknown"}
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
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit(handleSendMessage)}
        className="flex gap-3 border-t border-gray-700 bg-gray-850 p-4 sm:p-5"
      >
        <input
          type="text"
          {...register("content", {
            required: "Message content is required",
          })}
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
