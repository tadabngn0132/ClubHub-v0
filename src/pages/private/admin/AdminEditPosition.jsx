import PositionForm from "../../../components/main/internal/PositionForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updatePositionDetails,
  getPositionDetails,
  resetPositionStatus,
  resetPositionError,
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const AdminEditPosition = () => {
  const { positionId } = useParams();
  const dispatch = useDispatch();
  const { position, isLoading, error, positionStatus } = useSelector(
    (state) => state.position,
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPositionDetails(positionId));
  }, [dispatch, positionId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetPositionError());
    }
  }, [error]);

  const handleEditPosition = (data) => {
    dispatch(updatePositionDetails({ positionId, data }));

    if (positionStatus === "fulfilled") {
      navigate("/admin/positions");
    }

    dispatch(resetPositionStatus());
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PositionForm position={position} onSubmit={handleEditPosition} />
    </div>
  );
};

export default AdminEditPosition;
