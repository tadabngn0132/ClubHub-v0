import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
    getPositionDetails,
    softDeletePositionById,
    hardDeletePositionById,
    resetPositionStatus,
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link, useParams } from "react-router-dom";
import {
  formatUppercaseToCapitalized,
  formatPositionLevel,
} from "../../../utils/formatters.js";

const PositionDetailPage = ({ role, basePath }) => {
  const { positionId } = useParams();
  const dispatch = useDispatch();
  const { position, isLoading, error, positionStatus } = useSelector((state) => state.position);

  useEffect(() => {
    dispatch(getPositionDetails(positionId));
  }, [dispatch, positionId]);

  const handleDelete = () => {
    if (role !== "ADMIN") {
    return;
    }

    const softConfirmed = window.confirm(
    "Do you want to deactivate this position?",
    );

    if (softConfirmed) {
    dispatch(softDeletePositionById(positionId));
    return;
    }

    const hardConfirmed = window.confirm(
    "Do you want to permanently delete this position? This action cannot be undone.",
    );

    if (hardConfirmed) {
    dispatch(hardDeletePositionById(positionId));
    }

    if (positionStatus === "fulfilled") {
        navigate(basePath);
        dispatch(resetPositionStatus());
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
                <Link to={`${basePath}/edit/${positionId}`}>
                    Edit Position
                </Link>
                <button onClick={handleDelete}>Delete Position</button>
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
      </div>
    </div>
  );
};

export default PositionDetailPage;
