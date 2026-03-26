import UserForm from "../../../components/main/internal/UserForm.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateUserById,
  getUserById,
  resetUserStatus
} from "../../../store/slices/userSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const AdminEditUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { user, isLoading, error, status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserById(userId));
  }, [dispatch]);

  const handleEditUser = (data) => {
    dispatch(updateUserById({ userId, data }));
    if (status === "fulfilled") {
      navigate("/admin/users");
    }
    dispatch(resetUserStatus());
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <UserForm user={user} onSubmit={handleEditUser} />
    </div>
  );
};

export default AdminEditUser;
