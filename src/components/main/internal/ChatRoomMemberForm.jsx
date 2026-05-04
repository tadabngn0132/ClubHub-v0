import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatRoomMembersById,
  addMemberToChatRoomById,
} from "../../../store/slices/chatRoomSlice";
import { getUsersList } from "../../../store/slices/userSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";

const ChatRoomMemberForm = ({ isOpen, chatRoomId, onClose }) => {
  const dispatch = useDispatch();
  const { chatRoom, loading } = useSelector((state) => state.chatRoom);
  const { users } = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      userIds: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getUsersList());
    if (isOpen && chatRoomId) {
      dispatch(getChatRoomMembersById(chatRoomId));
    }
  }, [dispatch, isOpen, chatRoomId]);

  const filteredUsers = users.filter(
    (user) => !chatRoom?.members.some((member) => member.userId === user.id),
  );

  const handleAddMembers = async (data) => {
    try {
      await dispatch(
        addMemberToChatRoomById({ id: chatRoomId, userIds: data.userIds }),
      ).unwrap();
      onClose();
    } catch (err) {
      toast.error(err || "Failed to add members");
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-700 bg-gradient-to-b from-gray-900/80 to-gray-900 shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between bg-gradient-to-r from-[#db3f7a] to-[#a82d5f] px-6 py-4">
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-white truncate">
              Add Members
            </h2>
            <p className="text-xs text-pink-100/90 truncate">
              Select users to add to this chat room
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 bg-white/10 hover:bg-white/20 transition"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(handleAddMembers)}
          className="space-y-4 px-6 py-5"
        >
          <div className="max-h-80 overflow-y-auto rounded-xl border border-gray-700 bg-gray-800/30">
            {loading.members ? (
              <div className="px-6 py-10 text-center text-sm text-gray-400">
                Loading members...
              </div>
            ) : filteredUsers.length > 0 ? (
              <ul className="divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center gap-3 px-4 py-3 transition-colors duration-150 hover:bg-gray-800/60"
                  >
                    <input
                      type="checkbox"
                      id={`user-${user.id}`}
                      value={user.id}
                      {...register("userIds")}
                      className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-[#db3f7a] focus:ring-2 focus:ring-[#db3f7a]/30"
                    />
                    <label
                      htmlFor={`user-${user.id}`}
                      className="flex flex-1 cursor-pointer items-center gap-3 min-w-0"
                    >
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="h-9 w-9 shrink-0 rounded-full border border-pink-400/30 object-cover"
                        />
                      ) : (
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-sm font-bold text-pink-100">
                          {(user.name || "").slice(0, 1).toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-slate-200">
                          {user.name}
                        </p>
                        <p className="truncate text-xs text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-6 py-10 text-center">
                <p className="text-gray-400">All users are already members.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              You can add multiple users at once.
            </div>
          </div>

          <div className="flex gap-3 border-t border-gray-700 bg-gray-800/30 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 transition-all duration-150 hover:bg-gray-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              disabled={loading.memberAction}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading.memberAction}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#db3f7a] to-[#a82d5f] px-4 py-2 text-sm font-semibold text-white transition-all duration-150 hover:from-[#c3356e] hover:to-[#922651] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FontAwesomeIcon icon={faPlus} />
              {loading.memberAction ? "Adding..." : "Add Members"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatRoomMemberForm;
