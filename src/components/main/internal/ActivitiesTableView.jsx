import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ActivitiesBulkActionBar from "./ActivitiesBulkActionBar";

const ActivitiesTableView = ({
  role,
  activities: providedActivities,
  onDeleteConfigured,
  onRestore,
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
                <th className="px-4 py-3">Thumbnail</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Registrations</th>
                {role === "ADMIN" && <th className="px-4 py-3">Is Deleted</th>}
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
                    <td className="px-4 py-3">
                      {activity?.avatarUrl ? (
                        <img
                          src={activity.avatarUrl}
                          alt="Avatar"
                          className="flex h-14 w-20 shrink-0 items-center justify-center rounded-2xl border border-pink-400/30 bg-pink-500/10 text-2xl font-bold text-pink-100"
                        />
                      ) : (
                        <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-2xl border border-pink-400/30 bg-pink-500/10 text-2xl font-bold text-pink-100">
                          {(activity.title || "").slice(0, 1).toUpperCase()}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-100">
                      {activity.title || "N/A"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-violet-500/40 bg-violet-500/20 px-2.5 py-1 text-xs font-semibold uppercase text-violet-200">
                        {activity.type || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {activity.startDate
                        ? new Date(activity.startDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {activity.venueName || activity.venueAddress || "N/A"}
                      {activity.roomNumber ? ` - ${activity.roomNumber}` : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/20 px-2.5 py-1 text-xs font-semibold uppercase text-emerald-200">
                        {activity.status || "N/A"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-300">
                      {activity.registrationsCount || 0}
                    </td>
                    {role === "ADMIN" && (
                      <td className="px-4 py-3 text-sm text-center">
                        {activity.isDeleted ? (
                          <p className="badge text-red-500/80 text-sm/tight">
                            Deleted
                          </p>
                        ) : (
                          <p className="badge text-green-500/80 text-sm/tight">
                            Not Deleted
                          </p>
                        )}
                      </td>
                    )}
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
                              onClick={() =>
                                onDeleteConfigured(activity.id, "soft")
                              }
                              className="rounded-md bg-rose-500/15 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/30"
                            >
                              Soft Delete
                            </button>
                          </>
                        )}
                        {role === "admin" && (
                          <>
                            <button
                              onClick={() =>
                                onDeleteConfigured(activity.id, "hard")
                              }
                              className="rounded-md bg-red-500/15 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/30"
                            >
                              Hard Delete
                            </button>
                            {activity.isDeleted && (
                              <button
                                onClick={() => onRestore(activity.id)}
                                className="rounded-md bg-yellow-500/15 px-3 py-1.5 text-xs font-medium text-yellow-300 transition hover:bg-yellow-500/30"
                              >
                                Restore
                              </button>
                            )}
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
