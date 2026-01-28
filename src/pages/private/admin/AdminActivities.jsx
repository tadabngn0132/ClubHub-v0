import {
  getActivitiesList,
  deleteActivityById
} from '../../../store/slices/activitySlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const AdminActivities = () => {
  const dispatch = useDispatch()
  const activitiesState = useSelector((state) => state.activity)

  useEffect(() => {
    dispatch(getActivitiesList())
  }, [dispatch])

  const handleDelete = (activityId) => {
    dispatch(deleteActivityById(activityId))
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center-safe justify-between mb-6">
        <h1 className="text-2xl font-bold">Activities</h1>
        <p className="text-gray-600">{activitiesState.activities.length} activities</p>
      </div>

      <span className="mb-4 inline-block">
        <Link to="/admin/activities/create">Create New Activity</Link>
      </span>

      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="">
          <tr className="border-b border-gray-200">
            <th className="px-4 py-2">Activity ID</th>
            <th className="px-4 py-2">Activity Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activitiesState.activities.map((activity) => (
            <tr key={activity.id}>
              <td className="px-4 py-2">{activity.id}</td>
              <td className="px-4 py-2">{activity.name}</td>
              <td className="px-4 py-2">{activity.date}</td>
              <td className="px-4 py-2">{activity.status}</td>
              <td className="px-4 py-2">
                <Link to={`/admin/activities/view/${activity.id}`}>View</Link>
                <Link to={`/admin/activities/edit/${activity.id}`}>Edit</Link>
                <button onClick={() => handleDelete(activity.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminActivities