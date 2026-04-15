import PositionForm from "../../../components/main/internal/PositionForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updatePositionDetails,
  getPositionDetails,
  resetPositionError,
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminEditPosition = () => {
  const { positionId } = useParams();
  const dispatch = useDispatch();
  const { position, isLoading, error } = useSelector(
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

  const handleEditPosition = async (data) => {
    await dispatch(
      updatePositionDetails({ id: positionId, positionData: data }),
    ).unwrap();
    navigate("/admin/positions");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/admin/positions" className="inline-block w-max border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Positions
      </Link>
      <PositionForm position={position} onSubmit={handleEditPosition} />
    </div>
  );
};

export default AdminEditPosition;
