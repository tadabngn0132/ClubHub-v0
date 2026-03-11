import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetStatus } from "../../../store/slices/activitySlice";

const AdminEditActivity = () => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.activity);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'fulfilled') {
      navigate('/admin/activities');
    }
    dispatch(resetStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <ActivityForm mode="edit" activityId={activityId} />
    </div>
  );
};

export default AdminEditActivity;
