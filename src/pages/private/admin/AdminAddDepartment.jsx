import DepartmentForm from "../../../components/main/internal/DepartmentForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createNewDepartment,
  resetDepartmentError,
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminAddDepartment = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.department);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to add department");
      dispatch(resetDepartmentError());
    }
  }, [error]);

  const handleAddDepartment = async (data) => {
    await dispatch(createNewDepartment(data)).unwrap();
    navigate("/admin/departments");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link
        to="/admin/departments"
        className="inline-block w-max border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
      >
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Departments
      </Link>
      <DepartmentForm onSubmit={handleAddDepartment} />
    </div>
  );
};

export default AdminAddDepartment;
