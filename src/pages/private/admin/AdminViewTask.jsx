import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getTaskDetails,
  softDeleteTaskById,
  hardDeleteTaskById,
} from "../../../store/slices/taskSlice";
import { Link } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetTaskStatus } from "../../../store/slices/taskSlice";
import { useParams } from "react-router-dom";
import { formatDate, formatUppercaseToCapitalized } from "../../../utils/formatters.js";

const AdminViewTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { task, isLoading, error, taskStatus } = useSelector((state) => state.task);
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
    const softConfirmed = window.confirm(
      "Do you want to deactivate this task?",
    );

    if (softConfirmed) {
      dispatch(softDeleteTaskById(taskId));
      return;
    }

    const hardConfirmed = window.confirm(
      "Do you want to permanently delete this task? This action cannot be undone.",
    );

    if (hardConfirmed) {
      dispatch(hardDeleteTaskById(taskId));
    }

    if (taskStatus === "fulfilled") {
      navigate("/admin/tasks");
      dispatch(resetTaskStatus());
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Link to="/admin/tasks" className="text-blue-500 hover:underline mb-4 inline-block">
        Back to Tasks
      </Link>
      <p className="text-sm text-gray-400 mb-4">
        {task?.assignedBy?.fullname || "N/A"} | { task?.createdAt ? formatDate(task?.createdAt) : "N/A" }
      </p>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{task?.title}</h1>

        <div className="flex justify-center items-center gap-1 text-sm bg-white p-2 rounded-md shadow-md">
          <Link to={`/admin/tasks/edit/${taskId}`} className="text-blue-500 hover:underline">
            Edit
          </Link>
          <button onClick={handleDelete} className="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-2 mb-4">
        <p>@{formatUppercaseToCapitalized(task?.assigneeScope || "N/A")}</p>
        {task?.isCheckCf && <p className="text-md font-semibold">{task?.isCheckCf ? "#checkcf" : ""}</p>}
      </div>
      <p>Deadline: 23h59 { task?.dueDate ? formatDate(task?.dueDate) : "N/A" }</p>

      <p>Status: {task?.status ? formatUppercaseToCapitalized(task?.status) : "N/A"}</p>
      <p>{task?.description}</p>

      <p className="mt-4">Updated At: { task?.updatedAt ? formatDate(task?.updatedAt) : "N/A" }</p>

      <h1 className="text-xl font-bold mt-8 mb-2">Assignee Confirmation</h1>
    </div>
  );
};

export default AdminViewTask;
