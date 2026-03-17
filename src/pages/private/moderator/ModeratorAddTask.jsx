import TaskForm from "../../../components/main/internal/TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetTaskStatus } from "../../../store/slices/taskSlice";

const ModeratorAddTask = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.task);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/moderator/tasks");
    }
    dispatch(resetTaskStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <TaskForm mode="add" />
    </div>
  );
};

export default ModeratorAddTask;
