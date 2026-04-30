import {
  getActivitiesList,
  softDeleteActivityById,
  hardDeleteActivityById,
  restoreAnActivityById,
  resetActivityError,
} from "../../../store/slices/activitySlice";
import { use, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ActivitiesCardView from "../../../components/main/internal/ActivitiesCardView";
import ActivitiesTableView from "../../../components/main/internal/ActivitiesTableView";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import ActivitiesCalendarView from "../../../components/main/internal/ActivitiesCalendarView.jsx";
import { ACTIVITY_STATUS_OPTIONS } from "../../../utils/constants";
import { formatUppercaseToCapitalized } from "../../../utils/formatters";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";
import Pagination from "../../../components/internal/Pagination.jsx";

const ActivitiesPage = ({ role, canCreate, basePath }) => {
  const dispatch = useDispatch();
  const { activities, isLoading, error } = useSelector(
    (state) => state.activity,
  );
  const [activeTab, setActiveTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [deleteMode, setDeleteMode] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const activitiesPerPage = 10;

  useEffect(() => {
    dispatch(getActivitiesList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching activities.",
      );
      dispatch(resetActivityError());
    }
  }, [error]);

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
        (activity) =>
          String(activity.status || "").toUpperCase() === statusFilter,
      );
    }

    result.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "a-z")
        return String(a.name || "").localeCompare(String(b.name || ""));
      if (sortBy === "z-a")
        return String(b.name || "").localeCompare(String(a.name || ""));
      if (sortBy === "registration-desc")
        return (
          Number(b.registrationsCount || 0) - Number(a.registrationsCount || 0)
        );
      if (sortBy === "registration-asc")
        return (
          Number(a.registrationsCount || 0) - Number(b.registrationsCount || 0)
        );
      return 0;
    });

    return result;
  }, [activities, searchTerm, statusFilter, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(activities.length / activitiesPerPage),
  );
  const clampedCurrentPage = Math.min(currentPage, totalPages);

  useEffect(() => {
    if (currentPage !== clampedCurrentPage) {
      setCurrentPage(clampedCurrentPage);
    }
  }, [clampedCurrentPage, currentPage]);

  const startIndex = (clampedCurrentPage - 1) * activitiesPerPage;
  const paginatedActivities = filteredActivities.slice(
    startIndex,
    startIndex + activitiesPerPage,
  );

  const activitiesForListView =
    activeTab === 2 ? filteredActivities : paginatedActivities;

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    statusFilter !== "all" ||
    sortBy !== "newest";

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (activityId, mode) => {
    setSelectedActivityId(activityId);
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = async (selectedActivityId) => {
    if (deleteMode === "soft") {
      await dispatch(softDeleteActivityById(selectedActivityId)).unwrap();
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      await dispatch(hardDeleteActivityById(selectedActivityId)).unwrap();
      handleCloseConfirmationModal();
    }
  };

  const tabs = [
    {
      name: "Table View",
      component: (
        <ActivitiesTableView
          role={role}
          activities={activitiesForListView}
          onDeleteConfigured={handleDeleteConfigured}
          onRestore={handleRestore}
        />
      ),
    },
    {
      name: "Card View",
      component: (
        <ActivitiesCardView
          role={role}
          activities={activitiesForListView}
          onDeleteConfigured={handleDeleteConfigured}
        />
      ),
    },
    { name: "Calendar View", component: <ActivitiesCalendarView /> },
  ];

  const handleRestore = async (activityId) => {
    await dispatch(restoreAnActivityById(activityId)).unwrap();
    await dispatch(getAllActivitiesList()).unwrap();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-5">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-1 text-3xl font-bold tracking-tight text-gray-100">
                Activities
              </h1>
              <p className="text-sm text-gray-400">
                {filteredActivities.length} activities
              </p>
            </div>

            {canCreate && (
              <span>
                <Link
                  to={`${basePath}/add`}
                  className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
                >
                  Create New Activity
                </Link>
              </span>
            )}
          </div>

          <div className="mb-4 flex flex-wrap gap-2 rounded-lg border border-gray-800 bg-gray-950/80 p-2">
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
          </div>
        </div>

        <div className="w-full">
          {filteredActivities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-700 bg-gray-950/70 px-6 py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-200">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M8 3V6M16 3V6M4 9H20M6 6H18C19.1046 6 20 6.89543 20 8V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V8C4 6.89543 4.89543 6 6 6Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-100">
                {hasActiveFilters
                  ? "No activities match your filters"
                  : "No activities available yet"}
              </h3>
              <p className="mx-auto mt-2 max-w-xl text-sm text-gray-400">
                {hasActiveFilters
                  ? "Try adjusting keywords or status, or clear filters to see the full list."
                  : "Create your first activity to get started and manage upcoming events."}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm font-medium text-gray-100 shadow-sm hover:border-[var(--pink-color)]"
                  >
                    Clear Filters
                  </button>
                )}

                {canCreate && (
                  <Link
                    to={`${basePath}/add`}
                    className="inline-block rounded-lg border border-[var(--pink-color)] p-2 py-1 text-sm/tight text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white"
                  >
                    Create New Activity
                  </Link>
                )}
              </div>
            </div>
          ) : (
            tabs.map((tab, index) => (
              <div
                key={index}
                style={{ display: activeTab === index ? "block" : "none" }}
              >
                {tab.component}
              </div>
            ))
          )}

          {filteredActivities.length > 0 && activeTab !== 2 && (
            <Pagination
              currentPage={clampedCurrentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>

        <ConfirmationModal
          open={isConfirmationModalOpen}
          title="Confirm Deletion"
          message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this activity?`}
          variant={deleteMode === "soft" ? "warning" : "danger"}
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onCancel={handleCloseConfirmationModal}
          onConfirm={() => handleDelete(selectedActivityId)}
        />
      </div>
    </div>
  );
};

export default ActivitiesPage;
