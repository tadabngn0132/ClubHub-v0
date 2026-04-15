import DepartmentForm from "../../../components/main/internal/DepartmentForm";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateDepartmentById,
  getDepartmentDetails,
  resetDepartmentError,
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const AdminEditDepartment = () => {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const { department, isLoading, error } = useSelector(
    (state) => state.department,
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (departmentId) {
      dispatch(getDepartmentDetails(departmentId));
    }
  }, [departmentId, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetDepartmentError());
    }
  }, [error]);

  const handleEditDepartment = async (data) => {
    await dispatch(
      updateDepartmentById({ departmentId, data }),
    ).unwrap();
    navigate("/admin/departments");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/admin/departments" className="inline-block w-max border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Departments
      </Link>
      <DepartmentForm department={department} onSubmit={handleEditDepartment} />
    </div>
  );
};

export default AdminEditDepartment;
