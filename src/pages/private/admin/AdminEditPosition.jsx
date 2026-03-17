import PositionForm from "../../../components/main/internal/PositionForm";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetPositionStatus } from "../../../store/slices/positionSlice";

const AdminEditPosition = () => {
  const { positionId } = useParams();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.position);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/admin/positions");
    }
    dispatch(resetPositionStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <PositionForm mode="edit" positionId={positionId} />
    </div>
  );
};

export default AdminEditPosition;
