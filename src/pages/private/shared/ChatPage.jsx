import { useState } from "react";
import ChatRooms from "../../../components/main/internal/ChatRooms";
import Chat from "../../../components/main/internal/Chat";
import { useSocket } from "../../../hooks/useSocket";
import { useSelector } from "react-redux";

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { currentUser, token } = useSelector((state) => state.auth);
  useSocket(token);

  return (
    <div className="flex h-screen">
      <ChatRooms />
      <Chat />
    </div>
  );
};

export default ChatPage;
