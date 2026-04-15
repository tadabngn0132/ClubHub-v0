import { useState } from "react";
import ChatRooms from "../../../components/main/internal/ChatRooms";
import Chat from "../../../components/main/internal/Chat";
import { useSocket } from "../../../hooks/useSocket";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { currentUser, token } = useSelector((state) => state.auth);
  useSocket(token);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] gap-4 p-4 bg-gray-900 rounded-2xl">
      <ChatRooms
        userId={currentUser?.id}
        onSelectRoom={handleSelectConversation}
        selectedRoomId={selectedConversation?.id}
      />
      <Chat selectedRoomId={selectedConversation?.id} />
    </div>
  );
};

export default ChatPage;
