import { useState } from 'react';
import ChatRooms from '../../../components/main/internal/ChatRooms';
import Chat from '../../../components/main/internal/Chat';
import { useSocket } from '../../../hooks/useSocket';
import { useSelector } from 'react-redux';

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { currentUser, token } = useSelector((state) => state.auth);
  useSocket(token);
  const userId = currentUser?.id;

  if (!selectedConversation) {
    return (
      <div className="flex h-screen">
        <ChatRooms
          onSelectConversation={(otherId, otherName) =>
            setSelectedConversation({ userId: otherId, name: otherName })
          }
        />
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select a conversation
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <ChatRooms
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

export default ChatPage;