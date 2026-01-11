import { Link } from "react-router-dom"

const NotFound = ({ role }) => {
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
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to={navLink(role)}>Go back to Dashboard</Link>
    </div>
  )
}

export default NotFound