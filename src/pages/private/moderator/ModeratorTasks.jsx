import { Link } from "react-router-dom";
import {
  getAllTasksList,
  softDeleteTaskById,
  hardDeleteTaskById,
} from "../../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters.js";
import { TASK_STATUS_OPTIONS } from "../../../utils/constants";

const ModeratorTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.task);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate_desc");

  useEffect(() => {
    dispatch(getAllTasksList());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    const softConfirmed = window.confirm(
      "Do you want to deactivate this task?",
    );

    if (softConfirmed) {
      dispatch(softDeleteTaskById(taskId));
      return;
    }

    const hardConfirmed = window.confirm(
      "Do you want to permanently delete this task? This action cannot be undone.",
    );

    if (hardConfirmed) {
      dispatch(hardDeleteTaskById(taskId));
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
              <p className="mt-1 text-slate-300">{filteredTasks.length} tasks</p>
            </div>

            <Link
              to="/moderator/tasks/add"
              className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
            >
              Create New Task
            </Link>
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
                  <th className="px-3 py-3 text-center">Is Check Cf</th>
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
                      No tasks found.
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
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
                            to={`/moderator/tasks/view/${task.id}`}
                            className="rounded-md bg-sky-500/20 px-2 py-1 font-semibold text-sky-300 transition hover:bg-sky-500/35"
                          >
                            View
                          </Link>
                          <Link
                            to={`/moderator/tasks/edit/${task.id}`}
                            className="rounded-md bg-emerald-500/20 px-2 py-1 font-semibold text-emerald-300 transition hover:bg-emerald-500/35"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="rounded-md bg-rose-500/20 px-2 py-1 font-semibold text-rose-300 transition hover:bg-rose-500/35"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorTasks;
