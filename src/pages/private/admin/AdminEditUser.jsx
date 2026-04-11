import UserForm from "../../../components/main/internal/UserForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateUserById,
  getUserById,
  resetUserStatus,
  resetUserError,
} from "../../../store/slices/userSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const AdminEditUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user, isLoading, error, userStatus } = useSelector(
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

  useEffect(() => {
    if (userStatus === "fulfilled") {
      navigate("/admin/users");
    }

    dispatch(resetUserStatus());
  }, [userStatus]);

  const handleEditUser = async (data) => {
    await dispatch(updateUserById({ id: userId, userData: data })).unwrap();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <UserForm user={user} onSubmit={handleEditUser} />
    </div>
  );
};

export default AdminEditUser;
