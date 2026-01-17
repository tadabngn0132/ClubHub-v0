import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getCurrentUser, getToken } from '../../utils/helper'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const { token, currentUser } = useSelector((state) => state.auth)
  const accessToken = token || getToken()
  const currentUserInfo = currentUser || getCurrentUser()
  const role = currentUserInfo?.role

  useEffect(() => {
    if (!accessToken || accessToken === null) {
      navigate('/sign-in')
    }

    if (role !== 'admin' && role !== 'moderator' && role !== 'member') {
      navigate('/sign-in')
    }
  }, [accessToken, role, navigate])



  if (role === 'admin' || role === 'moderator' || role === 'member') {
    return (
      <>
        { children }
      </>
    )
  }
}

export default ProtectedRoute