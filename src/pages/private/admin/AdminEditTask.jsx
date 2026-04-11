import TaskForm from "../../../components/main/internal/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateTaskById,
  getTaskDetails,
  resetTaskStatus,
  resetTaskError,
} from "../../../store/slices/taskSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const AdminEditTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { task, isLoading, error, taskStatus } = useSelector(
    (state) => state.task,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskDetails(taskId));
    }
  }, [taskId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetTaskError());
    }
  }, [error]);

  useEffect(() => {
    if (taskStatus === "fulfilled") {
      navigate("/admin/tasks");
    }
    dispatch(resetTaskStatus());
  }, [taskStatus]);

  const handleEditTask = async (data) => {
    await dispatch(updateTaskById({ taskId, taskData: data })).unwrap();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <TaskForm task={task} onSubmit={handleEditTask} />
    </div>
  );
};

export default AdminEditTask;
