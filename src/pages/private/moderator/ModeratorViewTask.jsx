import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getTaskDetails,
  softDeleteTaskById,
} from "../../../store/slices/taskSlice";
import { Link } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetStatus } from "../../../store/slices/taskSlice";
import { useParams } from "react-router-dom";

const ModeratorViewTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { task, isLoading, error, status } = useSelector((state) => state.task);

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
    dispatch(softDeleteTaskById(taskId));

    if (status === "fulfilled") {
      navigate("/moderator/tasks");
      dispatch(resetStatus());
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Link to="/moderator/tasks">Back to Tasks</Link>
      <div className="flex items-center justify-between">
        <h1>{task?.title}</h1>

        <div>
          <Link to={`/moderator/tasks/edit/${taskId}`}>Edit Task</Link>
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

export default ModeratorViewTask;
