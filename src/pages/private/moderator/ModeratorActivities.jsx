import { getActivitiesList } from "../../../store/slices/activitySlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ActivitiesCardView from "../../../components/main/internal/ActivitiesCardView";
import ActivitiesTableView from "../../../components/main/internal/ActivitiesTableView";
import { sampleActivityData } from "../../../data/sampleActivityData";
import ActivitiesBulkActionBar from "../../../components/main/internal/ActivitiesBulkActionBar";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import ActivitiesCalendarView from "../../../components/main/internal/ActivitiesCalendarView.jsx";

const ModeratorActivities = () => {
  const dispatch = useDispatch();
  const { activities, isLoading, error } = useSelector(
    (state) => state.activity,
  );
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { name: "Table View", component: ActivitiesTableView },
    { name: "Card View", component: ActivitiesCardView },
    { name: "Calendar View", component: ActivitiesCalendarView },
  ];

  useEffect(() => {
    dispatch(getActivitiesList());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="px-4 w-full">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="">
          <h1 className="text-3xl font-bold mb-1">Activities</h1>
          <p className="text-sm text-gray-500">
            {activities.length} activities
          </p>
        </div>

        <span>
          <Link
            to="/moderator/activities/add"
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
            type="button"
            onClick={() => setActiveTab(index)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      <div className="w-full">
        {tabs.map((tab, index) => (
          <div
            key={index}
            style={{ display: activeTab === index ? "block" : "none" }}
            className="w-full"
          >
            <tab.component role="moderator" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeratorActivities;
