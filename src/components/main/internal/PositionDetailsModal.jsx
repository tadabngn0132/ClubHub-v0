import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  softDeletePositionById,
  hardDeletePositionById,
  restorePositionById,
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import {
  formatUppercaseToCapitalized,
  formatPositionLevel,
} from "../../../utils/formatters.js";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";

const PositionDetailsModal = ({ role, open = true, position, onClose }) => {
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (mode) => {
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const formatDateTime = (value) => {
    if (!value) return "-";

    const parsedDate = new Date(value);
    if (Number.isNaN(parsedDate.getTime())) return value;

    return parsedDate.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async () => {
    if (deleteMode === "soft") {
      await dispatch(softDeletePositionById(position.id)).unwrap();
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      await dispatch(hardDeletePositionById(position.id)).unwrap();
      handleCloseConfirmationModal();
    }
  };

  const handleRestore = async () => {
    await dispatch(restorePositionById(position.id)).unwrap();
    handleCloseConfirmationModal();
  };

  // Early return after all hooks
  if (!open || !position) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex justify-end bg-black/30 backdrop-blur-[1px]"
      onClick={() => onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="position-details-title"
    >
      <div
        className="relative flex h-screen w-full max-w-2xl flex-col overflow-y-auto border-l border-white/10 bg-[#111111] shadow-[-18px_0_60px_rgba(0,0,0,0.45)] md:px-6 md:py-8 rounded-l-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,63,122,0.1),transparent_36%)]" />

        <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff8fb7]">
              Position details
            </p>
            <h1
              id="position-details-title"
              className="mt-2 font-['Monument',sans-serif] text-2xl font-black uppercase tracking-[0.04em] text-white sm:text-3xl"
            >
              {position?.title || "Position Details"}
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          >
            Close
          </button>
        </div>

        <div className="relative grid gap-6 px-5 py-5 sm:px-6 sm:py-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Level
              </p>
              <p className="mt-2 inline-flex rounded-full border border-cyan-400/45 bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-200">
                {position?.level
                  ? formatPositionLevel(position.level)
                  : "Unknown"}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                System Role
              </p>
              <p className="mt-2 inline-flex rounded-full border border-emerald-400/45 bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-200">
                {position?.systemRole
                  ? formatUppercaseToCapitalized(position.systemRole)
                  : "Unknown"}
              </p>
            </div>
          </div>

          {role === "ADMIN" && (
            <div className="flex flex-col gap-3 border-t border-white/10 pt-2 sm:flex-row sm:items-center sm:justify-end">
              <Link
                to={`/admin/positions/edit/${position.id}`}
                className="inline-flex items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/15 px-4 py-2.5 text-sm font-semibold text-sky-200 transition hover:bg-sky-500/25"
              >
                Edit
              </Link>

              <button
                type="button"
                onClick={() => handleDeleteConfigured("soft")}
                className="inline-flex items-center justify-center rounded-xl border border-amber-500/30 bg-amber-500/15 px-4 py-2.5 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/25"
              >
                Soft Delete
              </button>

              <button
                type="button"
                onClick={() => handleDeleteConfigured("hard")}
                className="inline-flex items-center justify-center rounded-xl border border-rose-500/35 bg-rose-500/20 px-4 py-2.5 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/30"
              >
                Hard Delete
              </button>

              {position.isDeleted && (
                <button
                  type="button"
                  onClick={handleRestore}
                  className="inline-flex items-center justify-center rounded-xl border border-yellow-500/30 bg-yellow-500/15 px-4 py-2.5 text-sm font-semibold text-yellow-200 transition hover:bg-yellow-500/25"
                >
                  Restore
                </button>
              )}
            </div>
          )}
        </div>

        <ConfirmationModal
          open={isConfirmationModalOpen}
          title="Confirm Deletion"
          message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this position?`}
          variant={deleteMode === "soft" ? "warning" : "danger"}
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onCancel={handleCloseConfirmationModal}
          onConfirm={handleDelete}
        />
      </div>
    </div>
  );
};

export default PositionDetailsModal;
