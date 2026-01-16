import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { token, currentUser } = useSelector((state) => state.auth)
  const role = currentUser?.role

  useEffect(() => {
    if (!token || token === null) {
      navigate('/sign-in')
    }

    if (role !== 'admin' && role !== 'moderator' && role !== 'member') {
      navigate('/sign-in')
    }
  }, [token, role, navigate])



  if (role === 'admin' || role === 'moderator' || role === 'member') {
    return (
      <>
        { children }
      </>
    )
  }
}

export default ProtectedRoute