import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getPositionsList,
  deletePositionById,
} from "../../../store/slices/positionSlice";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import { resetStatus } from "../../../store/slices/positionSlice";

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
    dispatch(resetStatus());
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
        <thead>
          <tr>
            <th>Title</th>
            <th>Level</th>
            <th>System Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((position) => (
            <tr key={position.id} className="border-t border-gray-300">
              <td>{position.title}</td>
              <td>{position.level}</td>
              <td>{position.systemRole}</td>
              <td>
                <Link
                  to={`/admin/positions/view/${position.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  View
                </Link>
                <Link
                  to={`/admin/positions/edit/${position.id}`}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(position.id)}
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

export default AdminPositions;
