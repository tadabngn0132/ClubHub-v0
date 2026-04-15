import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getDepartmentDetails,
  softDeleteDepartmentById,
  hardDeleteDepartmentById,
  resetDepartmentError,
} from "../../../store/slices/departmentSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal";

const DepartmentDetailPage = ({ role, basePath }) => {
  const { departmentId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { department, isLoading, error, departmentStatus } = useSelector(
    (state) => state.department,
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getDepartmentDetails(departmentId));
  }, [dispatch, departmentId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetDepartmentError());
    }
  }, [error]);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (mode) => {
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = () => {
    if (deleteMode === "soft") {
      dispatch(softDeleteDepartmentById(departmentId));
      navigate(basePath);
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteDepartmentById(departmentId));
      navigate(basePath);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Link to="/admin/departments">Back to Departments</Link>
      <div>
        <h1>{department?.name}</h1>

        {role === "ADMIN" && (
          <div>
            <Link to={`/admin/departments/edit/${departmentId}`}>
              Edit
            </Link>
            <button onClick={() => handleDeleteConfigured("soft")}>
              Soft Delete
            </button>
            <button onClick={() => handleDeleteConfigured("hard")}>
              Hard Delete
            </button>
          </div>
        )}
      </div>

      <div>
        <p>Created At: {department?.createdAt}</p>
        <p>Updated At: {department?.updatedAt}</p>
      </div>

      <p>Description: {department?.description}</p>
      <p>Status: {department?.isActive ? "Active" : "Inactive"}</p>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this department?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default DepartmentDetailPage;
