import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ConfirmationModal = ({
  open = true,
  title,
  message,
  content,
  variant = "danger",
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  if (!open) {
    return null;
  }

  const variantStyles = {
    danger: {
      header: "from-[#db3f7a] to-[#a82d5f]",
      confirm:
        "bg-gradient-to-r from-[#db3f7a] to-[#a82d5f] hover:from-[#c3356e] hover:to-[#922651] focus:ring-pink-300",
    },
    warning: {
      header: "from-amber-500 to-orange-600",
      confirm:
        "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-700 focus:ring-amber-300",
    },
    success: {
      header: "from-emerald-500 to-teal-600",
      confirm:
        "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-700 focus:ring-emerald-300",
    },
  };

  const selectedVariant = variantStyles[variant] ?? variantStyles.danger;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirmation-modal-title"
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-gray-800 to-gray-900 shadow-2xl shadow-black/40 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`flex items-center justify-between border-b border-white/10 bg-gradient-to-r px-5 py-4 ${selectedVariant.header}`}
        >
          <h2
            id="confirmation-modal-title"
            className="text-lg font-bold text-white sm:text-xl"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/70"
          >
            <FontAwesomeIcon icon={faXmark} className="text-sm" />
          </button>
        </div>

        <div className="space-y-3 px-5 py-5 sm:px-6 sm:py-6">
          {message && (
            <p className="text-sm leading-6 text-gray-200">{message}</p>
          )}
          {content && <div className="text-sm text-gray-300">{content}</div>}
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-gray-900/70 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-medium text-gray-200 transition hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            {cancelButtonText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-white transition focus:outline-none focus:ring-2 ${selectedVariant.confirm}`}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
