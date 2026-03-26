import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createActivity,
  resetActivityStatus
} from "../../../store/slices/activitySlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";

const AdminAddActivity = () => {
  const dispatch = useDispatch();
  const { isLoading, error, status } = useSelector((state) => state.activity);
  const navigate = useNavigate();

  const handleAddActivity = (data) => {
    dispatch(createActivity(data));

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
      <ActivityForm onSubmit={handleAddActivity} />
    </div>
  );
};

export default AdminAddActivity;
