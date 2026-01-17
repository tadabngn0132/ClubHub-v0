import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logoutUser } from "../../../store/slices/authSlice"

const Dropdown = ({ visible }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logout = () => {
    const resData = dispatch(logoutUser()).unwrap()

    if (resData.success) {
      console.log(resData.message)
      navigate('/sign-in')
    }
  }
  const visibilityClass = visible ? "flex" : "hidden"
  return (
    <div className={`flex flex-col border rounded-md shadow-lg p-2 ${visibilityClass} absolute top-12 right-4`}>
      <Link to="/profile">Profile</Link>
      <Link to="/settings">Settings</Link>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dropdown