import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ActivitiesBulkActionBar from "./ActivitiesBulkActionBar";

const ActivitiesTableView = ({
  role,
  activities: providedActivities,
  onDelete,
}) => {
  const { activities: storeActivities } = useSelector(
    (state) => state.activity,
  );
  const activities = Array.isArray(providedActivities)
    ? providedActivities
    : storeActivities;
  const [selectedActivities, setSelectedActivities] = useState([]);
  const isAllSelected =
    activities.length > 0 && selectedActivities.length === activities.length;

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedActivities(activities.map((activity) => activity.id));
      return;
    }

    setSelectedActivities([]);
  };

  return (
    <>
      {selectedActivities.length > 2 && (
        <ActivitiesBulkActionBar eventCount={selectedActivities.length} />
      )}

      <div className="mb-10 w-full overflow-hidden rounded-xl border border-gray-800 bg-gray-900 shadow-xl">
        <div className="w-full overflow-auto">
          <table className="min-w-full border-collapse text-sm text-gray-200">
            <thead className="bg-gray-950/80 text-xs uppercase tracking-wide text-gray-400">
              <tr className="border-b border-gray-800">
                <th className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => toggleSelectAll(e.target.checked)}
                    className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                  />
                </th>
                <th className="px-4 py-3">Activity ID</th>
                <th className="px-4 py-3">Thumbnail</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Registrations</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {activities.map((activity) => {
                const isSelected = selectedActivities.includes(activity.id);

                return (
                  <tr
                    key={activity.id}
                    className={`transition hover:bg-gray-800/60 ${
                      isSelected ? "bg-blue-500/10" : "bg-transparent"
                    }`}
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedActivities([
                              ...selectedActivities,
                              activity.id,
                            ]);
                          } else {
                            setSelectedActivities(
                              selectedActivities.filter(
                                (id) => id !== activity.id,
                              ),
                            );
                          }
                        }}
                        className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-4 py-3 text-gray-400">{activity.id}</td>
                    <td className="px-4 py-3">
                      <img
                        src={activity.thumbnailUrl}
                        alt={activity.name}
                        className="h-14 w-20 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-100">
                      {activity.name || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-violet-500/40 bg-violet-500/20 px-2.5 py-1 text-xs font-semibold uppercase text-violet-200">
                        {activity.type || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {activity.date || "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {activity.location || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold uppercase text-emerald-200">
                        {activity.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {activity.registrationsCount || 0}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          to={`/${role}/activities/view/${activity.id}`}
                          className="rounded-md bg-sky-500/15 px-3 py-1.5 text-xs font-medium text-sky-300 transition hover:bg-sky-500/30"
                        >
                          View
                        </Link>
                        {(role === "admin" || role === "moderator") && (
                          <>
                            <Link to={`/${role}/activities/${activity.id}/participants`} className="rounded-md bg-green-500/15 px-3 py-1.5 text-xs font-medium text-green-300 transition hover:bg-green-500/30">
                              View Participants
                            </Link>
                            <Link
                              to={`/${role}/activities/edit/${activity.id}`}
                              className="rounded-md bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/30"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => onDelete(activity.id)}
                              className="rounded-md bg-rose-500/15 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/30"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {activities.length === 0 && (
          <div className="border-t border-gray-800 px-4 py-10 text-center text-sm text-gray-400">
            No activities found.
          </div>
        )}
      </div>
    </>
  );
};

export default ActivitiesTableView;
