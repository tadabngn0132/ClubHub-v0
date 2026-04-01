import { useState, useEffect, useRef, useCallback } from "react";
import { useSocket } from "../../../hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByRoom } from "../../../store/slices/messageSlice";

const Chat = ({ userId, otherUserId, otherUserName }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { emitEvent, emitEventWithAck, onEvent } = useSocket(token);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const pendingMessageIdRef = useRef(null);

  const roomId = [userId, otherUserId].sort().join("-"); // Consistent room ID

  const fetchHistory = useCallback(async () => {
    dispatch(getMessagesByRoom(roomId))
      .unwrap()
      .then((data) => {
        setMessages(data.data || []);
        pendingMessageIdRef.current = null;
        scrollToBottom();
      })
      .catch((error) => {
        console.error("Failed to load messages:", error);
      });
  }, [dispatch, roomId]);

  // Load chat history
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Listen for incoming messages
  useEffect(() => {
    return onEvent("message:receive", (message) => {
      if (message?.roomId === roomId) {
        setMessages((prev) => {
          const exists = prev.some((item) => item.id === message.id);
          if (exists) {
            return prev;
          }

          return [...prev, message];
        });
        scrollToBottom();
      }
    });
  }, [roomId, onEvent]);

  useEffect(() => {
    const unsubscribeSent = onEvent("message:sent", () => {
      // Replace temporary optimistic message by fetching canonical message list.
      fetchHistory();
    });

    return () => {
      unsubscribeSent();
    };
  }, [onEvent, fetchHistory]);

  // Listen for typing indicators
  useEffect(() => {
    const unsubscribeTyping = onEvent("user:typing", (data) => {
      if (data.senderId === otherUserId) {
        setIsOtherTyping(true);
      }
    });

    const unsubscribeStopTyping = onEvent("user:stop-typing", (data) => {
      if (data.senderId === otherUserId) {
        setIsOtherTyping(false);
      }
    });

    return () => {
      unsubscribeTyping();
      unsubscribeStopTyping();
    };
  }, [otherUserId, onEvent]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);

    // Send typing indicator
    if (!typing) {
      setTyping(true);
      emitEvent("user:typing", { receiverId: otherUserId });
    }

    // Debounce stop typing
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      emitEvent("user:stop-typing", { receiverId: otherUserId });
    }, 1000);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const content = input.trim();
    const optimisticId = `temp-${Date.now()}`;
    pendingMessageIdRef.current = optimisticId;

    const messageData = {
      receiverId: otherUserId,
      content,
      roomId,
    };

    setMessages((prev) => [
      ...prev,
      {
        id: optimisticId,
        senderId: userId,
        receiverId: otherUserId,
        roomId,
        content,
        createdAt: new Date().toISOString(),
      },
    ]);

    const ack = await emitEventWithAck("message:send", messageData);

    if (!ack?.success) {
      setMessages((prev) => prev.filter((msg) => msg.id !== optimisticId));
      pendingMessageIdRef.current = null;
      console.error("Failed to send message:", ack?.message || "Unknown error");
    }

    setInput("");
    setTyping(false);

    // Ensure typing state on server is reset after send.
    emitEvent("user:stop-typing", { receiverId: otherUserId });
  };

  useEffect(() => {
    return () => {
      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b p-4">
        <h2 className="text-lg font-semibold">{otherUserName}</h2>
        <p className="text-sm text-gray-500">Online</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.senderId === userId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.senderId === userId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <p>{msg.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {new Date(msg.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isOtherTyping && (
          <div className="flex justify-start">
            <div className="text-sm text-gray-500 italic">đang nhập...</div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Nhập tin nhắn..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default Chat;
