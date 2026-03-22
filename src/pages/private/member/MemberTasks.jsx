import { Link } from "react-router-dom";
import {
  getAllTasksList,
} from "../../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters.js";

const MemberTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getAllTasksList());
  }, [dispatch]);

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
              <p className="mt-1 text-slate-300">{tasks.length} tasks</p>
            </div>
          </div>
        </section>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

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
                {tasks.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-10 text-center text-slate-300"
                    >
                      No tasks found.
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
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
                            to={`/member/tasks/view/${task.id}`}
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
      </div>
    </div>
  );
};

export default MemberTasks;
