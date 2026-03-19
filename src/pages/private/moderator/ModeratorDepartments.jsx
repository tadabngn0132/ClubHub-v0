import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDepartmentsList } from "../../../store/slices/departmentSlice";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import { formatUppercaseToCapitalized, formatStatusBadgeColor } from "../../../utils/formatters.js";

const ModeratorDepartments = () => {
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
          <h1 className="text-2xl font-bold">Departments</h1>
          <p className="text-gray-600">{departments.length} departments</p>
        </div>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr className="border-b border-gray-300 text-left">
            <th className="px-2 py-1">Name</th>
            <th className="px-2 py-1">Description</th>
            <th className="px-2 py-1">Status</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id} className="border-t border-gray-300">
              <td className="px-2 py-1">{department.name}</td>
              <td className="px-2 py-1">{department.description}</td>
              <td className="px-2 py-1">
                <p className={formatStatusBadgeColor(formatUppercaseToCapitalized(handleStatusLabel(department.isActive)))}>
                  {formatUppercaseToCapitalized(handleStatusLabel(department.isActive))}
                </p>
              </td>
              <td className="px-2 py-1">
                <div className="flex justify-center items-center gap-1 text-sm bg-white p-2 rounded-md shadow-md">
                  <Link
                    to={`/moderator/departments/view/${department.id}`}
                    className="text-green-500 hover:underline"
                  >
                    View
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorDepartments;
