import {
  getActivitiesList,
  deleteActivityById
} from '../../../store/slices/activitySlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ActivitiesTableView = () => {
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
      <table className="min-w-full border-collapse border border-gray-200">
        <thead className="">
          <tr className="border-b border-gray-200">
            <th><input type="checkbox" name="" id="" /></th>
            <th className="px-4 py-2">Activity ID</th>
            <th className="px-4 py-2">Thumbnail</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Location</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Registrations</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activitiesState.activities.map((activity) => (
            <tr key={activity.id}>
              <td className="px-4 py-2"><input type="checkbox" name="" id="" /></td>
              <td className="px-4 py-2">{activity.id}</td>
              <td className="px-4 py-2">
                <img
                  src={activity.thumbnailUrl}
                  alt={activity.name}
                  className="w-16 h-16 object-cover"
                />
              </td>
              <td className="px-4 py-2">{activity.name}</td>
              <td className="px-4 py-2">{activity.type}</td>
              <td className="px-4 py-2">{activity.date}</td>
              <td className="px-4 py-2">{activity.location}</td>
              <td className="px-4 py-2">{activity.status}</td>
              <td className="px-4 py-2">{activity.registrationsCount}</td>
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

export default ActivitiesTableView