import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllSystemLogs,
  resetSystemLogsError,
} from "../../../store/slices/systemLogSlice";
import Loading from "../../layout/internal/Loading";
import toast from "react-hot-toast";
import { formatDate } from "../../../utils/formatters";

const ActivityLogsPage = () => {
  // TODO: Implement the activity logs page where admin can manage system activity logs. This page will display a list of recent activities and events within the system, such as user registrations, event creations, and other significant actions. Admins will have the ability to filter and search through the logs to monitor system usage and identify any potential issues or trends. The activity logs will be fetched from the backend and updated in real-time as new activities occur.
  const dispatch = useDispatch();
  const { logs, isLoading, error } = useSelector((state) => state.systemLogs);

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
      <h2 className="text-2xl font-bold mb-4">Activity Logs</h2>
      {logs.length === 0 ? (
        <p>No activity logs found.</p>
      ) : (
        <ul className="space-y-2">
          {logs.map((log) => (
            <li key={log.id} className="p-2 border rounded">
              <p>
                <strong>Action:</strong> {log.action}
              </p>
              <p>
                <strong>Details:</strong> {log.details}
              </p>
              <p>
                <strong>Timestamp:</strong> {formatDate(log.timestamp)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityLogsPage;
