import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {
  getActivityById,
  deleteActivityById
} from "../../../store/slices/activitySlice"
import { Link } from "react-router-dom"

const AdminViewActivity = ({ activityId }) => {
  const dispatch = useDispatch()
  const activity = useSelector((state) => state.activities.currentActivity)

  useEffect(() => {
    dispatch(getActivityById(activityId))
  }, [dispatch, activityId])

  return (
    <div>
      <Link to="/admin/activities">Back to Activities</Link>
      <h1>Activity Details</h1>
      <Link to={`/admin/activities/edit/${activityId}`}>Edit Activity</Link>
      <button onClick={() => dispatch(deleteActivityById(activityId))}>
        Delete Activity
      </button>
      <p>Name: {activity?.name}</p>
      <p>Description: {activity?.description}</p>
      <p>Date: {activity?.date}</p>
      <p>Time: {activity?.time}</p>
      <p>Location: {activity?.location}</p>
      <p>Club: {activity?.clubName}</p>
    </div>
  )
}

export default AdminViewActivity