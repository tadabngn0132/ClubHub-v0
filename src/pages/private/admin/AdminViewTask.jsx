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
      <Link to="/admin/tasks">Back to Tasks</Link>
      <div className="flex items-center justify-between">
        <h1>{task?.title}</h1>

        <div>
          <Link to={`/admin/tasks/edit/${taskId}`}>Edit Task</Link>
          <button onClick={handleDelete}>Delete Task</button>
        </div>
      </div>

      <div>
        <p>Created At: {task?.createdAt}</p>
        <p>Updated At: {task?.updatedAt}</p>
      </div>

      <p>Description: {task?.description}</p>
      <p>Due Date: {task?.dueDate}</p>
      {/* <p>Assigned To: {task?.assignedTo}</p> */}
      {task?.isCompleted ? <p>Status: Completed</p> : <p>Status: Incomplete</p>}
    </div>
  );
};

export default AdminViewTask;
