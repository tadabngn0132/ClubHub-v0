import TaskForm from "../../../components/main/internal/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateTaskById,
  getTaskDetails,
  resetTaskStatus,
} from "../../../store/slices/taskSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const MemberEditTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { task, isLoading, error, status } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskDetails(taskId));
    }
  }, [taskId, dispatch]);

  const handleEditTask = (data) => {
    dispatch(updateTaskById({ taskId, taskData: data }));

    if (status === "fulfilled") {
      navigate("/member/tasks");
    }

    dispatch(resetTaskStatus());
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <TaskForm task={task} onSubmit={handleEditTask} />
    </div>
  );
};

export default MemberEditTask;
