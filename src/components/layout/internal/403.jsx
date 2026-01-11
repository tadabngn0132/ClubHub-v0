import { Link } from 'react-router-dom'

const Forbidden = ({ role }) => {
  const navLink = (role) => {
    switch (role) {
      case 'admin':
        return '/admin/dashboard'
      case 'moderator':
        return '/moderator/dashboard'
      case 'member':
        return '/member/dashboard'
      default:
        return '/'
    }
  }
  return (
    <div>
      <h1>403 Forbidden</h1>
      <p>You do not have permission to access this resource.</p>
      <Link to={navLink(role)}>Go back to Dashboard</Link>
    </div>
  )
}

export default Forbidden