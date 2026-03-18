import ActivityForm from "../../../components/main/internal/ActivityForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetActivityStatus } from "../../../store/slices/activitySlice";

const AdminEditActivity = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.activity);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/admin/activities");
    }
    dispatch(resetActivityStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <ActivityForm mode="edit" />
    </div>
  );
};

export default AdminEditActivity;
