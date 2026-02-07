import {
  getActivitiesList,
  deleteActivityById
} from '../../../store/slices/activitySlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const ActivitiesCardView = () => {
  const dispatch = useDispatch()
  const activitiesState = useSelector((state) => state.activity)

  useEffect(() => {
    dispatch(getActivitiesList())
  }, [dispatch])

  const handleDelete = (activityId) => {
    dispatch(deleteActivityById(activityId))
  }

  return (
    <div className="w-full p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {activitiesState.activities.map((activity) => (
        <div key={activity.id} className="border border-gray-200 rounded-lg p-4 flex flex-col">
          <img
            src={activity.thumbnailUrl}
            alt={activity.name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
          {/* TODO: Styling type badge */}
          <p className="text-sm text-gray-600 mb-1">{activity.type}</p>
          {/* TODO: Replace text "Date: " with an icon */}
          <p className="text-sm text-gray-600 mb-1">Date: {activity.date}</p>
          <h3 className="text-lg font-semibold mb-2">{activity.name}</h3>
          {/* TODO: Styling status badge */}
          <p className="text-sm text-gray-600 mb-1">{activity.status}</p>
          {/* TODO: Replace text "Location: " with an icon */}
          <p className="text-sm text-gray-600 mb-1">Location: {activity.location}</p>
          <p className="text-sm text-gray-600 mb-4">{activity.registrationsCount} participants</p>
          <div className="mt-auto flex space-x-2">
            {/* TODO: Replace text "View" with an icon */}
            <Link to={`/activities/${activity.id}`} className="text-blue-500 hover:underline">View</Link>
            {/* TODO: Replace text "Edit" with an icon */}
            <Link to={`/admin/activities/edit/${activity.id}`} className="text-green-500 hover:underline">Edit</Link>
            {/* TODO: Replace text "Delete" with an icon */}
            <button
              onClick={() => handleDelete(activity.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ActivitiesCardView