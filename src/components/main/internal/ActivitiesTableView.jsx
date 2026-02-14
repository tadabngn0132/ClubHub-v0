import {
  getActivitiesList,
  deleteActivityById
} from '../../../store/slices/activitySlice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sampleActivityData } from '../../../data/sampleActivityData'
import ActivitiesBulkActionBar from './ActivitiesBulkActionBar'

const ActivitiesTableView = () => {
  const dispatch = useDispatch()
  const activitiesState = useSelector((state) => state.activity)
  const [selectedActivities, setSelectedActivities] = useState([])

  useEffect(() => {
    dispatch(getActivitiesList())
  }, [dispatch])

  const handleDelete = (activityId) => {
    dispatch(deleteActivityById(activityId))
  }

  return (
    <>
      {selectedActivities.length > 2 && (
        <ActivitiesBulkActionBar eventCount={selectedActivities.length} />
      )}

      <div className="w-full overflow-auto">
        <table className="min-w-full border-collapse border border-gray-200 mb-10">
          <thead className="">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-2"><input type="checkbox" name="" id="" /></th>
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
            {sampleActivityData.map((activity) => (
              <tr key={activity.id}>
                <td className="px-4 py-2">
                  <input 
                    type="checkbox"
                    name=""
                    id=""
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedActivities([...selectedActivities, activity.id])
                      } else {
                        setSelectedActivities(
                          selectedActivities.filter(id => id !== activity.id)
                        )
                      }
                    }}
                  />
                </td>
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
                  <Link to={`/activities/${activity.id}`} className="text-blue-500 hover:underline">View</Link>
                  <Link to={`/admin/activities/edit/${activity.id}`} className="text-green-500 hover:underline">Edit</Link>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ActivitiesTableView