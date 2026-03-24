import { useState, useEffect, useRef } from 'react';
import { useSocket } from '../../../hooks/useSocket';

const Chat = ({ userId, otherUserId, otherUserName }) => {
  const { emitEvent, onEvent } = useSocket();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const roomId = [userId, otherUserId].sort().join('-'); // Consistent room ID

  // Load chat history
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          `/api/chat/history/${otherUserId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const data = await response.json();
        setMessages(data.data || []);
        scrollToBottom();
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, [otherUserId]);

  // Listen for incoming messages
  useEffect(() => {
    return onEvent('message:receive', (message) => {
      if (
        (message.senderId === otherUserId && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === otherUserId)
      ) {
        setMessages(prev => [...prev, message]);
        scrollToBottom();
      }
    });
  }, [userId, otherUserId, onEvent]);

  // Listen for typing indicators
  useEffect(() => {
    const unsubscribeTyping = onEvent('user:typing', (data) => {
      if (data.senderId === otherUserId) {
        setIsOtherTyping(true);
      }
    });

    const unsubscribeStopTyping = onEvent('user:stop-typing', (data) => {
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);

    // Send typing indicator
    if (!typing) {
      setTyping(true);
      emitEvent('user:typing', { senderId: userId, receiverId: otherUserId });
    }

    // Debounce stop typing
    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      setTyping(false);
      emitEvent('user:stop-typing', { senderId: userId, receiverId: otherUserId });
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      senderId: userId,
      receiverId: otherUserId,
      content: input,
      roomId
    };

    emitEvent('message:send', messageData);
    setInput('');
    setTyping(false);
  };

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
              msg.senderId === userId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.senderId === userId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-black'
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
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
