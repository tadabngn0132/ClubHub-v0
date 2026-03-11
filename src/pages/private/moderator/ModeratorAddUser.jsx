import UserForm from "../../../components/main/internal/UserForm.jsx";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { resetStatus } from "../../../store/slices/userSlice"

const ModeratorAddUser = () => {
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
    <UserForm mode="add" />
  )
}

export default ModeratorAddUser