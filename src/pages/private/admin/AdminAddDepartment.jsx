import DepartmentForm from "../../../components/main/internal/DepartmentForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewDepartment,
  resetDepartmentStatus
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";

const AdminAddDepartment = () => {
  const dispatch = useDispatch();
  const { isLoading, error, status } = useSelector((state) => state.department);
  const navigate = useNavigate();

  const handleAddDepartment = (data) => {
    dispatch(createNewDepartment(data));
    if (status === "fulfilled") {
      navigate("/admin/departments");
    }
    dispatch(resetDepartmentStatus());
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <DepartmentForm onSubmit={handleAddDepartment} />
    </div>
  );
};

export default AdminAddDepartment;
