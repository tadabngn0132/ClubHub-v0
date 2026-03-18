import UserForm from "../../../components/main/internal/UserForm.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetUserStatus } from "../../../store/slices/userSlice";

const ModeratorEditUser = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/moderator/users");
    }
    dispatch(resetUserStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <UserForm mode="edit" />
    </div>
  );
};

export default ModeratorEditUser;
