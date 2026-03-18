import TaskForm from "../../../components/main/internal/TaskForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetTaskStatus } from "../../../store/slices/taskSlice";

const AdminEditTask = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/admin/tasks");
    }
    dispatch(resetTaskStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <TaskForm mode="edit" />
    </div>
  );
};

export default AdminEditTask;
