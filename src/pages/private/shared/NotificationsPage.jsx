import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserNotifications,
  updateNotificationById,
  softDeleteNotificationById,
  hardDeleteNotificationById,
  markAllNotificationsAsReadByUserId,
  resetNotificationError,
} from "../../../store/slices/notificationSlice";
import Loading from "../../../components/layout/internal/Loading";
import toast from "react-hot-toast";
import { formatDate } from "../../../utils/formatters";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal";
import { getUserRole } from "../../../utils/helper";
import { useSocket } from "../../../hooks/useSocket";

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { currentUser, token } = useSelector((state) => state.auth);
  const { notifications, isLoading, error } = useSelector(
    (state) => state.notification,
  );
  const { onEvent } = useSocket(token);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const [deleteMode, setDeleteMode] = useState("");

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
  }, [error, dispatch]);

  useEffect(() => {
    if (!currentUser?.id) return;

    const refreshNotifications = () => {
      dispatch(getUserNotifications(currentUser.id));
    };

    const unsubscribeReceive = onEvent(
      "notification:receive",
      refreshNotifications,
    );
    const unsubscribeRead = onEvent("notification:read", refreshNotifications);
    const unsubscribeDelete = onEvent(
      "notification:delete",
      refreshNotifications,
    );

    return () => {
      unsubscribeReceive();
      unsubscribeRead();
      unsubscribeDelete();
    };
  }, [onEvent, dispatch, currentUser?.id]);

  const userRole = getUserRole(currentUser);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (notificationId, mode) => {
    setSelectedNotificationId(notificationId);
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = (selectedNotificationId) => {
    if (deleteMode === "soft") {
      dispatch(softDeleteNotificationById(selectedNotificationId));
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteNotificationById(selectedNotificationId));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-0">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,63,122,0.08),transparent_30%)]" />

        <div className="relative mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
          <div>
            <h1 className="font-['Monument',sans-serif] text-2xl font-black uppercase tracking-[0.06em] text-white sm:text-[2rem]">
              Notifications
            </h1>
            <p className="mt-2 text-sm text-white/60">
              {notifications.length} total notifications
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              dispatch(markAllNotificationsAsReadByUserId(currentUser.id))
            }
            disabled={!notifications.length}
            className="inline-flex items-center justify-center rounded-xl bg-[#db3f7a] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(219,63,122,0.25)] transition duration-200 hover:bg-[#c7376f] disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/45 disabled:shadow-none"
          >
            Mark all as read
          </button>
        </div>

        <div className="relative max-h-[70vh] space-y-3 overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-8 text-center text-sm text-white/55">
              No notifications found.
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-xl border px-4 py-3 ${
                  notification?.isRead
                    ? "border-white/10 bg-white/5"
                    : "border-[#db3f7a]/30 bg-[#db3f7a]/10"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm leading-6 text-white/90">
                      {notification.message}
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      {formatDate(notification.createdAt)}
                    </p>
                  </div>

                  {!notification?.isRead && (
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#DB3F7A]" />
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        updateNotificationById({
                          id: notification.id,
                          notificationData: { isRead: true },
                        }),
                      )
                    }
                    className="inline-flex items-center rounded-md border border-green-500/40 px-2.5 py-1.5 text-xs font-medium text-green-400 transition hover:bg-green-500/10"
                  >
                    Mark as Read
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteConfigured(notification.id, "soft")
                    }
                    className="inline-flex items-center rounded-md border border-red-500/40 px-2.5 py-1.5 text-xs font-medium text-red-400 transition hover:bg-red-500/10"
                  >
                    {userRole === "ADMIN" ? "Soft Delete" : "Delete"}
                  </button>

                  {userRole === "ADMIN" && (
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteConfigured(notification.id, "hard")
                      }
                      className="inline-flex items-center rounded-md border border-red-700/50 px-2.5 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-700/20"
                    >
                      Hard Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this notification?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete(selectedNotificationId)}
      />
    </div>
  );
};

export default NotificationsPage;
