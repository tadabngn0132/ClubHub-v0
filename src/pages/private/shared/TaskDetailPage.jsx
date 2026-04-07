import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getTaskDetails,
  softDeleteTaskById,
  hardDeleteTaskById,
  confirmTaskCompletionById,
  resetTaskStatus,
  verifyTaskCompletionById,
} from "../../../store/slices/taskSlice";
import { Link } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters.js";
import TaskConfirmationForm from "../../../components/main/internal/TaskConfirmationForm.jsx";
import TaskVerificationForm from "../../../components/main/internal/TaskVerificationForm.jsx";

const TaskDetailPage = ({ role, basePath, permissions }) => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { task, isLoading, error, taskStatus } = useSelector(
    (state) => state.task,
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getTaskDetails(taskId));
  }, [dispatch, taskId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  const handleDelete = () => {
    if (permissions?.canSoftDelete) {
        const softConfirmed = window.confirm(
        "Do you want to deactivate this task?",
        );

        if (softConfirmed) {
        dispatch(softDeleteTaskById(taskId));
        return;
        }
    }

    if (permissions?.canHardDelete) {
        const hardConfirmed = window.confirm(
        "Do you want to permanently delete this task? This action cannot be undone.",
        );

        if (hardConfirmed) {
        dispatch(hardDeleteTaskById(taskId));
        }
    }

    if (taskStatus === "fulfilled") {
      navigate(basePath);
      dispatch(resetTaskStatus());
    }
  };

  const filterCurrentUserAssignee = task?.assignees?.filter(
    (assignee) => assignee.assigneeId === currentUser.id,
  );
  const filterConfirmedAssignee = task?.assignees?.filter(
    (assignee) => assignee.evidenceUrl,
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

  const handleConfirmCompletion = (data) => {
    const formData = new FormData();
    formData.append("assigneeId", currentUser.id);
    formData.append("additionalComments", data.additionalComments || "");

    if (data.evidence && data.evidence[0]) {
      formData.append("evidence", data.evidence[0]);
    }

    dispatch(confirmTaskCompletionById({ id: taskId, formData }));
  };

  const handleVerifyTask = (data) => {
    dispatch(verifyTaskCompletionById({ id: taskId, taskVerifyData: data }));
  };

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mx-auto w-full max-w-5xl">
        <Link
          to={basePath}
          className="mb-6 inline-flex items-center rounded-md border border-gray-700 bg-gray-800 px-3 py-1.5 text-sm font-medium text-gray-200 transition hover:border-blue-400 hover:text-blue-300"
        >
          Back to Tasks
        </Link>

        <div className="rounded-xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl backdrop-blur md:p-6">
          <p className="mb-4 text-sm text-gray-400">
            {task?.assignedBy?.fullname || "N/A"} |{" "}
            {task?.createdAt ? formatDate(task?.createdAt) : "N/A"}
          </p>

          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-gray-100 md:text-3xl">
              {task?.title}
            </h1>

            {role !== "MEMBER" && (
                <div className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 p-2 text-sm shadow-md">
                    <Link
                        to={`${basePath}/edit/${taskId}`}
                        className="rounded-md bg-blue-500/15 px-3 py-1.5 font-medium text-blue-300 transition hover:bg-blue-500/30"
                    >
                        Edit
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="rounded-md bg-rose-500/15 px-3 py-1.5 font-medium text-rose-300 transition hover:bg-rose-500/30"
                    >
                        Delete
                    </button>
                </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <p className="rounded-full border border-violet-500/40 bg-violet-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-200">
              @{formatUppercaseToCapitalized(task?.assigneeScope || "N/A")}
            </p>
            {task?.isCheckCf && (
              <p className="rounded-full border border-cyan-500/40 bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                #checkcf
              </p>
            )}
            <p
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusClass}`}
            >
              {statusLabel}
            </p>
          </div>

          <div className="mt-5 grid gap-4 text-sm text-gray-200 md:grid-cols-2">
            <p className="rounded-lg border border-gray-800 bg-gray-950/60 p-3">
              <span className="font-semibold text-gray-400">Deadline:</span>{" "}
              23h59 {task?.dueDate ? formatDate(task?.dueDate) : "N/A"}
            </p>
            <p className="rounded-lg border border-gray-800 bg-gray-950/60 p-3">
              <span className="font-semibold text-gray-400">Updated At:</span>{" "}
              {task?.updatedAt ? formatDate(task?.updatedAt) : "N/A"}
            </p>
          </div>

          <div className="mt-4 rounded-lg border border-gray-800 bg-gray-950/60 p-4">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-400">
              Description
            </h2>
            <p className="whitespace-pre-line text-sm leading-6 text-gray-200">
              {task?.description || "No description provided."}
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-gray-800 bg-gray-900/90 p-5 shadow-xl md:p-6">
          <h1 className="mb-4 text-xl font-bold text-gray-100 md:text-2xl">
            Assignee Confirmation
          </h1>
          <TaskConfirmationForm
            taskCfData={filterCurrentUserAssignee}
            onSubmit={handleConfirmCompletion}
          />
          {filterConfirmedAssignee && filterConfirmedAssignee.length > 0 && (
            <div className="mt-6 rounded-lg border border-green-700 bg-green-900/60 p-4">
              <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-green-400">
                Confirmed Completion
              </h2>
              {filterConfirmedAssignee.map((assignee) => (
                <div key={assignee.assigneeId} className="mb-4">
                  <p>{assignee.status}</p>
                  <p className="text-sm text-green-300">
                    <span className="font-semibold text-green-400">
                      Assignee:
                    </span>{" "}
                    {assignee.assigneeName || "N/A"}
                  </p>
                  <p className="text-sm text-green-300">
                    <span className="font-semibold text-green-400">
                      Comments:
                    </span>{" "}
                    {assignee.additionalComments || "N/A"}
                  </p>
                  {assignee.evidenceUrl && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold text-green-400">
                        Evidence:
                      </p>
                      <img
                        src={assignee.evidenceUrl}
                        alt="Evidence"
                        className="mt-1 max-h-60 rounded-md object-cover"
                      />
                    </div>
                  )}

                  {role !== "MEMBER" && (
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
    </div>
  );
};

export default TaskDetailPage;
