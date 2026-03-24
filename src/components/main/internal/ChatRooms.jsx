import { useState, useEffect } from 'react';
import { useSocket } from '../../../hooks/useSocket';

const ChatRooms = ({ userId, onSelectConversation }) => {
  const [conversations, setConversations] = useState([]);
  const { onEvent } = useSocket();

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/chat/conversations', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setConversations(data.data || []);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    }
  };

  // Listen for new messages
  useEffect(() => {
    return onEvent('message:receive', (message) => {
      fetchConversations();
    });
  }, [onEvent]);

  return (
    <div className="w-80 border-r bg-gray-50">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Tin nhắn</h1>
      </div>

      <div className="overflow-y-auto">
        {conversations.map((conv) => {
          const otherUser = conv.sender.id === userId ? conv.receiver : conv.sender;
          return (
            <div
              key={conv.roomId}
              onClick={() => onSelectConversation(otherUser.id, otherUser.fullname)}
              className="p-4 border-b hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={otherUser.avatarUrl || '/default-avatar.png'}
                  alt={otherUser.fullname}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{otherUser.fullname}</p>
                  <p className="text-xs text-gray-600 truncate">{conv.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatRooms;