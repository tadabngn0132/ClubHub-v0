import PositionForm from "../../../components/main/internal/PositionForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetStatus } from "../../../store/slices/positionSlice";

const AdminAddPosition = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.position);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/admin/positions");
    }
    dispatch(resetStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <PositionForm mode="add" />
    </div>
  );
};

export default AdminAddPosition;
