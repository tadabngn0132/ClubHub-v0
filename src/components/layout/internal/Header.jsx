import { Link } from "react-router-dom"
import FontAwesomeIcon from "@fortawesome/react-fontawesome"
import { faBell, faInbox, faInfoCircle } from "@fortawesome/free-solid-svg-icons"

const Header = () => {
  return (
    <div>
      {/* Logo */}
      <Link className="hover:opacity-75" to="/">
        <img className="w-15.5 sm:w-17.5 md:w-22 lg:w-24.5" src="src/assets/logos/GDC_logo.svg" alt="GDC Logo" />
      </Link>

      {/* Global search bar - Hiện tại chưa triển khai */}

      {/* Notifications, messages, user menu dropdown */}
      <div>
        {/* Notification icon */}
        <FontAwesomeIcon icon={faBell} />
        {/* Messages icon */}
        <FontAwesomeIcon icon={faInbox} />
        {/* Help icon */}
        <FontAwesomeIcon icon={faInfoCircle} />

        {/* User menu dropdown - Hiện tại chưa triển khai */}
        <select name="user-menu" id="user-menu">
          <option value="profile">Profile</option>
          <option value="settings">Settings</option>
          <option value="logout">Logout</option>
        </select>
      </div>

    </div>
  )
}

export default Header