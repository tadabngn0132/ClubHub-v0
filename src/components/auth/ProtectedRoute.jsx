import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = () => {
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  if (!token || token === null) {
    navigate('/sign-in')
  }

  const role = localStorage.getItem('role')

  if (role !== 'admin' && role !== 'moderator' && role !== 'member') {
    navigate('/sign-in')
  }

  if (role === 'admin') {
    navigate('/admin/dashboard')
  }

  if (role === 'moderator') {
    navigate('moderator/dashboard')
  }

  if (role === 'member') {
    navigate('member/dashboard')
  }
}

export default ProtectedRoute