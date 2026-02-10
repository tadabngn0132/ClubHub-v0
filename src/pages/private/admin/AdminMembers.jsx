import { Link } from "react-router-dom";
import {
  getUsersList,
  deleteUserById,
} from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { mockUsers } from "../../../data/sampleMemberData";
import BulkActionBar from "../../../components/internal/BulkActionBar.jsx";
import Pagination from "../../../components/internal/Pagination.jsx";

const AdminMembers = () => {
  const dispatch = useDispatch();
  const { usersList, isLoading, isError, message } = useSelector(
    (state) => state.user,
  );
  const [selectedMembers, setSelectedMembers] = useState([]);

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

  return (
    <div className="w-full p-4">
      {/* TODO: Implement loading state using spinner or skeleton */}
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

      {selectedMembers.length > 0 && <BulkActionBar selectedMembers={selectedMembers} />}

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
          {mockUsers.length === 0 ? (
            <tr>
              <td colSpan="11" className="py-4">
                No members found.
                <span>
                  <Link
                    to="/admin/members/add"
                    className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
                  >
                    Add Member
                  </Link>
                </span>
              </td>
            </tr>
          ) : (
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
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedMembers([...selectedMembers, user.id]);
                      } else {
                        setSelectedMembers(
                          selectedMembers.filter((id) => id !== user.id),
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
                  {/* TODO: Use fontawesome vertical three dots instead of current horizontal dots */}
                  <p className="cursor-pointer">...</p>
                  {/* TODO: Click on vertical three dots or outside to close action menu*/}
                  <div className="flex justify-center items-center gap-1 text-xs absolute top-10 bg-white p-2 rounded-md shadow-md">
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
            ))
          )}
        </tbody>
      </table>
      <Pagination role="admin" content="members" />
    </div>
  );
};

export default AdminMembers;
