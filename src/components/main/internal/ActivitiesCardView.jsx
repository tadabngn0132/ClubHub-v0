import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ActivitiesCardView = ({
  role,
  activities: providedActivities,
  onDeleteConfigured,
}) => {
  const { activities: storeActivities } = useSelector(
    (state) => state.activity,
  );
  const activities = Array.isArray(providedActivities)
    ? providedActivities
    : storeActivities;

  return (
    <div className="mb-10 grid w-full grid-cols-1 gap-4 p-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex flex-col overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-lg transition hover:-translate-y-0.5 hover:border-gray-700"
        >
          <img
            src={activity.thumbnailUrl}
            alt={activity.name}
            className="h-40 w-full object-cover"
          />
          <div className="flex flex-1 flex-col p-4">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="rounded-full border border-violet-500/40 bg-violet-500/20 px-2.5 py-1 text-xs font-semibold uppercase text-violet-200">
                {activity.type || "N/A"}
              </p>
              <p className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold uppercase text-emerald-200">
                {activity.status || "N/A"}
              </p>
            </div>

            <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-100">
              {activity.name || "Untitled activity"}
            </h3>
            <p className="mb-1 text-sm text-gray-300">
              Date: {activity.date || "N/A"}
            </p>
            <p className="mb-1 text-sm text-gray-300">
              Location: {activity.location || "N/A"}
            </p>
            <p className="mb-4 text-sm text-gray-400">
              {activity.registrationsCount || 0} participants
            </p>

            <div className="mt-auto flex flex-wrap gap-2">
              <Link
                to={`/${role}/activities/view/${activity.id}`}
                className="rounded-md bg-sky-500/15 px-3 py-1.5 text-xs font-medium text-sky-300 transition hover:bg-sky-500/30"
              >
                View
              </Link>
              {(role === "admin" || role === "moderator") && (
                <>
                  <Link
                    to={`/${role}/activities/${activity.id}/participants`}
                    className="rounded-md bg-green-500/15 px-3 py-1.5 text-xs font-medium text-green-300 transition hover:bg-green-500/30"
                  >
                    View Participants
                  </Link>
                  <Link
                    to={`/${role}/activities/edit/${activity.id}`}
                    className="rounded-md bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/30"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => onDeleteConfigured(activity.id, "soft")}
                    className="rounded-md bg-rose-500/15 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/30"
                  >
                    Soft Delete
                  </button>
                </>
              )}
              {role === "admin" && (
                <button
                  onClick={() => onDeleteConfigured(activity.id, "hard")}
                  className="rounded-md bg-red-500/15 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/30"
                >
                  Hard Delete
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivitiesCardView;
