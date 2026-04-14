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

const AdminAddUser = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetUserError());
    }
  }, [error]);

  const handleAddUser = async (data) => {
    await dispatch(createUser(data)).unwrap();
    navigate("/admin/users");
  };

  if (isLoading) {
    return <Loading />;
  }

  return <UserForm onSubmit={handleAddUser} />;
};

export default AdminAddUser;
