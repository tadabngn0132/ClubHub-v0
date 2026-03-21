import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getTaskDetails,
  softDeleteTaskById,
} from "../../../store/slices/taskSlice";
import { Link } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import { useNavigate } from "react-router-dom";
import { resetTaskStatus } from "../../../store/slices/taskSlice";
import { useParams } from "react-router-dom";

const ModeratorViewTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, isLoading, error, taskStatus } = useSelector(
    (state) => state.task,
  );

  useEffect(() => {
    dispatch(getTaskDetails(taskId));
  }, [dispatch, taskId]);

  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = () => {
    dispatch(softDeleteTaskById(taskId));

    if (taskStatus === "fulfilled") {
      navigate("/moderator/tasks");
      dispatch(resetTaskStatus());
    }
  };

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            to="/moderator/tasks"
            className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300"
          >
            Back to Tasks
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <section className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.85)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/80">
                Task Detail
              </p>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
                {task?.title || "Untitled Task"}
              </h1>
              <p className="mt-3 inline-flex rounded-full border border-emerald-400/50 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-200">
                {task?.isCompleted ? "Completed" : "Incomplete"}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 self-center">
              <Link
                to={`/moderator/tasks/edit/${taskId}`}
                className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
              >
                Edit Task
              </Link>
              <button
                onClick={handleDelete}
                className="rounded-xl border border-rose-400/60 bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/25"
              >
                Delete Task
              </button>
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-3 text-lg font-bold text-slate-100">Timeline</h2>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <strong className="text-slate-100">Created At:</strong>{" "}
                {task?.createdAt || "N/A"}
              </p>
              <p>
                <strong className="text-slate-100">Updated At:</strong>{" "}
                {task?.updatedAt || "N/A"}
              </p>
              <p>
                <strong className="text-slate-100">Due Date:</strong>{" "}
                {task?.dueDate || "N/A"}
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-3 text-lg font-bold text-slate-100">
              Description
            </h2>
            <p className="text-sm leading-relaxed text-slate-300">
              {task?.description || "No description provided for this task."}
            </p>
          </article>
        </section>
      </div>
    </div>
  );
};

export default ModeratorViewTask;
