import TaskForm from "../../../components/main/internal/TaskForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { resetStatus } from "../../../store/slices/taskSlice"

const ModeratorAddTask = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.task)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'fulfilled') {
      navigate('/moderator/tasks')
    }
    dispatch(resetStatus())
  }, [status, navigate, dispatch])

  return (
    <div>
      <TaskForm mode="add" />
    </div>
  )
}

export default ModeratorAddTask