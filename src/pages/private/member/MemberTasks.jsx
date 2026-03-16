import { Link } from "react-router-dom";
import {
  getUserTasks,
} from "../../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";

const MemberTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, error } = useSelector((state) => state.task);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    dispatch(getUserTasks());
  }, [dispatch]);

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
            <th>Is Check Cf</th>
            <th>Status</th>
            <th>Assignee Scope</th>
            <th>Assignor</th>
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
              <td>{task.isCheckCf ? "Yes" : "No"}</td>
              <td>{task.status}</td>
              <td>{task.assigneeScope}</td>
              <td>{task.assignorId}</td>
              <td className="text-center">
                <Link
                  to={`/member/tasks/view/${task.id}`}
                  className="text-blue-500 hover:underline mr-2"
                >
                  View
                </Link>
                <Link
                  to={`/member/tasks/edit/${task.id}`}
                  className="text-green-500 hover:underline mr-2"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberTasks;
