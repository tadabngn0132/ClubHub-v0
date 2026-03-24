import { useState } from 'react';
import ChatRooms from '../../../components/main/internal/ChatRooms';
import Chat from '../../../components/main/internal/Chat';
import { useSocket } from '../../../hooks/useSocket';

const AdminChat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { emitEvent } = useSocket();
  const userId = parseInt(localStorage.getItem('userId'));

  // Notify server when user comes online
  useEffect(() => {
    emitEvent('user:online', userId);
  }, [userId, emitEvent]);

  if (!selectedConversation) {
    return (
      <div className="flex h-screen">
        <ChatRooms
          userId={userId}
          onSelectConversation={(otherId, otherName) =>
            setSelectedConversation({ userId: otherId, name: otherName })
          }
        />
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Chọn một cuộc trò chuyện
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <ChatRooms
        userId={userId}
        onSelectConversation={(otherId, otherName) =>
          setSelectedConversation({ userId: otherId, name: otherName })
        }
      />
      <Chat
        userId={userId}
        otherUserId={selectedConversation.userId}
        otherUserName={selectedConversation.name}
      />
    </div>
  );
};

export default AdminChat;