import { Link } from "react-router-dom";
import { getUsersList, deleteUserById } from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { mockUsers } from "../../../data/sampleMemberData";
import BulkActionBar from "../../../components/internal/BulkActionBar.jsx";
import Pagination from "../../../components/internal/Pagination.jsx";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";

const MemberUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.user);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUserById(userId));
  };

  // TODO: Implement sorting functionality here
  const handleSort = (field) => {
    // Sorting logic will be implemented here
    // Asc, Desc and Default states
  };

  const displayStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600 font-medium";
      case "Inactive":
        return "text-gray-600 font-medium";
      case "Alumni":
        return "text-blue-600 font-medium";
      case "Pending":
        return "text-yellow-600 font-medium";
      default:
        return "";
    }
  };

  const displayRoleBadge = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold";
      case "Moderator":
        return "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold";
      case "Member":
        return "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold";
      default:
        return "";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="w-full p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center-safe justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Members</h1>
          <p className="text-sm text-gray-500">
            {users ? users.length : 0} members
          </p>{" "}
          {/* Dynamic member count */}
        </div>
      </div>

      {selectedUsers.length > 0 && (
        <BulkActionBar selectedUsers={selectedUsers} />
      )}

      {/* TODO: Implement card view for tablet and mobile responsiveness */}
      <table className="w-full border-collapse table-auto overflow-auto">
        <thead className="sticky top-[60px] text-white z-10 w-full bg-[var(--black-color)]">
          <tr className="border border-gray-200">
            {/* TODO: Implement checkbox for selecting all members */}
            <th className="px-2 py-2 w-8">
              {/* <input type="checkbox" name="" id="" /> */}
            </th>
            <th className="px-2 py-2">ID</th>
            <th className="px-2 py-2 w-16">Avatar</th>
            {/* TODO: Implement clickable for name, email, and gen here with sorting indicators and related icon */}
            <th className="px-3 py-2" onClick={() => handleSort("name")}>
              Name
            </th>
            <th className="px-3 py-2" onClick={() => handleSort("email")}>
              Email
            </th>
            <th className="px-2 py-2" onClick={() => handleSort("gen")}>
              Gen
            </th>
            <th className="px-2 py-2">Major</th>
            <th className="px-2 py-2">Dept</th>
            <th className="px-2 py-2">Role</th>
            <th className="px-2 py-2">Status</th>
            <th className="px-2 py-2 w-24">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center border border-gray-200">
          {users && users.length === 0 ? (
            <tr>
              <td colSpan="11" className="py-4">
                No members found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 odd-child:bg-white even-child:bg-gray-50"
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
                <td className="px-2 py-2 text-xs">{user.id}</td>
                <td className="px-2 py-2 w-16">
                  {/* TODO: Implement lazy loading for avatars */}
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
                <td className="px-2 py-2 text-sm">
                  {user.role && (
                    <p className={displayRoleBadge(user.role)}>{user.role}</p>
                  )}
                </td>
                <td className="px-2 py-2 text-sm">
                  {user.status && (
                    <p className={displayStatusBadge(user.status)}>
                      {user.status}
                    </p>
                  )}
                </td>
                <td className="px-2 py-2 w-24 relative">
                  <div className="flex justify-center items-center gap-1 text-xs absolute top-10 bg-white p-2 rounded-md shadow-md">
                    <Link
                      to={`/member/users/view/${user.id}`}
                      className="text-green-500 hover:underline"
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
      <Pagination role="member" content="users" />
    </div>
  );
};

export default MemberUsers;
