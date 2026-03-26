import PositionForm from "../../../components/main/internal/PositionForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewPosition,
  resetPositionStatus
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const AdminAddPosition = () => {
  const dispatch = useDispatch();
  const { isLoading, error, positionStatus } = useSelector((state) => state.position);
  const navigate = useNavigate();

  const handleAddPosition = (data) => {
    dispatch(createNewPosition(data));
    if (positionStatus === "fulfilled") {
      navigate("/admin/positions");
    }
    dispatch(resetPositionStatus());
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <PositionForm onSubmit={handleAddPosition} />
    </div>
  );
};

export default AdminAddPosition;
