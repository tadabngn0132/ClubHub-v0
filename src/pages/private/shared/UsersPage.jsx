import { Link } from "react-router-dom";
import {
  getUsersList,
  softDeleteUserById,
  hardDeleteUserById,
} from "../../../store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import BulkActionBar from "../../../components/internal/BulkActionBar.jsx";
import Pagination from "../../../components/internal/Pagination.jsx";
import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  formatUppercaseToCapitalized,
  formatStatusBadgeColor,
  formatRoleBadgeColor,
} from "../../../utils/formatters.js";
import { USER_STATUS_OPTIONS } from "../../../utils/constants";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";

const UsersPage = ({ role, basePath }) => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector((state) => state.user);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    field: "id",
    direction: "asc",
  });
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (userId, mode) => {
    setSelectedUserId(userId);
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = (selectedUserId) => {
    if (deleteMode === "soft") {
      dispatch(softDeleteUserById(selectedUserId));
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteUserById(selectedUserId));
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
        const departmentName =
          user?.userPosition?.[0]?.position?.department?.name || "";
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
          String(
            user?.userPosition?.[0]?.position?.systemRole || "",
          ).toUpperCase() === roleFilter,
      );
    }

    result.sort((a, b) => {
      const getValue = (user) => {
        if (sortConfig.field === "name") return user.fullname || "";
        if (sortConfig.field === "email") return user.email || "";
        if (sortConfig.field === "generation")
          return Number(user.generation || 0);
        if (sortConfig.field === "id") return Number(user.id || 0);
        return "";
      };

      const valueA = getValue(a);
      const valueB = getValue(b);

      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      const compared = String(valueA).localeCompare(String(valueB));
      return sortConfig.direction === "asc" ? compared : -compared;
    });

    return result;
  }, [users, searchTerm, statusFilter, roleFilter, sortConfig]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-w-0 w-full overflow-x-hidden">
      {/* TODO: Implement loading state using spinner or skeleton */}
      <div className="flex items-center-safe justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Members</h1>
          <p className="text-sm text-gray-500">
            {filteredUsers.length} members
          </p>{" "}
          {/* Dynamic member count */}
        </div>

        {role === "ADMIN" && permissions?.canCreate && (
          <span>
            <Link
              to={`/${basePath}/add`}
              className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
            >
              Add Member
            </Link>
          </span>
        )}
      </div>

      {selectedUsers.length > 0 && (
        <BulkActionBar selectedUsers={selectedUsers} />
      )}

      <div className="mb-4 grid gap-3 md:grid-cols-4">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, email, gen, major..."
          className="md:col-span-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
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
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
        >
          <option value="all">All Roles</option>
          <option value="ADMIN">Admin</option>
          <option value="MODERATOR">Moderator</option>
          <option value="MEMBER">Member</option>
        </select>
        <button
          type="button"
          onClick={clearFilters}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 hover:border-[var(--pink-color)]"
        >
          Clear Filters
        </button>
      </div>

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
                <th className="px-2 py-2 text-center">Status</th>
                <th className="px-2 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {filteredUsers.length === 0 ? (
                <tr className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20">
                  <td colSpan="11" className="px-4 py-10 text-center">
                    <div className="flex flex-col items-center gap-2">
                      No members found.
                      {role === "ADMIN" && (
                        <span>
                          <Link
                            to={`/${basePath}/add`}
                            className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
                          >
                            Add Member
                          </Link>
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
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
                        src={user.avatarUrl || null}
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
                          to={`${basePath}/view/${user.id}`}
                          className="rounded-md bg-sky-500/20 px-2 py-1 font-semibold text-sky-300 transition hover:bg-sky-500/35"
                        >
                          View
                        </Link>
                        {role !== "MEMBER" && (
                          <>
                            <Link
                              to={`${basePath}/edit/${user.id}`}
                              className="rounded-md bg-emerald-500/20 px-2 py-1 font-semibold text-emerald-300 transition hover:bg-emerald-500/35"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                handleDeleteConfigured(user.id, "soft")
                              }
                              className="rounded-md bg-rose-500/20 px-2 py-1 font-semibold text-rose-300 transition hover:bg-rose-500/35"
                            >
                              Soft Delete
                            </button>
                          </>
                        )}

                        {role === "ADMIN" && (
                          <button
                            onClick={() =>
                              handleDeleteConfigured(user.id, "hard")
                            }
                            className="rounded-md bg-red-500/20 px-2 py-1 font-semibold text-red-300 transition hover:bg-red-500/35"
                          >
                            Hard Delete
                          </button>
                        )}
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
      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this member?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete(selectedUserId)}
      />
    </div>
  );
};

export default UsersPage;
