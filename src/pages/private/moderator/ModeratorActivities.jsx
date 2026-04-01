import { getActivitiesList } from "../../../store/slices/activitySlice";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ActivitiesCardView from "../../../components/main/internal/ActivitiesCardView";
import ActivitiesTableView from "../../../components/main/internal/ActivitiesTableView";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import ActivitiesCalendarView from "../../../components/main/internal/ActivitiesCalendarView.jsx";
import { ACTIVITY_STATUS_OPTIONS } from "../../../utils/constants";
import { formatUppercaseToCapitalized } from "../../../utils/formatters";

const ModeratorActivities = () => {
  const dispatch = useDispatch();
  const { activities, isLoading, error } = useSelector(
    (state) => state.activity,
  );
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const tabs = [
    { name: "Table View", component: ActivitiesTableView },
    { name: "Card View", component: ActivitiesCardView },
    { name: "Calendar View", component: ActivitiesCalendarView },
  ];

  useEffect(() => {
    dispatch(getActivitiesList());
  }, [dispatch]);

  const filteredActivities = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = [...(activities || [])];

    if (keyword) {
      result = result.filter((activity) =>
        [activity.name, activity.type, activity.location, activity.status]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (activity) => String(activity.status || "").toUpperCase() === statusFilter,
      );
    }

    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "a-z") return String(a.name || "").localeCompare(String(b.name || ""));
      if (sortBy === "z-a") return String(b.name || "").localeCompare(String(a.name || ""));
      if (sortBy === "registration-desc") return Number(b.registrationsCount || 0) - Number(a.registrationsCount || 0);
      if (sortBy === "registration-asc") return Number(a.registrationsCount || 0) - Number(b.registrationsCount || 0);
      return 0;
    });

    return result;
  }, [activities, searchTerm, statusFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("newest");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-5">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-100">Activities</h1>
              <p className="text-sm text-gray-400">{filteredActivities.length} activities</p>
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

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, type, location..."
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-72"
            />

            <select
              name="status"
              id="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-56"
            >
              <option value="all">All Status</option>
              {ACTIVITY_STATUS_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {formatUppercaseToCapitalized(status)}
                </option>
              ))}
            </select>

            <select
              name="sort"
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 md:w-72"
            >
              <option value="newest">Date (Newest)</option>
              <option value="oldest">Date (Oldest)</option>
              <option value="a-z">Name (A-Z)</option>
              <option value="z-a">Name (Z-A)</option>
              <option value="registration-desc">Registration (Maximum)</option>
              <option value="registration-asc">Registration (Minimum)</option>
            </select>

            <button
              type="button"
              onClick={clearFilters}
              className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-100 shadow-sm hover:border-[var(--pink-color)]"
            >
              Clear Filters
            </button>

            <div className="flex flex-wrap gap-2 rounded-lg border border-gray-800 bg-gray-950/80 p-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`rounded-md px-4 py-1 text-sm font-semibold transition ${
                    activeTab === index
                      ? "bg-blue-500/20 text-blue-300"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  }`}
                  type="button"
                  onClick={() => setActiveTab(index)}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full">
          {tabs.map((tab, index) => (
            <div
              key={index}
              style={{ display: activeTab === index ? "block" : "none" }}
            >
              <tab.component role="moderator" activities={filteredActivities} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModeratorActivities;
