import { useEffect } from "react";
import UserForm from "../../../components/main/internal/UserForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createUser,
  resetUserError,
} from "../../../store/slices/userSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AddUserPage = ({ basePath }) => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to add user");
      dispatch(resetUserError());
    }
  }, [error]);

  const handleAddUser = async (data) => {
    await dispatch(createUser(data)).unwrap();
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
      <UserForm onSubmit={handleAddUser} />
    </div>
  );
};

export default AddUserPage;
