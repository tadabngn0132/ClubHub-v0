import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  getDepartmentsList,
  softDeleteDepartmentById,
  hardDeleteDepartmentById,
  resetDepartmentStatus,
  resetDepartmentError,
} from "../../../store/slices/departmentSlice";
import toast from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { Link, useNavigate } from "react-router-dom";
import {
  formatDeptStatusBadgeColor,
  formatUppercaseToCapitalized,
  formatDeletedBadgeColor,
} from "../../../utils/formatters";
import { USER_STATUS_OPTIONS } from "../../../utils/constants";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";
import DepartmentDetailsModal from "../../../components/main/internal/DepartmentDetailsModal.jsx";

const DepartmentsPage = ({ role, basePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { departments, isLoading, error, departmentStatus } = useSelector(
    (state) => state.department,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name_asc");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [deleteMode, setDeleteMode] = useState("");
  const [isDepartmentDetailsModalOpen, setIsDepartmentDetailsModalOpen] =
    useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    dispatch(getDepartmentsList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching departments.",
      );
      dispatch(resetDepartmentError());
    }
  }, [error]);

  useEffect(() => {
    if (departmentStatus === "fulfilled") {
      navigate(basePath);
    }
    dispatch(resetDepartmentStatus());
  }, [departmentStatus]);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (departmentId, mode) => {
    setSelectedDepartmentId(departmentId);
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = (selectedDepartmentId) => {
    if (deleteMode === "soft") {
      dispatch(softDeleteDepartmentById(selectedDepartmentId));
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteDepartmentById(selectedDepartmentId));
      handleCloseConfirmationModal();
    }
  };

  const handleOpenDepartmentDetailsModal = (department) => {
    setSelectedDepartment(department);
    setIsDepartmentDetailsModalOpen(true);
  };

  const handleCloseDepartmentDetailsModal = () => {
    setIsDepartmentDetailsModalOpen(false);
    setSelectedDepartment(null);
  };

  const handleStatusLabel = (isActive) => {
    switch (isActive) {
      case true:
        return "Active";
      case false:
        return "Inactive";
      default:
        return "Unknown";
    }
  };

  const handleDeletedLabel = (isDeleted) => {
    switch (isDeleted) {
      case true:
        return "Deleted";
      case false:
        return "Not Deleted";
      default:
        return "Unknown";
    }
  };

  const filteredDepartments = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = [...(departments || [])];

    if (keyword) {
      result = result.filter((department) =>
        [department.name, department.description]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (statusFilter !== "all") {
      const expectedActive = statusFilter === "ACTIVE";
      result = result.filter(
        (department) => Boolean(department.isActive) === expectedActive,
      );
    }

    result.sort((a, b) => {
      if (sortBy === "name_desc") {
        return String(b.name || "").localeCompare(String(a.name || ""));
      }
      return String(a.name || "").localeCompare(String(b.name || ""));
    });

    return result;
  }, [departments, searchTerm, statusFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("name_asc");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Departments
          </h1>
          <p className="mt-1 text-slate-300">
            {filteredDepartments.length} departments
          </p>
        </div>

        {role === "ADMIN" && (
          <span>
            <Link
              to="/admin/departments/add"
              className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
            >
              Add New Department
            </Link>
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/65">
        <div className="grid gap-3 p-3 md:grid-cols-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search department name or description"
            className="md:col-span-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="all">All Statuses</option>
            {USER_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {formatUppercaseToCapitalized(status)}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="name_asc">Name: A-Z</option>
            <option value="name_desc">Name: Z-A</option>
          </select>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 hover:border-[var(--pink-color)]"
          >
            Clear Filters
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead className="bg-slate-800/95 text-slate-200 backdrop-blur">
              <tr className="border-b border-slate-700 text-left">
                <th className="px-3 py-3">Name</th>
                <th className="px-3 py-3">Description</th>
                <th className="px-3 py-3 text-center">Status</th>
                <th className="px-3 py-3 text-center">Is Deleted</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredDepartments.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-slate-300"
                  >
                    No departments found.
                    {role === "ADMIN" && (
                      <Link
                        to="/admin/departments/add"
                        className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
                      >
                        Add New Department
                      </Link>
                    )}
                  </td>
                </tr>
              ) : (
                filteredDepartments.map((department) => (
                  <tr
                    key={department.id}
                    className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20 hover:bg-slate-800/50"
                  >
                    <td className="px-3 py-3 font-medium text-slate-100">
                      {department.name}
                    </td>
                    <td
                      className="max-w-[420px] truncate px-3 py-3 text-slate-300"
                      title={department.description}
                    >
                      {department.description || "No description"}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <p
                        className={formatDeptStatusBadgeColor(
                          formatUppercaseToCapitalized(
                            handleStatusLabel(department.isActive),
                          ),
                        )}
                      >
                        {formatUppercaseToCapitalized(
                          handleStatusLabel(department.isActive),
                        )}
                      </p>
                    </td>
                    {role === "ADMIN" && (
                      <td className="px-3 py-3 text-center">
                        <p
                          className={formatDeletedBadgeColor(
                            department.isDeleted,
                          )}
                        >
                          {formatUppercaseToCapitalized(
                            handleDeletedLabel(department.isDeleted),
                          )}
                        </p>
                      </td>
                    )}
                    <td className="px-3 py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <button
                          onClick={() =>
                            handleOpenDepartmentDetailsModal(department)
                          }
                          className="rounded-md bg-emerald-500/20 px-3 py-1 font-semibold text-sky-300 transition hover:bg-sky-500/35"
                        >
                          View
                        </button>
                        {role === "ADMIN" && (
                          <>
                            <Link
                              to={`/admin/departments/edit/${department.id}`}
                              className="rounded-md bg-sky-500/20 px-3 py-1 font-semibold text-sky-300 transition hover:bg-sky-500/35"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                handleDeleteConfigured(department.id, "soft")
                              }
                              className="rounded-md bg-rose-500/20 px-3 py-1 font-semibold text-rose-300 transition hover:bg-rose-500/35"
                            >
                              Soft Delete
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteConfigured(department.id, "hard")
                              }
                              className="rounded-md bg-rose-600/30 px-3 py-1 font-semibold text-rose-400 transition hover:bg-rose-600/50"
                            >
                              Hard Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this department?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete(selectedDepartmentId)}
      />

      <DepartmentDetailsModal
        open={isDepartmentDetailsModalOpen}
        role={role}
        department={selectedDepartment}
        onClose={handleCloseDepartmentDetailsModal}
      />
    </div>
  );
};

export default DepartmentsPage;
