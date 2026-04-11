import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createActivity,
  resetActivityStatus,
  resetActivityError,
} from "../../../store/slices/activitySlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";

const AdminAddActivity = () => {
  const dispatch = useDispatch();
  const { isLoading, error, activityStatus } = useSelector(
    (state) => state.activity,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetActivityError());
    }
  }, [error]);

  useEffect(() => {
    if (activityStatus === "fulfilled") {
      navigate("/admin/activities");
    }
    dispatch(resetActivityStatus());
  }, [activityStatus]);

  const handleAddActivity = async (data) => {
    await dispatch(createActivity(data)).unwrap();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ActivityForm onSubmit={handleAddActivity} />
    </div>
  );
};

export default AdminAddActivity;
