import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSystemLogs,
  resetSystemLogsError,
} from "../../../store/slices/systemLogSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { formatDate } from "../../../utils/formatters";

const ActivityLogsPage = () => {
  // TODO: Implement the activity logs page where admin can manage system activity logs. This page will display a list of recent activities and events within the system, such as user registrations, event creations, and other significant actions. Admins will have the ability to filter and search through the logs to monitor system usage and identify any potential issues or trends. The activity logs will be fetched from the backend and updated in real-time as new activities occur.
  const dispatch = useDispatch();
  const { logs, isLoading, error } = useSelector((state) => state.systemLog);

  useEffect(() => {
    dispatch(getAllSystemLogs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetSystemLogsError());
    }
  }, [error, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold text-zinc-100">Activity Logs</h2>
      {logs.length === 0 ? (
        <p className="text-zinc-400">No activity logs found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900">
          <table className="min-w-full divide-y divide-zinc-800">
            <thead className="bg-zinc-800/70">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-zinc-300">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 bg-zinc-900">
              {logs.map((log, index) => (
                <tr key={log.id} className="transition-colors hover:bg-zinc-800/70">
                  <td className="px-4 py-3 text-sm text-zinc-400">{index + 1}</td>
                  <td className="px-4 py-3 text-sm font-medium text-zinc-100">
                    {log.action || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-sm text-zinc-300">
                    {log.details || "N/A"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-zinc-400">
                    {formatDate(log.createdAt || log.timestamp)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActivityLogsPage;
