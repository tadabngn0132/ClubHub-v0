import DepartmentForm from "../../../components/main/internal/DepartmentForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewDepartment,
  resetDepartmentStatus,
  resetDepartmentError,
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { useEffect } from "react";

const AdminAddDepartment = () => {
  const dispatch = useDispatch();
  const { isLoading, error, deparmentStatus } = useSelector(
    (state) => state.department,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetDepartmentError());
    }
  }, [error]);

  useEffect(() => {
    if (deparmentStatus === "fulfilled") {
      navigate("/admin/departments");
    }
    dispatch(resetDepartmentStatus());
  }, [deparmentStatus]);

  const handleAddDepartment = async (data) => {
    await dispatch(createNewDepartment(data)).unwrap();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <DepartmentForm onSubmit={handleAddDepartment} />
    </div>
  );
};

export default AdminAddDepartment;
