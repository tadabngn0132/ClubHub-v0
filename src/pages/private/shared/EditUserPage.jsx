import UserForm from "../../../components/main/internal/UserForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateUserById,
  getUserById,
  resetUserError,
} from "../../../store/slices/userSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const EditUserPage = ({ basePath }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector(
    (state) => state.user,
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetUserError());
    }
  }, [error]);

  const handleEditUser = async (data) => {
    await dispatch(updateUserById({ id: userId, userData: data })).unwrap();
    navigate(basePath);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to={basePath} className="inline-block w-max border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Users
      </Link>
      <UserForm user={user} onSubmit={handleEditUser} />
    </div>
  );
};

export default EditUserPage;
