import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  markAllNotificationsAsReadByUserId,
  resetNotificationError,
} from "../../../store/slices/notificationSlice";
import { useEffect } from "react";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters";
import { Link } from "react-router-dom";
import { getUserRole } from "../../../utils/helper";

const Notification = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { notifications, isLoading, error } = useSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserNotifications(currentUser.id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred while fetching notifications.");

      dispatch(resetNotificationError());
    }
  }, [error]);

  const userRole = formatUppercaseToCapitalized(getUserRole(currentUser));

  const handleMarkAllAsRead = () => {
    if (currentUser) {
      dispatch(markAllNotificationsAsReadByUserId(currentUser.id));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <h1>Notifications</h1>
      <button
        onClick={handleMarkAllAsRead}
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
