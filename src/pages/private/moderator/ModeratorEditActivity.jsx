import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetActivityStatus } from "../../../store/slices/activitySlice";

const ModeratorEditActivity = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.activity);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/moderator/activities");
    }
    dispatch(resetActivityStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <ActivityForm mode="edit" />
    </div>
  );
};

export default ModeratorEditActivity;
