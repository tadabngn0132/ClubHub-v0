import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getTaskDetails,
  deleteTaskById
} from "../../../store/slices/taskSlice"
import { Link } from "react-router-dom"
import Loading from "../../../components/layout/internal/Loading.jsx"

const AdminViewTask = ({ taskId }) => {
  const dispatch = useDispatch()
  const { task, isLoading, error } = useSelector((state) => state.task)

  useEffect(() => {
    dispatch(getTaskDetails(taskId))
  }, [dispatch, taskId])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    toast.error(error)
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Link to="/admin/tasks">Back to Tasks</Link>
      <div className="flex items-center justify-between">
        <h1>{task?.title}</h1>
        
        <div>
          <Link to={`/admin/tasks/edit/${taskId}`}>Edit Task</Link>
          <button onClick={() => dispatch(deleteTaskById(taskId))}>
            Delete Task
          </button>
        </div>
      </div>

      <div>
        <p>Created At: {task?.createdAt}</p>
        <p>Updated At: {task?.updatedAt}</p>
      </div>

      <p>Description: {task?.description}</p>
      <p>Due Date: {task?.dueDate}</p>
      {/* <p>Assigned To: {task?.assignedTo}</p> */}
      {task?.isCompleted ? (
        <p>Status: Completed</p>
      ) : (
        <p>Status: Incomplete</p>
      )}
    </div>
  )
}

export default AdminViewTask