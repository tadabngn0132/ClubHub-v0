import { Link } from "react-router-dom"

const Dropdown = ({ visible }) => {
  const visibilityClass = visible ? "flex" : "hidden"
  return (
    <div className={`flex flex-col border rounded-md shadow-lg p-2 ${visibilityClass} absolute top-12 right-4`}>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
      <Link to="/logout">Logout</Link>
    </div>
  )
}

export default Dropdown