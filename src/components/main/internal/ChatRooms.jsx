import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllChatRoomsByUserId,
  resetChatRoomsError,
} from "../../../store/slices/chatRoomSlice";
import toast from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ChatRoomForm from "../internal/ChatRoomForm";

const ChatRooms = ({ userId, selectedRoomId, onSelectRoom }) => {
  const dispatch = useDispatch();
  const { chatRooms, loading, error } = useSelector((state) => state.chatRoom);
  const [isChatRoomFormOpen, setIsChatRoomFormOpen] = useState(false);
  const directChatRooms = chatRooms.filter((room) => !room.isGroup);
  const groupChatRooms = chatRooms.filter((room) => room.isGroup);

  useEffect(() => {
    if (userId) {
      dispatch(getAllChatRoomsByUserId(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching chat rooms.",
      );
      dispatch(resetChatRoomsError());
    }
  }, [error]);

  const handleChatRoomFormOpen = () => {
    setIsChatRoomFormOpen(true);
  };

  const handleChatRoomFormClose = () => {
    setIsChatRoomFormOpen(false);
  };

  const getChatRoomDisplayName = (room) => {
    if (room.isGroup) {
      return room.name;
    }

    const otherMember = room.members?.find(
      (member) => member.user?.id !== userId,
    );

    return otherMember?.user?.fullname || room.name || "Direct chat";
  };

  if (loading.list) {
    return (
      <aside className="h-auto w-full rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-900 to-slate-800 p-3 sm:p-4 md:h-full md:w-80 md:min-w-80 md:max-w-80">
        <div className="animate-pulse space-y-3">
          <div className="h-10 rounded-lg bg-slate-700/60" />
          <div className="h-9 rounded-lg bg-slate-700/50" />
          <div className="h-9 rounded-lg bg-slate-700/40" />
          <div className="h-9 rounded-lg bg-slate-700/30" />
        </div>
        <p className="mt-4 text-center text-sm text-slate-300">
          Loading chat rooms...
        </p>
      </aside>
    );
  }

  const renderChatRoomList = (rooms, emptyMessage) => {
    if (rooms.length === 0) {
      return (
        <div className="rounded-xl border border-dashed border-[#db3f7a]/40 bg-[#6b2c51]/10 p-4 text-center text-sm text-slate-300">
          {emptyMessage}
        </div>
      );
    }

    return (
      <ul className="space-y-2">
        {rooms.map((room) => (
          <li key={room.id} className="relative">
            <button
              className={`group block w-full rounded-lg border p-3 text-left transition-all duration-200 ${
                selectedRoomId === room.id
                  ? "border-[#db3f7a] bg-[#db3f7a]/20 text-white shadow-sm shadow-[#db3f7a]/25"
                  : "border-slate-700 bg-slate-900/30 text-slate-200 hover:border-[#db3f7a]/60 hover:bg-[#6b2c51]/20"
              }`}
              onClick={() => onSelectRoom(room)}
            >
              <span className="block truncate text-sm font-medium">
                {getChatRoomDisplayName(room)}
              </span>
            </button>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <aside className="h-auto w-full rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-900 to-slate-800 p-3 text-slate-100 shadow-lg shadow-slate-950/40 sm:p-4 md:h-full md:w-80 md:min-w-80 md:max-w-80">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold tracking-wide">Chats</h2>
        <button
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#db3f7a] px-2 py-1 text-sm font-medium text-white transition-all duration-200 hover:bg-[#c3366d] hover:shadow-md hover:shadow-[#db3f7a]/30 sm:w-auto cursor-pointer"
          onClick={handleChatRoomFormOpen}
        >
          <span className="block md:hidden">
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span className="hidden md:block">New Chat</span>
        </button>
      </div>

      {chatRooms.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-[#db3f7a]/40 bg-[#6b2c51]/10 p-5 text-center text-sm text-slate-300 sm:mt-10 sm:p-6">
          No chat rooms found.
        </div>
      ) : (
        <div className="max-h-[45vh] space-y-5 overflow-y-auto pr-1 sm:max-h-[55vh] md:max-h-[calc(100vh-11rem)]">
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Direct
              </h3>
              <span className="text-xs text-slate-500">
                {directChatRooms.length}
              </span>
            </div>
            {renderChatRoomList(directChatRooms, "No direct chats found.")}
          </section>

          <section className="space-y-3 border-t border-slate-700/50 pt-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Group
              </h3>
              <span className="text-xs text-slate-500">
                {groupChatRooms.length}
              </span>
            </div>
            {renderChatRoomList(groupChatRooms, "No group chats found.")}
          </section>
        </div>
      )}

      <ChatRoomForm
        open={isChatRoomFormOpen}
        onCancel={handleChatRoomFormClose}
      />
    </aside>
  );
};

export default ChatRooms;
