import UserForm from "../../../components/main/internal/UserForm.jsx"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { resetStatus } from "../../../store/slices/userSlice"

const ModeratorEditUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch()
  const { status } = useSelector((state) => state.user)
  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'fulfilled') {
      navigate('/moderator/users')
    }
    dispatch(resetStatus())
  }, [status, navigate, dispatch])

  return (
    <div>
      <UserForm mode="edit" userId={userId} />
    </div>
  )
}

export default ModeratorEditUser