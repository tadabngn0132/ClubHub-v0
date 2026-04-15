import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateActivityById,
  getActivityById,
  resetActivityError,
} from "../../../store/slices/activitySlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditActivityPage = ({ basePath }) => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const { activity, isLoading, error } = useSelector(
    (state) => state.activity,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (activityId) {
      dispatch(getActivityById(activityId));
    }
  }, [activityId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetActivityError());
    }
  }, [error]);

  const handleEditActivity = async (data) => {
    await dispatch(
      updateActivityById({ id: activityId, activityData: data }),
    ).unwrap();
    navigate(basePath);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to={basePath} className="inline-block w-max border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Activities
      </Link>
      <ActivityForm activity={activity} onSubmit={handleEditActivity} />
    </div>
  );
};

export default EditActivityPage;
