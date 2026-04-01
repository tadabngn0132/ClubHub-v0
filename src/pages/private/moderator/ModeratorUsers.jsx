import { Link } from "react-router-dom";
import {
  getUsersList,
  softDeleteUserById,
} from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import BulkActionBar from "../../../components/internal/BulkActionBar.jsx";
import Pagination from "../../../components/internal/Pagination.jsx";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import { formatUppercaseToCapitalized, formatRoleBadgeColor, formatStatusBadgeColor } from "../../../utils/formatters.js";
import { USER_STATUS_OPTIONS } from "../../../utils/constants";

const ModeratorUsers = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.user);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({ field: "id", direction: "asc" });

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to deactivate this user?")) {
      dispatch(softDeleteUserById(userId));
    }
  };

  const handleSort = (field) => {
    setSortConfig((prev) => {
      if (prev.field === field) {
        return { field, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { field, direction: "asc" };
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setRoleFilter("all");
    setSortConfig({ field: "id", direction: "asc" });
  };

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = [...(users || [])];

    if (keyword) {
      result = result.filter((user) => {
        const departmentName = user?.userPosition?.[0]?.position?.department?.name || "";
        const role = user?.userPosition?.[0]?.position?.systemRole || "";

        return [
          String(user.id),
          user.fullname,
          user.email,
          user.major,
          String(user.generation || ""),
          departmentName,
          role,
          user.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword);
      });
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (user) => String(user.status || "").toUpperCase() === statusFilter,
      );
    }

    if (roleFilter !== "all") {
      result = result.filter(
        (user) =>
          String(user?.userPosition?.[0]?.position?.systemRole || "").toUpperCase() === roleFilter,
      );
    }

    result.sort((a, b) => {
      const getValue = (user) => {
        if (sortConfig.field === "name") return user.fullname || "";
        if (sortConfig.field === "email") return user.email || "";
        if (sortConfig.field === "generation") return Number(user.generation || 0);
        if (sortConfig.field === "id") return Number(user.id || 0);
        return "";
      };

      const valueA = getValue(a);
      const valueB = getValue(b);
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
      }

      const compared = String(valueA).localeCompare(String(valueB));
      return sortConfig.direction === "asc" ? compared : -compared;
    });

    return result;
  }, [users, searchTerm, statusFilter, roleFilter, sortConfig]);

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
          <p className="text-sm text-gray-500">{filteredUsers.length} members</p>{" "}
          {/* Dynamic member count */}
        </div>
      </div>

      {selectedUsers.length > 0 && (
        <BulkActionBar selectedUsers={selectedUsers} />
      )}

      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, gen, major..."
          className="md:col-span-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[var(--pink-color)]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[var(--pink-color)]"
        >
          <option value="all">All Statuses</option>
          {USER_STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {formatUppercaseToCapitalized(status)}
            </option>
          ))}
        </select>
        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-[var(--pink-color)]"
        >
          <option value="all">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MODERATOR">Moderator</option>
          <option value="MEMBER">Member</option>
        </select>
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 hover:border-[var(--pink-color)]"
        >
          Clear Filters
        </button>
      </div>

      {/* TODO: Implement card view for tablet and mobile responsiveness */}
      <table className="w-full border-collapse table-auto overflow-auto">
        <thead className="sticky top-[60px] z-10 w-full bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
          <tr className="border border-gray-200 text-left">
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
            <th className="px-2 py-2" onClick={() => handleSort("generation")}>
              Gen
            </th>
            <th className="px-2 py-2">Major</th>
            <th className="px-2 py-2">Dept</th>
            <th className="px-2 py-2">System Role</th>
            <th className="px-2 py-2 text-center">Status</th>
            <th className="px-2 py-2 w-24 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-center border border-gray-200">
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="11" className="py-4">
                No members found.
              </td>
            </tr>
          ) : (
            filteredUsers.map((user) => (
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
                    alt={user.fullname}
                    className="w-12 h-12 rounded-full object-cover mx-auto"
                  />
                </td>
                <td
                  className="px-3 py-2 max-w-[120px] truncate text-left"
                  title={user.fullname}
                >
                  {user.fullname}
                </td>
                <td
                  className="px-3 py-2 max-w-[160px] truncate text-sm text-left"
                  title={user.email}
                >
                  {user.email}
                </td>
                <td className="px-2 py-2 text-sm">{user.generation}</td>
                <td
                  className="px-2 py-2 text-sm max-w-[80px] truncate"
                  title={user.major}
                >
                  {user.major}
                </td>
                <td
                  className="px-2 py-2 text-sm max-w-[80px] truncate text-left"
                  title={user.department}
                >
                  {user.userPosition[0].position.department.name}
                </td>
                <td className="px-2 py-2 text-sm">
                  {user.userPosition[0].position.systemRole && (
                    <p className={`badge ${formatRoleBadgeColor(formatUppercaseToCapitalized(user.userPosition[0].position.systemRole))} w-22 text-center h-fit items-center-safe justify-center-safe p-1 pl-2 pr-2 rounded-2xl text-sm/tight`}>
                      {formatUppercaseToCapitalized(user.userPosition[0].position.systemRole)}
                    </p>
                  )}
                </td>
                <td className="px-2 py-2 text-sm">
                  {user.status && (
                    <p className={formatStatusBadgeColor(formatUppercaseToCapitalized(user.status))}>
                      {formatUppercaseToCapitalized(user.status)}
                    </p>
                  )}
                </td>
                <td className="px-2 py-2 w-24 relative">
                  <div className="flex justify-center items-center gap-1 text-xs bg-white p-2 rounded-md shadow-md">
                    <Link
                      to={`/moderator/users/view/${user.id}`}
                      className="text-green-500 hover:underline"
                    >
                      View
                    </Link>
                    <Link
                      to={`/moderator/users/edit/${user.id}`}
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
      {users && users.length > 25 && (
        <Pagination role="moderator" content="users" />
      )}
    </div>
  );
};

export default ModeratorUsers;
