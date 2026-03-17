import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPositionDetails,
  deletePositionById,
  resetPositionStatus,
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const AdminViewPosition = () => {
  const { positionId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { position, isLoading, error, positionStatus } = useSelector(
    (state) => state.position,
  );

  useEffect(() => {
    dispatch(getPositionDetails(positionId));
  }, [dispatch, positionId]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this position?")) {
      dispatch(deletePositionById(positionId));

      if (positionStatus === "fulfilled") {
        navigate("/admin/positions");
      }
      dispatch(resetPositionStatus());
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Link to="/admin/positions">Back to Positions</Link>
      <div>
        <h1>{position?.name || "Position Details"}</h1>

        <div>
          <Link to={`/admin/positions/edit/${position?.id}`}>
            Edit Position
          </Link>
          <button onClick={handleDelete}>Delete Position</button>
        </div>
      </div>

      <div>
        <p>Created At: {position?.createdAt}</p>
        <p>Updated At: {position?.updatedAt}</p>
      </div>

      <p>{position?.level}</p>
      <p>{position?.systemRole}</p>
    </div>
  );
};

export default AdminViewPosition;
