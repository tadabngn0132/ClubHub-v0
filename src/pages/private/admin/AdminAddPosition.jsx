import PositionForm from "../../../components/main/internal/PositionForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewPosition,
  resetPositionError,
} from "../../../store/slices/positionSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminAddPosition = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(
    (state) => state.position,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetPositionError());
    }
  }, [error]);

  const handleAddPosition = async (data) => {
    await dispatch(createNewPosition(data)).unwrap();
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
      <PositionForm onSubmit={handleAddPosition} />
    </div>
  );
};

export default AdminAddPosition;
