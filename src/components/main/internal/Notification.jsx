import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  markAllNotificationsAsReadByUserId,
  resetNotificationStatus,
  resetNotificationError,
} from "../../../store/slices/notificationSlice";
import { useEffect } from "react";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { formatDate, formatUppercaseToCapitalized } from "../../../utils/formatters";

const Notification = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { notifications, isLoading, error, notificationStatus } = useSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserNotifications(currentUser.id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);

      dispatch(resetNotificationError());
    }
  }, [error]);

  const userRole = formatUppercaseToCapitalized(currentUser?.userPosition[0]?.position?.systemRole);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h1>Notifications</h1>
      <button
        onClick={() => currentUser && dispatch(markAllNotificationsAsReadByUserId(currentUser.id))}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Mark all as read
      </button>
      {notifications.map((notification) => (
        <div key={notification.id} className="p-4 border-b">
          <p>{notification.message}</p>
          <p>{formatDate(notification.createdAt)}</p>
        </div>
      ))}
      <Link to={`/${userRole}/notifications`}>View All Notifications</Link>
    </div>
  );
};

export default Notification;
