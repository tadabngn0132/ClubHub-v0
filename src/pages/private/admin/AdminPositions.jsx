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
          <h1 className="text-2xl font-bold">Positions</h1>
          <p className="text-gray-600">{positions.length} positions</p>
        </div>

        <span>
          <Link
            to="/admin/positions/add"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
              <td className="px-2 py-1">{position.level}</td>
              <td className="px-2 py-1">{position.systemRole}</td>
              <td className="px-2 py-1 text-center">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPositions;
