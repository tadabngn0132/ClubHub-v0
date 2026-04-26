import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  softDeleteDepartmentById,
  hardDeleteDepartmentById,
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal";

const DepartmentDetailsModal = ({ role, department, open = true, onClose }) => {
  const dispatch = useDispatch();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

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

  const handleDelete = () => {
    if (deleteMode === "soft") {
      dispatch(softDeleteDepartmentById(department.id));
      handleCloseConfirmationModal();
      onClose?.();
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteDepartmentById(department.id));
      handleCloseConfirmationModal();
      onClose?.();
    }
  };

  if (!open || !department) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex justify-end bg-black/30 backdrop-blur-[1px]"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="department-details-title"
    >
      <div
        className="relative flex h-screen w-full max-w-2xl flex-col overflow-y-auto border-l border-white/10 bg-[#111111] shadow-[-18px_0_60px_rgba(0,0,0,0.45)] md:px-6 md:py-8 rounded-l-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,63,122,0.1),transparent_36%)]" />

        <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-5 py-5 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ff8fb7]">
              Department details
            </p>
            <h1
              id="department-details-title"
              className="mt-2 font-['Monument',sans-serif] text-2xl font-black uppercase tracking-[0.04em] text-white sm:text-3xl"
            >
              {department.name}
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
                Created at
              </p>
              <p className="mt-2 text-sm font-medium text-white/90">
                {formatDateTime(department.createdAt)}
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                Updated at
              </p>
              <p className="mt-2 text-sm font-medium text-white/90">
                {formatDateTime(department.updatedAt)}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4 sm:p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Description
            </p>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/85">
              {department.description || "No description provided."}
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
              Status
            </p>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                department.isActive
                  ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-200"
                  : "border-rose-500/35 bg-rose-500/15 text-rose-200"
              }`}
            >
              {department.isActive ? "Active" : "Inactive"}
            </span>
          </div>

          {role === "ADMIN" && (
            <>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                  Deletion Status
                </p>
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${
                    department.isDeleted
                      ? "border-emerald-500/35 bg-emerald-500/15 text-emerald-200"
                      : "border-rose-500/35 bg-rose-500/15 text-rose-200"
                  }`}
                >
                  {department.isDeleted ? "Deleted" : "Not Deleted"}
                </span>
              </div>
              <div className="flex flex-col gap-3 border-t border-white/10 pt-2 sm:flex-row sm:items-center sm:justify-end">
                <Link
                  to={`/admin/departments/edit/${department.id}`}
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
              </div>
            </>
          )}
        </div>

        {role !== "ADMIN" && (
          <div className="relative border-t border-white/10 px-5 py-4 sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#db3f7a] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#c7376f]"
            >
              Close
            </button>
          </div>
        )}
      </div>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this department?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default DepartmentDetailsModal;
