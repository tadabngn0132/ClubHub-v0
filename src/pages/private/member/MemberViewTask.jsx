import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getTaskDetails,
  deleteTaskById
} from "../../../store/slices/taskSlice"
import { Link } from "react-router-dom"

const MemberViewTask = ({ taskId }) => {
  const dispatch = useDispatch()
  const task = useSelector((state) => state.tasks.currentTask)

  useEffect(() => {
    dispatch(getTaskDetails(taskId))
  }, [dispatch, taskId])

  return (
    <div>
      <Link to="/member/tasks">Back to Tasks</Link>
      <div className="flex items-center justify-between">
        <h1>{task?.title}</h1>
        
        <Link to={`/member/tasks/edit/${taskId}`}>Edit Task</Link>
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

export default MemberViewTask