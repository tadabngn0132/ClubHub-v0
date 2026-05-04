import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewChatRoom,
  resetChatRoomsError,
} from "../../../store/slices/chatRoomSlice";
import { getUsersList } from "../../../store/slices/userSlice";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ChatRoomForm = ({ open = false, onCancel }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.chatRoom);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      isGroup: false,
      userIds: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  if (!open) {
    return null;
  }

  const handleCreateChatRoom = async (data) => {
    if (data.userIds.length === 0) {
      toast.error("Please select at least one user to create a chat room.");
      return;
    }
    const chatRoomData = {
      ...data,
      isGroup: data.userIds.length > 1,
      userIds: [...data.userIds, currentUser.id],
    };
    dispatch(createNewChatRoom(chatRoomData));
    onCancel();
  };

  const filteredUsers = users.filter((user) => user.id !== currentUser.id);

  return (
    <div className="fixed inset-0 z-[110] bg-black/50 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200">
      <form
        onSubmit={handleSubmit(handleCreateChatRoom)}
        className="w-full max-w-md bg-gradient-to-b from-gray-750 to-gray-800 rounded-xl shadow-2xl border border-gray-600 overflow-hidden animate-in scale-in duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between bg-gradient-to-r from-[#db3f7a] to-[#a82d5f] p-5 sm:p-6">
          <h2 className="text-2xl font-bold text-white">New Chat Room</h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition duration-200 hover:bg-white/30 active:scale-95"
          >
            <FontAwesomeIcon icon={faXmark} className="text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          {/* Chat Room Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-2">
              Chat Room Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Chat room name is required" })}
              placeholder="Enter chat room name"
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 placeholder-gray-400 transition duration-200 focus:border-[#db3f7a] focus:outline-none focus:ring-2 focus:ring-[#db3f7a]/30"
            />
            {errors.name && (
              <p className="text-red-400 text-xs font-medium mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Select Users */}
          <div>
            <label className="block text-sm font-semibold text-gray-100 mb-3">
              Select Users
            </label>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
              {filteredUsers.length === 0 ? (
                <p className="text-gray-400 text-sm py-4 text-center">
                  No users available
                </p>
              ) : (
                filteredUsers.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition duration-150 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      value={user.id}
                      {...register("userIds", {
                        validate: (value) => {
                          return (
                            value.length > 0 ||
                            "Please select at least one user"
                          );
                        },
                      })}
                      className="w-4 h-4 text-[#db3f7a] bg-gray-600 border-gray-500 rounded focus:ring-2 focus:ring-[#db3f7a] cursor-pointer"
                    />
                    <span className="ml-3 text-gray-100 text-sm font-medium group-hover:text-white transition">
                      {user.fullname}
                    </span>
                  </label>
                ))
              )}
            </div>
            {errors.userIds && (
              <p className="text-red-400 text-xs font-medium mt-2">
                {errors.userIds.message}
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 items-center justify-end p-5 sm:p-6 bg-gray-900/50 border-t border-gray-700">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2.5 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-200 active:scale-95"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading.create}
            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#db3f7a] to-[#a82d5f] rounded-lg hover:from-[#a82d5f] hover:to-[#7a1f47] transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            {loading.create ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatRoomForm;
