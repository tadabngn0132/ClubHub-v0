import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateActivityById,
  getActivityById,
  resetActivityStatus
} from "../../../store/slices/activitySlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";

const AdminEditActivity = () => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const { activity, isLoading, error, status } = useSelector((state) => state.activity);
  const navigate = useNavigate();

  useEffect(() => {
    if (activityId) {
      dispatch(getActivityById(activityId));
    }
    dispatch(resetActivityStatus());
  }, [activityId, dispatch]);

  const handleEditActivity = (data) => {
    dispatch(updateActivityById({ id: activityId, activityData: data }));

    if (status === "fulfilled") {
      navigate("/admin/activities");
    }

    dispatch(resetActivityStatus());
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <ActivityForm activity={activity} onSubmit={handleEditActivity} />
    </div>
  );
};

export default AdminEditActivity;
