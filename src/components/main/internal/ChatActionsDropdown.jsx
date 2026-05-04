import { useEffect, useRef } from "react";

const ChatActionsDropdown = ({
  isGroup,
  onClose,
  triggerRef,
  onViewMembers,
  onAddMembers,
  onLeaveChat,
  onDeleteChatRoom,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideDropdown =
        dropdownRef.current && dropdownRef.current.contains(event.target);
      const clickedTrigger =
        triggerRef?.current && triggerRef.current.contains(event.target);

      if (!clickedInsideDropdown && !clickedTrigger) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, triggerRef]);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-15 z-10 mt-2 w-56 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 shadow-xl shadow-black/30"
    >
      {isGroup && (
        <>
          <button
            className="block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            onClick={onViewMembers}
          >
            View Members
          </button>
          <button
            className="block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
            onClick={onAddMembers}
          >
            Add Members
          </button>
          <div className="my-1 h-px bg-gray-700" />
          <button
            className="block w-full rounded-lg px-4 py-2 text-left text-sm text-amber-300 transition-colors hover:bg-amber-500/10 hover:text-amber-200"
            onClick={onLeaveChat}
          >
            Leave Chat
          </button>
        </>
      )}
      <button
        className="block w-full rounded-lg px-4 py-2 text-left text-sm text-rose-300 transition-colors hover:bg-rose-500/10 hover:text-rose-200"
        onClick={onDeleteChatRoom}
      >
        Delete Chat
      </button>
    </div>
  );
};

export default ChatActionsDropdown;
