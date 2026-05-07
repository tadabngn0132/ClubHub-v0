import { useEffect, useRef } from "react";

const MessageActionsDropdown = ({
  onClose,
  triggerRef,
  onEditMessage,
  onDeleteMessage,
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
      className="absolute right-36 top-15 z-10 mt-2 w-30 overflow-hidden rounded-xl border border-gray-700 bg-gray-800 p-1 shadow-xl shadow-black/30"
    >
      <button
        className="block w-full rounded-lg px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
        onClick={onEditMessage}
      >
        Edit
      </button>
      <button
        className="block w-full rounded-lg px-4 py-2 text-left text-sm text-rose-300 transition-colors hover:bg-rose-500/10 hover:text-rose-200"
        onClick={onDeleteMessage}
      >
        Delete
      </button>
    </div>
  );
};

export default MessageActionsDropdown;
