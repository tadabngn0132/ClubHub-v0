import TaskForm from "../../../components/main/internal/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewTask,
  resetTaskError,
} from "../../../store/slices/taskSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const AdminAddTask = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetTaskError());
    }
  }, [error]);

  const handleAddTask = async (data) => {
    await dispatch(createNewTask(data)).unwrap();
    navigate("/admin/tasks");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
};

export default AdminAddTask;
