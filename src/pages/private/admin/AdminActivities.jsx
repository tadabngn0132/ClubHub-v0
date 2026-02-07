import { getActivitiesList } from '../../../store/slices/activitySlice'
import { act, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ActivitiesCardView from '../../../components/main/internal/ActivitiesCardView'
import ActivitiesTableView from '../../../components/main/internal/ActivitiesTableView'

const AdminActivities = () => {
  const dispatch = useDispatch()
  const activitiesState = useSelector((state) => state.activity)
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Table View", component: ActivitiesTableView},
    { name: "Card View", component: ActivitiesCardView }
  ]

  useEffect(() => {
    dispatch(getActivitiesList())
  }, [dispatch])

  return (
    <div>
      <div className="flex items-center-safe justify-between mb-6">
        <h1 className="text-2xl font-bold">Activities</h1>
        <p className="text-gray-600">{activitiesState.activities.length} activities</p>
      </div>

      <span className="mb-4 inline-block">
        <Link to="/admin/activities/create">Create New Activity</Link>
      </span>

      <div className="flex border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            type='button'
          >
            { tab.name }
          </button>
        ))}
      </div>

      <div>
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={{ display: activeTab === index ? "flex" : "none"}}
          >
            <tab.component />
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminActivities