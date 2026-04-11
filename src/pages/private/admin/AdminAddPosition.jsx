import PositionForm from "../../../components/main/internal/PositionForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewPosition,
  resetPositionStatus,
  resetPositionError,
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const AdminAddPosition = () => {
  const dispatch = useDispatch();
  const { isLoading, error, positionStatus } = useSelector(
    (state) => state.position,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetPositionError());
    }
  }, [error]);

  useEffect(() => {
    if (positionStatus === "fulfilled") {
      navigate("/admin/positions");
    }
    dispatch(resetPositionStatus());
  }, [positionStatus]);

  const handleAddPosition = async (data) => {
    await dispatch(createNewPosition(data)).unwrap();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PositionForm onSubmit={handleAddPosition} />
    </div>
  );
};

export default AdminAddPosition;
