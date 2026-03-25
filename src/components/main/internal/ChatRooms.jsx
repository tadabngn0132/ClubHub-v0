import { useState, useEffect } from 'react';
import { useSocket } from '../../../hooks/useSocket';
import { getAllRoomsForCurrentUser } from '../../../store/slices/messageSlice';
import { useDispatch } from 'react-redux';

const ChatRooms = ({ userId, onSelectConversation }) => {
  const [rooms, setRooms] = useState([]);
  const { onEvent } = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchrooms();
  }, []);

  const fetchrooms = async () => {
    dispatch(getAllRoomsForCurrentUser())
      .unwrap()
      .then((data) => {
        setRooms(data);
      })
      .catch((err) => {
        console.error('Failed to fetch rooms:', err);
      });
  };

  // Listen for new messages
  useEffect(() => {
    return onEvent('message:receive', (message) => {
      fetchrooms();
    });
  }, [onEvent]);

  return (
    <div className="w-80 border-r bg-gray-50">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Tin nhắn</h1>
      </div>

      <div className="overflow-y-auto">
        {rooms.map((conv) => {
          return (
            <div
              key={conv.roomId}
              onClick={() => onSelectConversation(conv.otherUser.id, conv.otherUser.fullname)}
              className="p-4 border-b hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <img
                  src={conv.otherUser.avatarUrl || '/default-avatar.png'}
                  alt={conv.otherUser.fullname}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm">{conv.otherUser.fullname}</p>
                  <p className="text-xs text-gray-600 truncate">{conv.lastMessage.content}</p>
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