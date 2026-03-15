import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDepartmentsList,
  deleteDepartmentById,
} from "../../../store/slices/departmentSlice";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import { resetStatus } from "../../../store/slices/departmentSlice";

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
    dispatch(resetStatus());
  };

  const handleStatusLabel = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "inactive":
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
          <h1 className="text-2xl font-bold">Departments</h1>
          <p className="text-gray-600">{departments.length} departments</p>
        </div>

        <span>
          <Link
            to="/admin/departments/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add New Department
          </Link>
        </span>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id} className="border-t border-gray-300">
              <td>{department.name}</td>
              <td>{department.description}</td>
              <td>{handleStatusLabel(department.status)}</td>
              <td>
                <Link
                  to={`/admin/departments/view/${department.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  View
                </Link>
                <Link
                  to={`/admin/departments/edit/${department.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(department.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDepartments;
