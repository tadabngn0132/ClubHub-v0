import { Link } from "react-router-dom";
import {
  getAllTasksList,
  softDeleteTaskById,
  hardDeleteTaskById,
} from "../../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import { formatUppercaseToCapitalized, formatDate } from "../../../utils/formatters.js";

const AdminTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.task);
  const [selectedTasks, setSelectedTasks] = useState([]);

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

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="px-4">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Tasks</h1>
          <p className="text-sm text-gray-500">{tasks.length} tasks</p>
        </div>

        <span>
          <Link
            to="/admin/tasks/add"
            className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
          >
            Create New Task
          </Link>
        </span>
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal text-center">
            <th className="px-2 py-1">
              <input type="checkbox" name="selectAll" id="selectAll" />
            </th>
            <th className="px-2 py-1 w-1/6 text-left">Title</th>
            <th className="px-2 py-1 w-1/2 text-left">Description</th>
            <th className="px-2 py-1 w-1/8">Due Date</th>
            <th className="px-2 py-1">Check Cf</th>
            <th className="px-2 py-1">Status</th>
            <th className="px-2 py-1">Assignee Scope</th>
            <th className="px-2 py-1">Assignor</th>
            <th className="px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-gray-300 text-center">
              <td className="px-2 py-1 text-center">
                <input type="checkbox" name="task" id={`task-${task.id}`} />
              </td>
              <td className="px-2 py-1 text-left">{task.title}</td>
              <td className="px-2 py-1 text-left">{task.description}</td>
              <td className="px-2 py-1">{formatDate(task.dueDate)}</td>
              <td className="px-2 py-1">{task.isCheckCf ? "Yes" : "No"}</td>
              <td className="px-2 py-1">{formatUppercaseToCapitalized(task.status)}</td>
              <td className="px-2 py-1">{formatUppercaseToCapitalized(task.assigneeScope)}</td>
              <td className="px-2 py-1">{task.assignedBy?.fullname || "N/A"}</td>
              <td className="px-2 py-1 w-24">
                <div className="flex justify-center items-center gap-1 text-xs bg-white p-2 rounded-md shadow-md">
                  <Link
                    to={`/admin/tasks/view/${task.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    to={`/admin/tasks/edit/${task.id}`}
                    className="text-green-500 hover:underline"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
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

export default AdminTasks;
