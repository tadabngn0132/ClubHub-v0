import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { token, currentUser } = useSelector((state) => state.auth)

  if (!token || token === null) {
    navigate('/sign-in')
  }

  const role = currentUser?.role

  if (role !== 'admin' && role !== 'moderator' && role !== 'member') {
    navigate('/sign-in')
  }

  if (role === 'admin' || role === 'moderator' || role === 'member') {
    return (
      <>
        { children }
      </>
    )
  }
}

export default ProtectedRoute