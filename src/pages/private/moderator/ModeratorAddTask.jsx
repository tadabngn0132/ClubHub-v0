import TaskForm from "../../../components/main/internal/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewTask,
  resetTaskStatus,
} from "../../../store/slices/taskSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const ModeratorAddTask = () => {
  const dispatch = useDispatch();
  const { isLoading, error, status } = useSelector((state) => state.task);
  const navigate = useNavigate();

  const handleAddTask = (data) => {
    dispatch(createNewTask(data));

    if (status === "fulfilled") {
      navigate("/moderator/tasks");
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
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
};

export default ModeratorAddTask;
