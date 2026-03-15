import TaskForm from "../../../components/main/internal/TaskForm";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetStatus } from "../../../store/slices/taskSlice";

const AdminEditTask = () => {
  const { taskId } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/admin/tasks");
    }
    dispatch(resetStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <TaskForm mode="edit" taskId={taskId} />
    </div>
  );
};

export default AdminEditTask;
