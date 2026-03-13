import { Link } from "react-router-dom";
import {
  getAllTasksList,
  softDeleteTaskById,
  hardDeleteTaskById
} from "../../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";

const AdminTasks = () => {
  const dispatch = useDispatch();
  const {
    tasks,
    isLoading,
    error
  } = useSelector((state) => state.task);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    dispatch(getAllTasksList());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    const softConfirmed = window.confirm(
      "Do you want to deactivate this task?"
    );

    if (softConfirmed) {
      dispatch(softDeleteTaskById(taskId));
      return;
    }

    const hardConfirmed = window.confirm(
      "Do you want to permanently delete this task? This action cannot be undone."
    );

    if (hardConfirmed) {
      dispatch(hardDeleteTaskById(taskId));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4">
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
          <tr>
            <th>
              <input type="checkbox" name="selectAll" id="selectAll" />
            </th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-gray-300">
              <td className="text-center">
                <input type="checkbox" name="task" id={`task-${task.id}`} />
              </td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td className="text-center">
                <Link to={`/admin/tasks/view/${task.id}`} className="text-blue-500 hover:underline mr-2">
                  View
                </Link>
                <Link to={`/admin/tasks/edit/${task.id}`} className="text-green-500 hover:underline mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTasks;
