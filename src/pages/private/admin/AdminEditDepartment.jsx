import DepartmentForm from "../../../components/main/internal/DepartmentForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateDepartmentById,
  getDepartmentDetails,
  resetDepartmentStatus,
  resetDepartmentError,
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";

const AdminEditDepartment = () => {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const { department, isLoading, error, status } = useSelector(
    (state) => state.department,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (departmentId) {
      dispatch(getDepartmentDetails(departmentId));
    }
    dispatch(resetDepartmentStatus());
  }, [departmentId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetDepartmentError());
    }
  }, [error]);

  const handleEditDepartment = (data) => {
    dispatch(updateDepartmentById({ departmentId, data }));
    if (status === "fulfilled") {
      navigate("/admin/departments");
    }
    dispatch(resetDepartmentStatus());
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <DepartmentForm department={department} onSubmit={handleEditDepartment} />
    </div>
  );
};

export default AdminEditDepartment;
