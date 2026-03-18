import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPositionDetails } from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const ModeraterViewPosition = () => {
  const { positionId } = useParams();
  const dispatch = useDispatch();
  const { position, isLoading, error } = useSelector((state) => state.position);

  useEffect(() => {
    dispatch(getPositionDetails(positionId));
  }, [dispatch, positionId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Link to="/moderator/positions">Back to Positions</Link>
      <div>
        <h1>{position?.title || "Position Details"}</h1>
      </div>

      <p>Level: {position?.level}</p>
      <p>System Role: {position?.systemRole}</p>
    </div>
  );
};

export default ModeraterViewPosition;
