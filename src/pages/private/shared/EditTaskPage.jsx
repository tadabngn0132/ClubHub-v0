import TaskForm from "../../../components/main/internal/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateTaskById,
  getTaskDetails,
  resetTaskError,
} from "../../../store/slices/taskSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditTaskPage = ({ basePath }) => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { task, isLoading, error } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskDetails(taskId));
    }
  }, [taskId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load task details");
      dispatch(resetTaskError());
    }
  }, [error]);

  const handleEditTask = async (data) => {
    await dispatch(updateTaskById({ taskId, taskData: data })).unwrap();
    navigate(basePath);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        to={basePath}
        className="inline-block w-max border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Tasks
      </Link>
      <TaskForm task={task} onSubmit={handleEditTask} />
    </div>
  );
};

export default EditTaskPage;
