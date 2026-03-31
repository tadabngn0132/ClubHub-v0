import { Link } from "react-router-dom";
import {
  getUsersList,
} from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BulkActionBar from "../../../components/internal/BulkActionBar.jsx";
import Pagination from "../../../components/internal/Pagination.jsx";
import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  formatUppercaseToCapitalized,
  formatStatusBadgeColor,
  formatRoleBadgeColor,
} from "../../../utils/formatters.js";
import { Toaster } from "react-hot-toast";

const MemberUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.user);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  // TODO: Implement sorting functionality here
  const handleSort = (field) => {
    // Sorting logic will be implemented here
    // Asc, Desc and Default states
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-w-0 w-full overflow-x-hidden">
      <Toaster position="top-right" reverseOrder={false} />
      {/* TODO: Implement loading state using spinner or skeleton */}
      <div className="flex items-center-safe justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Members</h1>
          <p className="text-sm text-gray-500">
            {users ? users.length : 0} members
          </p>{" "}
        </div>
      </div>

      {selectedUsers.length > 0 && (
        <BulkActionBar selectedUsers={selectedUsers} />
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/65">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead className="bg-slate-800/95 text-slate-200 backdrop-blur">
              <tr className="border-b border-slate-700 text-left">
                <th className="px-2 py-2 text-center">
                  <input type="checkbox" name="" id="" />
                </th>
                <th className="px-2 py-2">ID</th>
                <th className="px-2 py-2">Avatar</th>
                {/* TODO: Implement clickable for name, email, and gen here with sorting indicators and related icon */}
                <th className="px-2 py-2" onClick={() => handleSort("name")}>
                  Name
                </th>
                <th className="px-2 py-2" onClick={() => handleSort("email")}>
                  Email
                </th>
                <th
                  className="px-2 py-2"
                  onClick={() => handleSort("generation")}
                >
                  Gen
                </th>
                <th className="px-2 py-2">Major</th>
                <th className="px-2 py-2">Dept</th>
                <th className="px-2 py-2 text-center">Role</th>
                <th className="px-2 py-2">Status</th>
                <th className="px-2 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {users && users.length === 0 ? (
                <tr className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20">
                  <td colSpan="11" className="px-4 py-10 text-center">
                    No members found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20 hover:bg-slate-800/50"
                  >
                    <td className="px-2 py-2 w-8">
                      <input
                        type="checkbox"
                        name={`select-${user.id}`}
                        id={`select-${user.id}`}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id]);
                          } else {
                            setSelectedUsers(
                              selectedUsers.filter((id) => id !== user.id),
                            );
                          }
                        }}
                      />
                    </td>
                    <td className="px-2 py-2">{user.id}</td>
                    <td className="px-2 py-2">
                      {/* TODO: Implement lazy loading for avatars */}
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    </td>
                    <td
                      className="px-2 py-2 text-sm font-medium text-left truncate max-w-[150px]"
                      title={user.fullname}
                    >
                      {user.fullname}
                    </td>
                    <td
                      className="px-2 py-2 text-sm text-left truncate max-w-[150px]"
                      title={user.email}
                    >
                      {user.email}
                    </td>
                    <td className="px-2 py-2">{user.generation}</td>
                    <td
                      className="px-2 py-2 text-sm text-left truncate max-w-[100px]"
                      title={user.major}
                    >
                      {user.major}
                    </td>
                    <td
                      className="px-2 py-2 text-sm text-left truncate max-w-[100px]"
                      title={user.department}
                    >
                      {user.userPosition[0].position.department.name}
                    </td>
                    <td className="px-2 py-2 text-sm text-center">
                      <div className="flex justify-center items-center gap-1">
                        {user.userPosition[0].position.systemRole && (
                          <p
                            className={`badge ${formatRoleBadgeColor(formatUppercaseToCapitalized(user.userPosition[0].position.systemRole))} w-22 text-center h-fit p-1 pl-2 pr-2 rounded-2xl text-sm/tight`}
                          >
                            {formatUppercaseToCapitalized(
                              user.userPosition[0].position.systemRole,
                            )}
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="px-2 py-2 text-sm text-center">
                      {user.status && (
                        <p
                          className={formatStatusBadgeColor(
                            formatUppercaseToCapitalized(user.status),
                          )}
                        >
                          {formatUppercaseToCapitalized(user.status)}
                        </p>
                      )}
                    </td>
                    <td className="px-2 py-2 text-sm text-center">
                      <div className="flex items-center justify-center gap-2 text-xs">
                        <Link
                          to={`/member/users/view/${user.id}`}
                          className="rounded-md bg-sky-500/20 px-2 py-1 font-semibold text-sky-300 transition hover:bg-sky-500/35"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {users && users.length > 25 && (
        <Pagination currentPage={5} totalPages={10} onPageChange={() => {}} />
      )}
    </div>
  );
};

export default MemberUsers;
