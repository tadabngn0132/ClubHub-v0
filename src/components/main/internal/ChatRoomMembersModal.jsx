import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatRoomMembersById,
  addMemberToChatRoomById,
  removeMemberFromChatRoomById,
} from "../../../store/slices/chatRoomSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

const ChatRoomMembersModal = ({ isOpen, chatRoomId, onClose }) => {
  const dispatch = useDispatch();
  const { chatRoom, loading } = useSelector((state) => state.chatRoom);

  useEffect(() => {
    if (isOpen && chatRoomId) {
      dispatch(getChatRoomMembersById(chatRoomId));
    }
  }, [dispatch, isOpen, chatRoomId]);

  const handleRemoveMember = async (userId) => {
    try {
      await dispatch(
        removeMemberFromChatRoomById({ id: chatRoomId, userId }),
      ).unwrap();
      toast.success("Member removed successfully.");
    } catch (error) {
      toast.error(error || "Failed to remove member.");
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl shadow-black/40 animate-in zoom-in-95 duration-200"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800/60 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Chat Room Members
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-all duration-150 hover:bg-gray-700 hover:text-white"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          {/* Members List */}
          <div className="max-h-80 overflow-y-auto rounded-xl border border-gray-700 bg-gray-800/30">
            {loading.members ? (
              <div className="px-6 py-10 text-center text-sm text-gray-400">
                Loading members...
              </div>
            ) : chatRoom?.members && chatRoom.members.length > 0 ? (
              <ul className="divide-y divide-gray-700">
                {chatRoom.members.map((member) => (
                  <li
                    key={member.user.id}
                    className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-gray-800/50"
                  >
                    {member.user.avatarUrl ? (
                      <img
                        src={member.user.avatarUrl}
                        alt={member.user.fullname}
                        className="h-10 w-10 shrink-0 rounded-full border border-pink-400/30 object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-sm font-bold text-pink-100">
                        {(member.user.fullname || "").slice(0, 1).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200">
                        {member.user.fullname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {member.role || "Member"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.user.id)}
                      disabled={loading.memberAction}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-gray-400 transition-all duration-150 hover:bg-rose-500/10 hover:text-[#db3f7a] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-10 text-center">
                <p className="text-gray-400">No members found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Counter */}
        {chatRoom?.members && chatRoom.members.length > 0 && (
          <div className="border-t border-gray-700 bg-gray-800/30 px-6 py-3 text-xs text-gray-400">
            {chatRoom.members.length} member
            {chatRoom.members.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoomMembersModal;
