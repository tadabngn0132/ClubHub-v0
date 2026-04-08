import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDepartmentDetails,
  softDeleteDepartmentById,
  hardDeleteDepartmentById,
  resetDepartmentStatus,
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";

const DepartmentDetailPage = ({ role, basePath }) => {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { department, isLoading, error, departmentStatus } = useSelector(
    (state) => state.department,
  );

  useEffect(() => {
    dispatch(getDepartmentDetails(departmentId));
  }, [dispatch, departmentId]);

  const handleDelete = () => {
    if (role !== "ADMIN") {
      return;
    }

    const softConfirmed = window.confirm(
    "Do you want to deactivate this department?",
    );

    if (softConfirmed) {
    dispatch(softDeleteDepartmentById(departmentId));
    return;
    }

    const hardConfirmed = window.confirm(
    "Do you want to permanently delete this department? This action cannot be undone.",
    );

    if (hardConfirmed) {
    dispatch(hardDeleteDepartmentById(departmentId));
    }

    if (departmentStatus === "fulfilled") {
        navigate(basePath);
        dispatch(resetDepartmentStatus());
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Link to="/admin/departments">Back to Departments</Link>
      <div>
        <h1>{department?.name}</h1>

        {role === "ADMIN" && (
            <div>
                <Link to={`/admin/departments/edit/${departmentId}`}>
                    Edit Department
                </Link>
                <button onClick={handleDelete}>Delete Department</button>
            </div>
        )}
      </div>

      <div>
        <p>Created At: {department?.createdAt}</p>
        <p>Updated At: {department?.updatedAt}</p>
      </div>

      <p>Description: {department?.description}</p>
      <p>Status: {department?.isActive ? "Active" : "Inactive"}</p>
    </div>
  );
};

export default DepartmentDetailPage;
