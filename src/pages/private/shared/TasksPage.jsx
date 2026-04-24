import { Link } from "react-router-dom";
import {
  getAllTasksList,
  softDeleteTaskById,
  hardDeleteTaskById,
  resetTaskStatus,
} from "../../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { use, useEffect, useMemo, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import {
  formatUppercaseToCapitalized,
  formatDate,
} from "../../../utils/formatters.js";
import { TASK_STATUS_OPTIONS } from "../../../utils/constants";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";
import Pagination from "../../../components/internal/Pagination.jsx";

const TasksPage = ({ role, basePath }) => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.task);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate_desc");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [deleteMode, setDeleteMode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;
  
  useEffect(() => {
    dispatch(getAllTasksList());
  }, [dispatch]);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetTaskStatus());
    }
  }, [error]);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(tasks.length / tasksPerPage));
  const clampedCurrentPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage !== clampedCurrentPage) {
      setCurrentPage(clampedCurrentPage);
    }
  }, [currentPage, clampedCurrentPage]);

  const startIndex = (clampedCurrentPage - 1) * tasksPerPage;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + tasksPerPage);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (taskId, mode) => {
    setSelectedTaskId(taskId);
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = (selectedTaskId) => {
    if (deleteMode === "soft") {
      dispatch(softDeleteTaskById(selectedTaskId));
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteTaskById(selectedTaskId));
      handleCloseConfirmationModal();
    }
  };

  const filteredTasks = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = [...(tasks || [])];

    if (keyword) {
      result = result.filter((task) =>
        [
          task.title,
          task.description,
          task.status,
          task.assigneeScope,
          task.assignedBy?.fullname,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (task) => String(task.status || "").toUpperCase() === statusFilter,
      );
    }

    result.sort((a, b) => {
      if (sortBy === "title_asc") {
        return String(a.title || "").localeCompare(String(b.title || ""));
      }
      if (sortBy === "title_desc") {
        return String(b.title || "").localeCompare(String(a.title || ""));
      }
      if (sortBy === "dueDate_asc") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return new Date(b.dueDate) - new Date(a.dueDate);
    });

    return result;
  }, [tasks, searchTerm, statusFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("dueDate_desc");
  };

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    statusFilter !== "all" ||
    sortBy !== "dueDate_desc";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="flex w-full flex-col gap-6">
        <section>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Tasks
              </h1>
              <p className="mt-1 text-slate-300">
                {filteredTasks.length} tasks
              </p>
            </div>

            {role !== "MEMBER" && (
              <Link
                to={`${basePath}/add`}
                className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
              >
                Create New Task
              </Link>
            )}
          </div>
        </section>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search title, description, assignor..."
            className="md:col-span-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="all">All Statuses</option>
            {TASK_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {formatUppercaseToCapitalized(status)}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="dueDate_desc">Due Date: Newest</option>
            <option value="dueDate_asc">Due Date: Oldest</option>
            <option value="title_asc">Title: A-Z</option>
            <option value="title_desc">Title: Z-A</option>
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
            <table className="w-full border-collapse text-sm">
              <thead className="bg-slate-800/95 text-slate-200 backdrop-blur">
                <tr className="border-b border-slate-700 text-left">
                  <th className="px-3 py-3 text-center">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      className="h-4 w-4 rounded border-slate-500 bg-slate-700"
                    />
                  </th>
                  <th className="px-3 py-3">Title</th>
                  <th className="px-3 py-3">Description</th>
                  <th className="px-3 py-3">Due Date</th>
                  <th className="px-3 py-3 text-center">Check Cf</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Assignee Scope</th>
                  <th className="px-3 py-3">Assignor</th>
                  <th className="px-3 py-3 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-10 text-center text-slate-300"
                    >
                      <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/30 bg-violet-500/10 text-violet-200">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            className="h-8 w-8"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                          >
                            <path
                              d="M8 7H16M8 11H13M6 3H18C19.1046 3 20 3.89543 20 5V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3Z"
                              stroke="currentColor"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>

                        <p className="text-base font-semibold text-slate-100">
                          {hasActiveFilters
                            ? "No tasks match your filters"
                            : "No tasks found"}
                        </p>
                        <p className="text-sm text-slate-400">
                          {hasActiveFilters
                            ? "Adjust your filters or clear them to view all tasks."
                            : "Create a new task to organize work for your team."}
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

                          {role !== "MEMBER" && (
                            <Link
                              to={`${basePath}/add`}
                              className="inline-block rounded-lg border border-[var(--pink-color)] p-2 py-1 text-sm/tight text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white"
                            >
                              Create New Task
                            </Link>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedTasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-t border-slate-800 odd:bg-slate-900/30 even:bg-slate-800/20 hover:bg-slate-800/50"
                    >
                      <td className="px-3 py-3 text-center">
                        <input
                          type="checkbox"
                          name="task"
                          id={`task-${task.id}`}
                          className="h-4 w-4 rounded border-slate-500 bg-slate-700"
                        />
                      </td>
                      <td
                        className="max-w-[180px] truncate px-3 py-3 font-medium text-slate-100"
                        title={task.title}
                      >
                        {task.title}
                      </td>
                      <td
                        className="max-w-[260px] truncate px-3 py-3 text-slate-300"
                        title={task.description}
                      >
                        {task.description}
                      </td>
                      <td className="px-3 py-3 text-slate-300">
                        {formatDate(task.dueDate)}
                      </td>
                      <td className="px-3 py-3 text-center text-slate-300">
                        {task.isCheckCf ? "Yes" : "No"}
                      </td>
                      <td className={`px-3 py-3 text-slate-300`}>
                        {formatUppercaseToCapitalized(task.status)}
                      </td>
                      <td className="px-3 py-3 text-slate-300">
                        {formatUppercaseToCapitalized(task.assigneeScope)}
                      </td>
                      <td className="px-3 py-3 text-slate-300">
                        {task.assignedBy?.fullname || "Unassigned"}
                      </td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-2 text-xs">
                          <Link
                            to={`${basePath}/view/${task.id}`}
                            className="rounded-md bg-sky-500/20 px-2 py-1 font-semibold text-sky-300 transition hover:bg-sky-500/35"
                          >
                            View
                          </Link>
                          {role !== "MEMBER" && (
                            <>
                              <Link
                                to={`${basePath}/edit/${task.id}`}
                                className="rounded-md bg-emerald-500/20 px-2 py-1 font-semibold text-emerald-300 transition hover:bg-emerald-500/35"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={() => handleDeleteConfigured(task.id, "soft")}
                                className="rounded-md bg-rose-500/20 px-2 py-1 font-semibold text-rose-300 transition hover:bg-rose-500/35"
                              >
                                Soft Delete
                              </button>
                            </>
                          )}

                          {role === "ADMIN" && (
                            <button
                              onClick={() => handleDeleteConfigured(task.id, "hard")}
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

            {filteredTasks.length > 0 && (
              <Pagination currentPage={clampedCurrentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            )}
          </div>
        </div>

        <ConfirmationModal
          open={isConfirmationModalOpen}
          title="Confirm Deletion"
          message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this task?`}
          variant={deleteMode === "soft" ? "warning" : "danger"}
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onCancel={handleCloseConfirmationModal}
          onConfirm={() => handleDelete(selectedTaskId)}
        />
      </div>
    </div>
  );
};

export default TasksPage;
