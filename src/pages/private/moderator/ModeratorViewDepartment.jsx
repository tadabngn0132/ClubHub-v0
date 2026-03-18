import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDepartmentDetails } from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast, { Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { formatDate } from "../../../utils/formatters.js";

const ModeratorViewDepartment = () => {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const { department, isLoading, error } = useSelector(
    (state) => state.department,
  );

  useEffect(() => {
    dispatch(getDepartmentDetails(departmentId));
  }, [dispatch, departmentId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Link to="/moderator/departments">Back to Departments</Link>
      <div>
        <h1>{department?.name}</h1>
      </div>

      <div>
        <p>Created At: {formatDate(department?.createdAt)}</p>
        <p>Updated At: {formatDate(department?.updatedAt)}</p>
      </div>

      <p>Description: {department?.description}</p>
      <p>Status: {department?.isActive ? "Active" : "Inactive"}</p>
    </div>
  );
};

export default ModeratorViewDepartment;
