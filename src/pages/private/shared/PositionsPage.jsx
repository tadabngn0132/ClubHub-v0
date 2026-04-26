import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import {
  getPositionsList,
  softDeletePositionById,
  hardDeletePositionById,
  resetPositionStatus,
  resetPositionError,
} from "../../../store/slices/positionSlice";
import toast from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { Link, useNavigate } from "react-router-dom";
import {
  formatRoleBadgeColor,
  formatUppercaseToCapitalized,
  formatPositionLevel,
} from "../../../utils/formatters";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal";

const PositionsPage = ({ role, basePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { positions, isLoading, error, positionStatus } = useSelector(
    (state) => state.position,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [sortBy, setSortBy] = useState("title_asc");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedPositionId, setSelectedPositionId] = useState(null);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getPositionsList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching positions.",
      );
      dispatch(resetPositionError());
    }
  }, [error]);

  useEffect(() => {
    if (positionStatus === "fulfilled") {
      navigate(basePath);
    }
    dispatch(resetPositionStatus());
  }, [positionStatus]);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (positionId, mode) => {
    setSelectedPositionId(positionId);
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = (selectedPositionId) => {
    if (deleteMode === "soft") {
      dispatch(softDeletePositionById(selectedPositionId));
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      dispatch(hardDeletePositionById(selectedPositionId));
      handleCloseConfirmationModal();
    }
  };

  const filteredPositions = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = [...(positions || [])];

    if (keyword) {
      result = result.filter((position) =>
        [position.title, position.level, position.systemRole]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (roleFilter !== "all") {
      result = result.filter(
        (position) =>
          String(position.systemRole || "").toUpperCase() === roleFilter,
      );
    }

    result.sort((a, b) => {
      if (sortBy === "title_desc") {
        return String(b.title || "").localeCompare(String(a.title || ""));
      }
      if (sortBy === "level_asc") {
        return Number(a.level || 0) - Number(b.level || 0);
      }
      if (sortBy === "level_desc") {
        return Number(b.level || 0) - Number(a.level || 0);
      }
      return String(a.title || "").localeCompare(String(b.title || ""));
    });

    return result;
  }, [positions, searchTerm, roleFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setSortBy("title_asc");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            Positions
          </h1>
          <p className="mt-1 text-slate-300">
            {filteredPositions.length} positions
          </p>
        </div>

        {role === "ADMIN" && (
          <span>
            <Link
              to={`${basePath}/add`}
              className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
            >
              Add New Position
            </Link>
          </span>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/65">
        <div className="grid gap-3 p-3 md:grid-cols-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search title, level, role"
            className="md:col-span-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          />
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="title_asc">Title: A-Z</option>
            <option value="title_desc">Title: Z-A</option>
            <option value="level_asc">Level: Low-High</option>
            <option value="level_desc">Level: High-Low</option>
          </select>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 hover:border-[var(--pink-color)]"
          >
            Clear Filters
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <thead className="bg-slate-800/95 text-slate-200 backdrop-blur">
              <tr className="border-b border-slate-700 text-left">
                <th className="px-3 py-3">Title</th>
                <th className="px-3 py-3">Level</th>
                <th className="px-3 py-3 text-center">System Role</th>
                <th className="px-3 py-3">Department</th>
                <th className="px-3 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPositions.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-10 text-center text-slate-300"
                  >
                    No positions found.
                  </td>
                </tr>
              ) : (
                filteredPositions.map((position) => (
                  <tr
                    key={position.id}
                    className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20 hover:bg-slate-800/50"
                  >
                    <td className="px-3 py-3 font-medium text-slate-100">
                      {position.title}
                    </td>
                    <td className="px-3 py-3 text-slate-300">
                      {formatPositionLevel(position.level)}
                    </td>
                    <td className="px-3 py-3 text-center">
                      <div
                        className={`badge ${formatRoleBadgeColor(formatUppercaseToCapitalized(position.systemRole))} inline-flex h-fit items-center justify-center rounded-2xl p-1 px-2 text-sm/tight`}
                      >
                        {formatUppercaseToCapitalized(position.systemRole)}
                      </div>
                    </td>
                    <td className="px-3 py-3 text-slate-300">
                      {position.department?.name || "N/A"}
                    </td>
                    <td className="w-24 px-3 py-3 text-center">
                      <div className="flex items-center justify-center gap-1 text-xs">
                        <Link
                          to={`${basePath}/view/${position.id}`}
                          className="rounded-md bg-emerald-500/20 px-3 py-1 font-semibold text-sky-300 transition hover:bg-sky-500/35"
                        >
                          View
                        </Link>

                        {role === "ADMIN" && (
                          <>
                            <Link
                              to={`${basePath}/edit/${position.id}`}
                              className="rounded-md bg-emerald-500/20 px-3 py-1 font-semibold text-emerald-300 transition hover:bg-emerald-500/35"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() =>
                                handleDeleteConfigured(position.id, "soft")
                              }
                              className="rounded-md bg-rose-500/20 px-3 py-1 font-semibold text-rose-300 transition hover:bg-rose-500/35"
                            >
                              Soft Delete
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteConfigured(position.id, "hard")
                              }
                              className="rounded-md bg-rose-600/30 px-3 py-1 font-semibold text-rose-400 transition hover:bg-rose-600/50"
                            >
                              Hard Delete
                            </button>
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

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this position?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete(selectedPositionId)}
      />
    </div>
  );
};

export default PositionsPage;
