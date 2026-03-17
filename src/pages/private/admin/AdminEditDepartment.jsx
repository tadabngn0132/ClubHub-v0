import DepartmentForm from "../../../components/main/internal/DepartmentForm";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetDepartmentStatus } from "../../../store/slices/departmentSlice";

const AdminEditDepartment = () => {
  const { departmentId } = useParams();
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
      <DepartmentForm mode="edit" departmentId={departmentId} />
    </div>
  );
};

export default AdminEditDepartment;
