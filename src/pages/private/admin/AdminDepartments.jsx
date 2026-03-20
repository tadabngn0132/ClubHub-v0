import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDepartmentsList,
  deleteDepartmentById,
} from "../../../store/slices/departmentSlice";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import { resetDepartmentStatus } from "../../../store/slices/departmentSlice";
import { formatDeptStatusBadgeColor } from "../../../utils/formatters";

const AdminDepartments = () => {
  const dispatch = useDispatch();
  const { departments, isLoading, error } = useSelector(
    (state) => state.department,
  );

  useEffect(() => {
    dispatch(getDepartmentsList());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  const handleDelete = (id) => {
    dispatch(deleteDepartmentById(id));
    dispatch(resetDepartmentStatus());
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

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Departments</h1>
          <p className="text-gray-600">{departments.length} departments</p>
        </div>

        <span>
          <Link
            to="/admin/departments/add"
            className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
          >
            Add New Department
          </Link>
        </span>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="border border-gray-200 text-left">
            <th className="px-2 py-1">Name</th>
            <th className="px-2 py-1">Description</th>
            <th className="px-2 py-1 text-center">Status</th>
            <th className="px-2 py-1 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id} className="border-t border-gray-300">
              <td className="px-2 py-1">{department.name}</td>
              <td className="px-2 py-1">{department.description}</td>
              <td className="px-2 py-1">
                <span className={formatDeptStatusBadgeColor(department.isActive)}>
                  {handleStatusLabel(department.isActive)}
                </span>
              </td>
              <td className="px-2 py-1">
                <div className="flex justify-center items-center gap-1 text-xs bg-white p-2 rounded-md shadow-md">
                  <Link
                    to={`/admin/departments/view/${department.id}`}
                    className="text-green-500 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/departments/edit/${department.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(department.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDepartments;
