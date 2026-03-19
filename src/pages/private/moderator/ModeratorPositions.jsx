import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPositionsList } from "../../../store/slices/positionSlice";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import { formatPositionLevel, formatUppercaseToCapitalized, formatRoleBadgeColor } from "../../../utils/formatters";

const ModeratorPositions = () => {
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

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Positions</h1>
          <p className="text-gray-600">{positions.length} positions</p>
        </div>
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
                <div className={`badge ${formatRoleBadgeColor(formatUppercaseToCapitalized(position.systemRole))} w-22 text-center h-fit items-center-safe justify-center-safe p-1 pl-2 pr-2 rounded-2xl text-sm/tight`}>
                  {formatUppercaseToCapitalized(position.systemRole)}
                </div>
              </td>
              <td className="px-2 py-1 w-20">
                <div className="flex justify-center items-center gap-1 text-sm bg-white p-1 rounded-md shadow-md">
                  <Link
                    to={`/moderator/positions/view/${position.id}`}
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

export default ModeratorPositions;
