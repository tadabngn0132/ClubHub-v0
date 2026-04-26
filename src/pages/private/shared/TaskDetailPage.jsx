import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getTaskDetails,
  softDeleteTaskById,
  hardDeleteTaskById,
  confirmTaskCompletionById,
  verifyTaskCompletionById,
  resetTaskError,
} from "../../../store/slices/taskSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters.js";
import TaskConfirmationForm from "../../../components/main/internal/TaskConfirmationForm.jsx";
import TaskVerificationForm from "../../../components/main/internal/TaskVerificationForm.jsx";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";

const TaskDetailPage = ({ role, basePath }) => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { task, isLoading, error } = useSelector((state) => state.task);
  const navigate = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getTaskDetails(taskId));
  }, [dispatch, taskId]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load task details");
      dispatch(resetTaskError());
    }
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (activityId, mode) => {
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = () => {
    if (deleteMode === "soft") {
      dispatch(softDeleteTaskById(taskId));
      navigate(basePath);
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteTaskById(taskId));
      navigate(basePath);
    }
  };

  const currentUserAssignee = task?.assignees?.find(
    (assignee) => assignee.assigneeId === currentUser.id,
  );
  const filterConfirmedAssignee = task?.assignees?.filter(
    (assignee) => assignee.status === "CONFIRMED",
  );
  const statusLabel = task?.status
    ? formatUppercaseToCapitalized(task.status)
    : "N/A";
  const statusClassMap = {
    New: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    In_progress: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    InProgress: "bg-sky-500/20 text-sky-300 border-sky-500/40",
    Completed: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    Cancelled: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    On_hold: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    "N/A": "bg-gray-700/40 text-gray-300 border-gray-600",
  };
  const statusClass =
    statusClassMap[statusLabel] ||
    "bg-gray-700/40 text-gray-300 border-gray-600";

  const handleConfirmCompletion = async (data) => {
    await dispatch(
      confirmTaskCompletionById({ id: taskId, taskConfirmData: data }),
    ).unwrap();
    navigate(basePath);
  };

  const handleVerifyTask = async (data) => {
    await dispatch(
      verifyTaskCompletionById({ id: taskId, taskVerifyData: data }),
    ).unwrap();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-16 top-0 h-64 w-64 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="absolute right-0 top-28 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="mx-auto w-full max-w-5xl px-2 py-0.75 sm:px-3">
        <Link
          to={basePath}
          className="mb-6 inline-flex items-center rounded-xl border border-white/10 bg-zinc-900/70 px-4 py-2 text-sm font-semibold text-zinc-200 shadow-lg shadow-black/20 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-200"
        >
          Back to Tasks
        </Link>

        <div className="my-5 md:my-6">
          <p className="mb-4 text-sm text-zinc-400">
            {task?.assignedBy?.fullname || "N/A"} |{" "}
            {task?.createdAt ? formatDate(task?.createdAt) : "N/A"}
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <h1 className="text-2xl font-black tracking-tight text-zinc-100 md:text-3xl">
              {task?.title}
            </h1>

            <div className="flex items-center gap-2">
              {role !== "MEMBER" && (
                <>
                  <Link
                    to={`${basePath}/edit/${taskId}`}
                    className="rounded-xl border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-2 font-semibold text-cyan-200 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:bg-cyan-400/20"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteConfigured(taskId, "soft")}
                    className="rounded-xl border border-amber-400/25 bg-amber-500/10 px-3.5 py-2 font-semibold text-amber-200 transition hover:-translate-y-0.5 hover:border-amber-300/50 hover:bg-amber-500/20"
                  >
                    Soft Delete
                  </button>
                </>
              )}

              {role === "ADMIN" && (
                <button
                  onClick={() => handleDeleteConfigured(taskId, "hard")}
                  className="rounded-xl border border-rose-400/25 bg-rose-500/10 px-3.5 py-2 font-semibold text-rose-200 transition hover:-translate-y-0.5 hover:border-rose-300/50 hover:bg-rose-500/20"
                >
                  Hard Delete
                </button>
              )}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <p className="rounded-full border border-cyan-400/35 bg-cyan-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-cyan-200">
              @{formatUppercaseToCapitalized(task?.assigneeScope || "N/A")}
            </p>
            {task?.isCheckCf && (
              <p className="rounded-full border border-emerald-400/35 bg-emerald-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-200">
                #checkcf
              </p>
            )}
            <p
              className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusClass}`}
            >
              {statusLabel}
            </p>
          </div>

          <div className="mt-5 grid gap-4 text-sm text-zinc-200 md:grid-cols-2">
            <p className="rounded-xl border border-white/10 bg-zinc-950/55 p-3.5 shadow-inner shadow-black/20">
              <span className="font-semibold text-zinc-400">Deadline:</span>{" "}
              23h59 {task?.dueDate ? formatDate(task?.dueDate) : "N/A"}
            </p>
            <p className="rounded-xl border border-white/10 bg-zinc-950/55 p-3.5 shadow-inner shadow-black/20">
              <span className="font-semibold text-zinc-400">Updated At:</span>{" "}
              {task?.updatedAt ? formatDate(task?.updatedAt) : "N/A"}
            </p>
          </div>

          <div className="mt-4 rounded-xl border border-white/10 bg-zinc-950/55 p-4 shadow-inner shadow-black/20">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-400">
              Description
            </h2>
            <p className="whitespace-pre-line text-sm leading-6 text-zinc-200">
              {task?.description || "No description provided."}
            </p>
          </div>
        </div>

        <div className="my-6 border-t border-white/10 py-6">
          <h1 className="mb-4 text-xl font-black text-zinc-100 md:text-2xl">
            Assignee Confirmation
          </h1>
          <TaskConfirmationForm
            taskCfData={currentUserAssignee}
            onSubmit={handleConfirmCompletion}
          />
          {filterConfirmedAssignee && filterConfirmedAssignee.length > 0 && (
            <div className="my-6 ">
              <h2 className="mb-3 text-md font-bold uppercase tracking-wide text-emerald-300">
                Confirmed Completion
              </h2>
              {filterConfirmedAssignee.map((assignee) => (
                <div
                  key={assignee.id}
                  className="mb-6 rounded-xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/75 to-zinc-950/95 p-6 shadow-2xl shadow-black/25"
                >
                  <p className="text-sm text-emerald-100">
                    <span className="font-semibold text-emerald-300">
                      Assignee:
                    </span>{" "}
                    {assignee.user.fullname || "N/A"}
                  </p>
                  <p className="mt-1 text-sm text-emerald-100">
                    <span className="font-semibold text-emerald-300">
                      Comments:
                    </span>{" "}
                    {assignee.additionalComments || "N/A"}
                  </p>
                  {assignee.evidenceUrl && (
                    <div className="mt-3">
                      <p className="text-sm font-semibold text-emerald-300">
                        Evidence:
                      </p>
                      <img
                        src={assignee.evidenceUrl}
                        alt="Evidence"
                        className="mt-2 max-h-60 rounded-lg border border-emerald-200/20 object-cover"
                      />
                    </div>
                  )}

                  {(role === "ADMIN" || task.assignorId === currentUser.id) && (
                    <TaskVerificationForm
                      taskVerifyData={assignee}
                      onSubmit={handleVerifyTask}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this task?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default TaskDetailPage;
