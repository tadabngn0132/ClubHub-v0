import { Link } from "react-router-dom";
import {
  getAllTasksList,
  deleteTaskById,
} from "../../../store/slices/taskSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

const AdminTasks = () => {
  const dispatch = useDispatch();
  const { tasks, isLoading, isError, message } = useSelector((state) => state.task);
  const [selectedTasks, setSelectedTasks] = useState([]);

  useEffect(() => {
    dispatch(getAllTasksList());
  }, [dispatch]);

  const handleDelete = (taskId) => {
    dispatch(deleteTaskById(taskId));
  };

  return (
    <div>
      <h1>Tasks</h1>
      <p>{tasks.length} tasks</p>
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" name="selectAll" id="selectAll" /></th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <input type="checkbox" name="task" id={`task-${task.id}`} />
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.status}</td>
              <td>
                <Link to={`/admin/tasks/${task.id}`}>View</Link>
                <Link to={`/admin/tasks/${task.id}`}>Edit</Link>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTasks