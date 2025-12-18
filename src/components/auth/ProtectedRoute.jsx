import { useNavigate } from 'react-router-dom'

const ProtectedRoute = () => {
  let navigate = useNavigate()

  if (!localStorage.getItem('token')) {
    navigate('/login')
  }

  const role = localStorage.getItem('role')

  if (role !== 'admin' && role !== 'moderator' && role !== 'moderator') {
    navigate('/login')
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