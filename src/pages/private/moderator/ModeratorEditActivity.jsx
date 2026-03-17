import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetActivityStatus } from "../../../store/slices/activitySlice";

const ModeratorEditActivity = () => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.activity);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/moderator/activities");
    }
    dispatch(resetActivityStatus());
  }, [status, navigate, dispatch]);

  console.log("Activity ID from ModeratorEditActivity:", activityId);
  return (
    <div>
      <ActivityForm mode="edit" activityId={activityId} />
    </div>
  );
};

export default ModeratorEditActivity;
