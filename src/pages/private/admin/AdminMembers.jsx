import { Link } from "react-router-dom";
import {
  getUserById,
  getUsersList,
  deleteUserById,
} from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mockUsers } from "../../../data/sampleMemberData";

const AdminMembers = () => {
  const dispatch = useDispatch();
  const { usersList, isLoading, isError, message } = useSelector(
    (state) => state.user,
  );

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUserById(userId));
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center-safe justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Members</h1>
          <p className="text-sm text-gray-500">
            {mockUsers ? mockUsers.length : 0} members
          </p>{" "}
          {/* Dynamic member count */}
        </div>

        <span>
          <Link
            to="/admin/members/add"
            className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
          >
            Add Member
          </Link>
        </span>
      </div>
      <table className="w-full border-collapse table-auto overflow-auto">
        <thead className="sticky top-[60px] text-white z-10 w-full bg-[var(--black-color)]">
          <tr className="border border-gray-200">
            <th className="px-2 py-2 w-8"></th>
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2 w-16">Avatar</th>
            <th className="px-3 py-2">Name</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-2 py-2">Gen</th>
            <th className="px-2 py-2">Major</th>
            <th className="px-2 py-2">Dept</th>
            <th className="px-2 py-2">Role</th>
            <th className="px-2 py-2">Status</th>
            <th className="px-2 py-2 w-24">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center border border-gray-200">
          {mockUsers &&
            mockUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 odd-child:bg-white even-child:bg-gray-50"
              >
                <td className="px-2 py-2 w-8">
                  <input
                    type="checkbox"
                    name={`select-${user.id}`}
                    id={`select-${user.id}`}
                  />
                </td>
                <td className="px-2 py-2 text-xs">{user.id}</td>
                <td className="px-2 py-2 w-16">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </td>
                <td
                  className="px-3 py-2 max-w-[120px] truncate"
                  title={user.name}
                >
                  {user.name}
                </td>
                <td
                  className="px-3 py-2 max-w-[160px] truncate text-sm"
                  title={user.email}
                >
                  {user.email}
                </td>
                <td className="px-2 py-2 text-sm">{user.gen}</td>
                <td
                  className="px-2 py-2 text-sm max-w-[80px] truncate"
                  title={user.major}
                >
                  {user.major}
                </td>
                <td
                  className="px-2 py-2 text-sm max-w-[80px] truncate"
                  title={user.department}
                >
                  {user.department}
                </td>
                <td className="px-2 py-2 text-sm">{user.role}</td>
                <td className="px-2 py-2 text-sm">{user.status}</td>
                <td className="px-2 py-2 w-24">
                  <div className="flex justify-center items-center gap-1 text-xs">
                    <Link
                      to={`/admin/members/view/${user.id}`}
                      className="text-green-500 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/admin/members/edit/${user.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-500 hover:underline"
                    >
                      Del
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

export default AdminMembers;
