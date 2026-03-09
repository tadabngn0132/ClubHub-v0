import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getTaskDetails,
  deleteTaskById
} from "../../../store/slices/taskSlice"
import { Link } from "react-router-dom"

const AdminViewTask = ({ taskId }) => {
  const dispatch = useDispatch()
  const task = useSelector((state) => state.tasks.currentTask)

  useEffect(() => {
    dispatch(getTaskDetails(taskId))
  }, [dispatch, taskId])

  return (
    <div>
      <Link to="/admin/tasks">Back to Tasks</Link>
      <h1>Task Details</h1>
      <Link to={`/admin/tasks/edit/${taskId}`}>Edit Task</Link>
      <button onClick={() => dispatch(deleteTaskById(taskId))}>
        Delete Task
      </button>
      <p>Name: {task?.name}</p>
      <p>Description: {task?.description}</p>
      <p>Due Date: {task?.dueDate}</p>
      <p>Assigned To: {task?.assignedTo}</p>
    </div>
  )
}

export default AdminViewTask