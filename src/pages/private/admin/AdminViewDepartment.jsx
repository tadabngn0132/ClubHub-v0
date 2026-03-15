import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDepartmentDetails,
  deleteDepartmentById,
  resetStatus,
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const AdminViewDepartment = ({ departmentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { department, isLoading, error, status } = useSelector(
    (state) => state.department,
  );

  useEffect(() => {
    dispatch(getDepartmentDetails(departmentId));
  }, [dispatch, departmentId]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      dispatch(deleteDepartmentById(departmentId));

      if (status === "fulfilled") {
        navigate("/admin/departments");
      }
      dispatch(resetStatus());
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

        <div>
          <Link to={`/admin/departments/edit/${departmentId}`}>
            Edit Department
          </Link>
          <button onClick={handleDelete}>Delete Department</button>
        </div>
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

export default AdminViewDepartment;
