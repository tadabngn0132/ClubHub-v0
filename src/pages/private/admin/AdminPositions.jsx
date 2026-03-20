import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getPositionsList,
  deletePositionById,
} from "../../../store/slices/positionSlice";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import { resetPositionStatus } from "../../../store/slices/positionSlice";
import { formatRoleBadgeColor, formatUppercaseToCapitalized, formatPositionLevel } from "../../../utils/formatters";

const AdminPositions = () => {
  const dispatch = useDispatch();
  const { positions, isLoading, error } = useSelector(
    (state) => state.position,
  );

  useEffect(() => {
    dispatch(getPositionsList());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  const handleDelete = (id) => {
    dispatch(deletePositionById(id));
    dispatch(resetPositionStatus());
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Positions</h1>
          <p className="text-gray-600">{positions.length} positions</p>
        </div>

        <span>
          <Link
            to="/admin/positions/add"
            className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
          >
            Add New Position
          </Link>
        </span>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr className="border-b border-gray-300 text-left">
            <th className="px-2 py-1">Title</th>
            <th className="px-2 py-1">Level</th>
            <th className="px-2 py-1">System Role</th>
            <th className="px-2 py-1 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id} className="border-t border-gray-300">
              <td className="px-2 py-1">{position.title}</td>
              <td className="px-2 py-1">{formatPositionLevel(position.level)}</td>
              <td className="px-2 py-1">
                <div className="flex items-center gap-2">
                  <span className={`badge ${formatRoleBadgeColor(formatUppercaseToCapitalized(position.systemRole))} w-22 text-center h-fit p-1 pl-2 pr-2 rounded-2xl text-sm/tight`}>
                    {formatUppercaseToCapitalized(position.systemRole)}
                  </span>
                </div>
              </td>
              <td className="px-2 py-2 w-24 text-center">
                <div className="flex justify-center items-center gap-1 text-xs bg-white p-2 rounded-md shadow-md">
                  <Link
                    to={`/admin/positions/view/${position.id}`}
                    className="text-green-500 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/positions/edit/${position.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(position.id)}
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

export default AdminPositions;
