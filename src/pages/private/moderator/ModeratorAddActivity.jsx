import ActivityForm from "../../../components/main/internal/ActivityForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { resetStatus } from "../../../store/slices/activitySlice"

const ModeratorAddActivity = () => {
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.activity)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'fulfilled') {
      navigate('/moderator/activities')
    }
    dispatch(resetStatus())
  }, [status, navigate, dispatch])

  return (
    <div>
      <ActivityForm mode="add" />
    </div>
  )
}

export default ModeratorAddActivity