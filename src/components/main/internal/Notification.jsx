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

const Notification = ({ onClose }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { notifications, isLoading: isNotificationLoading, error } = useSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserNotifications(currentUser.id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching notifications.",
      );

      dispatch(resetNotificationError());
    }
  }, [error]);

  const userRole = formatUppercaseToCapitalized(getUserRole(currentUser));

  const handleMarkAllAsRead = () => {
    if (currentUser) {
      dispatch(markAllNotificationsAsReadByUserId(currentUser.id));
    }
  };

  return (
    <div className="rounded-xl border border-white/15 bg-[#0f0f11] p-4 text-white shadow-[0_12px_36px_rgba(0,0,0,0.45)]">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h1 className="text-md font-semibold text-white">Notifications</h1>
        <button
          onClick={handleMarkAllAsRead}
          disabled={notifications.length === 0 || notifications.every((n) => n.isRead)}
          className="inline-flex items-center rounded-md border border-[#DB3F7A]/40 bg-[#DB3F7A]/10 px-3 py-1.5 text-xs font-semibold text-[#ff9ac0] transition hover:bg-[#DB3F7A]/20 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#DB3F7A]/10"
        >
          Mark all as read
        </button>
      </div>

      {isNotificationLoading ? (
        <div className="mt-4">
          <Loading />
        </div>
      ) : notifications.length === 0 ? (
        <p className="mt-4 text-sm text-white/70">No notifications found.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className={`mt-3 rounded-lg border px-3 py-3 transition ${
              notification?.isRead
                ? "border-white/10 bg-white/[0.03]"
                : "border-[#DB3F7A]/35 bg-[#DB3F7A]/10"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[13px] leading-5 text-white/90">
                {notification.message}
              </p>
              {!notification?.isRead && (
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#DB3F7A]" />
              )}
            </div>
            <p className="mt-2 text-[10px] font-medium text-white/50">
              {formatDate(notification.createdAt)}
            </p>
          </div>
        ))
      )}
      <Link
        to={`/${userRole}/notifications`}
        onClick={onClose}
        className="mt-3 inline-flex items-center text-xs font-medium text-white/70 transition hover:text-white"
      >
        View All Notifications
      </Link>
    </div>
  );
};

export default Notification;
