import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getPositionDetails,
  softDeletePositionById,
  hardDeletePositionById,
  resetPositionError,
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  formatUppercaseToCapitalized,
  formatPositionLevel,
} from "../../../utils/formatters.js";
import toast from "react-hot-toast";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";

const PositionDetailPage = ({ role, basePath }) => {
  const { positionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { position, isLoading, error } = useSelector((state) => state.position);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getPositionDetails(positionId));
  }, [dispatch, positionId]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load position details");
      dispatch(resetPositionError());
    }
  }, [error]);

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
      dispatch(softDeletePositionById(positionId));
      navigate(basePath);
    } else if (deleteMode === "hard") {
      dispatch(hardDeletePositionById(positionId));
      navigate(basePath);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="flex w-full flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            to={basePath}
            className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            Back to Positions
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <section className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.85)] backdrop-blur md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/80">
            Position
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            {position?.title || "Position Details"}
          </h1>

          {role === "ADMIN" && (
            <div>
              <Link to={`${basePath}/edit/${positionId}`}>Edit Position</Link>
              <button onClick={() => handleDeleteConfigured("soft")}>
                Delete Position
              </button>
            </div>
          )}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-3 text-lg font-bold text-slate-100">Level</h2>
            <p className="inline-flex rounded-full border border-cyan-400/50 bg-cyan-500/15 px-3 py-1 text-sm font-semibold text-cyan-200">
              {position?.level
                ? formatPositionLevel(position.level)
                : "Unknown"}
            </p>
          </article>

          <article className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-3 text-lg font-bold text-slate-100">
              System Role
            </h2>
            <p className="inline-flex rounded-full border border-emerald-400/50 bg-emerald-500/15 px-3 py-1 text-sm font-semibold text-emerald-200">
              {position?.systemRole
                ? formatUppercaseToCapitalized(position.systemRole)
                : "Unknown"}
            </p>
          </article>
        </section>

        <ConfirmationModal
          open={isConfirmationModalOpen}
          title="Confirm Deletion"
          message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this position?`}
          variant={deleteMode === "soft" ? "warning" : "danger"}
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onCancel={handleCloseConfirmationModal}
          onConfirm={() => handleDelete()}
        />
      </div>
    </div>
  );
};

export default PositionDetailPage;
