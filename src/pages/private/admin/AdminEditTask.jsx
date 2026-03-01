import TaskForm from "../../../components/main/internal/TaskForm"
import { useParams } from "react-router-dom"

const AdminEditTask = () => {
  const { taskId } = useParams();

  return (
    <div>
      <TaskForm mode="edit" taskId={taskId} />
    </div>
  )
}

export default AdminEditTask