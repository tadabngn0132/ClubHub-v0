import { getActivitiesList } from '../../../store/slices/activitySlice'
import { act, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ActivitiesCardView from '../../../components/main/internal/ActivitiesCardView'
import ActivitiesTableView from '../../../components/main/internal/ActivitiesTableView'
import { sampleActivityData } from '../../../data/sampleActivityData'
import ActivitiesBulkActionBar from '../../../components/main/internal/ActivitiesBulkActionBar'

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
    <div className="px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="">
          <h1 className="text-3xl font-bold mb-1">Activities</h1>
          <p className="text-sm text-gray-500">{sampleActivityData.length} activities</p>
        </div>

        <span>
          <Link
            to="/admin/activities/add"
            className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
          >
            Create New Activity
          </Link>
        </span>
      </div>

      <select name="sort" id="sort">
        <option value="newest">Date (Newest)</option>
        <option value="oldest">Date (Oldest)</option>
        <option value="a-z">Name (A-Z)</option>
        <option value="z-a">Name (Z-A)</option>
        <option value="registration-desc">Registration (Maximum)</option>
        <option value="registration-asc">Registration (Minimum)</option>
      </select>

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
            onClick={() => setActiveTab(index)}
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