import UserForm from "../../../components/main/internal/UserForm.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetUserStatus } from "../../../store/slices/userSlice";

const AdminAddUser = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/admin/users");
    }
    dispatch(resetUserStatus());
  }, [status, navigate, dispatch]);

  return <UserForm mode="add" />;
};

export default AdminAddUser;
