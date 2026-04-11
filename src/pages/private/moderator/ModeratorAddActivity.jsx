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

const ModeratorAddActivity = () => {
  const dispatch = useDispatch();
  const { isLoading, error, status } = useSelector((state) => state.activity);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetActivityError());
    }
  }, [error]);

  const handleAddActivity = (data) => {
    dispatch(createActivity(data));

    if (status === "fulfilled") {
      navigate("/moderator/activities");
    }

    dispatch(resetActivityStatus());
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

export default ModeratorAddActivity;
