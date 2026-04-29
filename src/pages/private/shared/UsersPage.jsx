import { Link } from "react-router-dom";
import {
  getUsersList,
  softDeleteUserById,
  hardDeleteUserById,
  restoreUserById,
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
import { getUserRole } from "../../../utils/helper.js";

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
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteUserById(selectedUserId));
      handleCloseConfirmationModal();
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

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    statusFilter !== "all" ||
    roleFilter !== "all" ||
    sortConfig.field !== "id" ||
    sortConfig.direction !== "asc";

  const filteredUsers = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = [...(users || [])];

    if (keyword) {
      result = result.filter((user) => {
        const departmentName =
          user?.userPosition?.find((up) => up.isPrimary)?.position?.department
            ?.name || "";
        const role = getUserRole(user) || "";

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
        (user) => String(getUserRole(user) || "").toUpperCase() === roleFilter,
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

  const handleRestore = (userId) => {
    dispatch(restoreUserById(userId));
  };

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

        {role === "ADMIN" && (
          <span>
            <Link
              to={`${basePath}/add`}
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
                {role === "ADMIN" && (
                  <th className="px-2 py-2 text-center">Is Deleted</th>
                )}
                <th className="px-2 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {filteredUsers.length === 0 ? (
                <tr className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20">
                  <td
                    colSpan={role === "ADMIN" ? 12 : 11}
                    className="px-4 py-10 text-center"
                  >
                    <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-200">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-8 w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            d="M16 19V17.8C16 16.1198 16 15.2798 15.673 14.638C15.3854 14.0735 14.9265 13.6146 14.362 13.327C13.7202 13 12.8802 13 11.2 13H8.8C7.11984 13 6.27976 13 5.63803 13.327C5.07354 13.6146 4.6146 14.0735 4.32698 14.638C4 15.2798 4 16.1198 4 17.8V19M20 19V17.8C20 16.3747 20 15.662 19.7784 15.0993C19.4814 14.3455 18.8894 13.7536 18.1357 13.4566C17.5729 13.235 16.8603 13.235 15.435 13.235M14.5 5.5C14.5 7.433 12.933 9 11 9C9.067 9 7.5 7.433 7.5 5.5C7.5 3.567 9.067 2 11 2C12.933 2 14.5 3.567 14.5 5.5ZM20 6.5C20 8.15685 18.6569 9.5 17 9.5C15.3431 9.5 14 8.15685 14 6.5C14 4.84315 15.3431 3.5 17 3.5C18.6569 3.5 20 4.84315 20 6.5Z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>

                      <p className="text-base font-semibold text-slate-100">
                        {hasActiveFilters
                          ? "No members match your filters"
                          : "No members found"}
                      </p>
                      <p className="text-sm text-slate-400">
                        {hasActiveFilters
                          ? "Try another keyword or clear filters to see all members."
                          : "Add your first member to start managing the team."}
                      </p>

                      <div className="mt-1 flex flex-wrap items-center justify-center gap-2">
                        {hasActiveFilters && (
                          <button
                            type="button"
                            onClick={clearFilters}
                            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 hover:border-[var(--pink-color)]"
                          >
                            Clear Filters
                          </button>
                        )}

                        {role === "ADMIN" && (
                          <Link
                            to={`${basePath}/add`}
                            className="inline-block rounded-lg border border-[var(--pink-color)] p-2 py-1 text-sm/tight text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white"
                          >
                            Add Member
                          </Link>
                        )}
                      </div>
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
                      {user?.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt="Avatar"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-xl font-bold text-pink-100"
                        />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-xl font-bold text-pink-100">
                          {(user?.fullname || "").slice(0, 1).toUpperCase()}
                        </div>
                      )}
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
                      {
                        user?.userPosition?.find((up) => up.isPrimary)?.position
                          ?.department?.name
                      }
                    </td>
                    <td className="px-2 py-2 text-sm text-center">
                      <div className="flex justify-center items-center gap-1">
                        {getUserRole(user) && (
                          <p
                            className={`badge ${formatRoleBadgeColor(formatUppercaseToCapitalized(getUserRole(user)))} w-22 text-center h-fit p-1 pl-2 pr-2 rounded-2xl text-sm/tight`}
                          >
                            {formatUppercaseToCapitalized(getUserRole(user))}
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
                    {role === "ADMIN" && (
                      <td className="px-2 py-2 text-sm text-center">
                        {user.isDeleted ? (
                          <p className="badge text-red-500/80 w-22 h-fit p-1 pl-2 pr-2 rounded-2xl text-sm/tight">
                            Deleted
                          </p>
                        ) : (
                          <p className="badge text-green-500/80 w-22 h-fit p-1 pl-2 pr-2 rounded-2xl text-sm/tight">
                            Not Deleted
                          </p>
                        )}
                      </td>
                    )}
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
                          <>
                            <button
                              onClick={() =>
                                handleDeleteConfigured(user.id, "hard")
                              }
                              className="rounded-md bg-red-500/20 px-2 py-1 font-semibold text-red-300 transition hover:bg-red-500/35"
                            >
                              Hard Delete
                            </button>
                            {user.isDeleted && (
                              <button
                                onClick={() => handleRestore(user.id)}
                                className="rounded-md bg-green-500/20 px-2 py-1 font-semibold text-green-300 transition hover:bg-green-500/35"
                              >
                                Restore
                              </button>
                            )}
                          </>
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
