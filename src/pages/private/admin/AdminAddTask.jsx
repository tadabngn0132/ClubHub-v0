import TaskForm from "../../../components/main/internal/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewTask,
  resetTaskStatus,
} from "../../../store/slices/taskSlice";

const AdminAddTask = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.task);
  const navigate = useNavigate();

  const handleAddTask = (data) => {
    dispatch(createNewTask(data));

    if (status === "fulfilled") {
      navigate("/admin/tasks");
    }

    dispatch(resetTaskStatus());
  };

  return (
    <div>
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
};

export default AdminAddTask;
