import DepartmentForm from "../../../components/main/internal/DepartmentForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetDepartmentStatus } from "../../../store/slices/departmentSlice";

const AdminAddDepartment = () => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.department);
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "fulfilled") {
      navigate("/admin/departments");
    }
    dispatch(resetDepartmentStatus());
  }, [status, navigate, dispatch]);

  return (
    <div>
      <DepartmentForm mode="add" />
    </div>
  );
};

export default AdminAddDepartment;
