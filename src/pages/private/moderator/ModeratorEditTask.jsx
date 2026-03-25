import TaskForm from "../../../components/main/internal/TaskForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateTaskById,
  getTaskDetails,
  resetTaskStatus,
} from "../../../store/slices/taskSlice";

const ModeratorEditTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) {
      dispatch(getTaskDetails(taskId));
    }
  }, [taskId, dispatch]);

  const handleEditTask = (data) => {
    dispatch(updateTaskById({ taskId, taskData: data }));

    if (status === "fulfilled") {
      navigate("/moderator/tasks");
    }

    dispatch(resetTaskStatus());
  };

  return (
    <div>
      <TaskForm onSubmit={handleEditTask} />
    </div>
  );
};

export default ModeratorEditTask;
