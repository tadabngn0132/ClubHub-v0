import UserForm from "../../../components/main/internal/UserForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createUser,
  resetUserStatus
} from "../../../store/slices/userSlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";

const AdminAddUser = () => {
  const dispatch = useDispatch();
  const { isLoading, error, status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleAddUser = (data) => {
    dispatch(createUser(data));
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
  
  return <UserForm onSubmit={handleAddUser} />;
};

export default AdminAddUser;
