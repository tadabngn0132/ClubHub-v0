import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  resetNotificationStatus,
} from "../../../store/slices/notificationSlice";
import { useEffect } from "react";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { formatDate } from "../../../utils/formatters";

const Notification = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { notifications, isLoading, error, status } = useSelector((state) => state.notification);

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserNotifications(currentUser.id));
    }
  }, [currentUser, dispatch]);

  const handleResetNotificationsStatus = () => {
    if (currentUser) {
      dispatch(getUserNotifications(currentUser.id));
    }
    dispatch(resetNotificationStatus());
  }

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="p-4">
      <h1>Notifications</h1>
      <button onClick={handleResetNotificationsStatus} className="px-4 py-2 bg-blue-500 text-white rounded">
        Mark all as read
      </button>
      {notifications.map((notification) => (
        <div key={notification.id} className="p-4 border-b">
          <p>{notification.message}</p>
          <p>{formatDate(notification.createdAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default Notification;
