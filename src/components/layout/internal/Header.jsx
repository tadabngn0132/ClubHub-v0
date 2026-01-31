import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBell, faInbox, faInfoCircle, faBars } from "@fortawesome/free-solid-svg-icons"
import logo from "../../../assets/logos/GDC_logo.svg"
import Dropdown from "./Dropdown"
import { useState } from "react"

const Header = ({ role }) => {
  const setBadgeColor = (role) => {
    switch (role) {
      case "Admin":
        return "bg-red-500"
      case "Moderator":
        return "bg-blue-500"
      case "Member":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible)
  }

  return (
    <div className="flex items-center justify-between p-4 pt-3 pb-3 shadow-md fixed top-0 left-0 w-full z-1000 bg-black">
      <div className="flex items-center space-x-4">
        <FontAwesomeIcon icon={faBars} size="lg" />
        {/* Logo */}
        <div className="flex items-start-safe">
          <Link className="hover:opacity-75" to="/">
            <img className="w-15.5 sm:w-17.5 md:w-22 lg:w-24.5" src={logo} alt="GDC Logo" />
          </Link>
          <div className={`flex badge ${setBadgeColor(role)} h-fit items-center-safe justify-center-safe p-1 pl-2 pr-2 rounded-2xl text-sm/tight`}>{ role }</div>
        </div>
      </div>

      {/* Global search bar - Hiện tại chưa triển khai */}

      {/* Notifications, messages, user menu dropdown */}
      <div className="flex items-center space-x-4">
        {/* Notification icon */}
        <FontAwesomeIcon icon={faBell} />
        {/* Messages icon */}
        <FontAwesomeIcon icon={faInbox} />
        {/* Help icon */}
        <FontAwesomeIcon icon={faInfoCircle} />

        {/* User menu dropdown - Hiện tại chưa triển khai */}
        <div onClick={toggleDropdown}>Avatar</div>
        <Dropdown visible={isDropdownVisible} />
      </div>
    </div>
  )
}

export default Header