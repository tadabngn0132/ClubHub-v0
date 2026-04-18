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

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { notifications, isLoading, error } = useSelector(
    (state) => state.notification,
  );
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
      toast.error(error);

      dispatch(resetNotificationError());
    }
  }, [error]);

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
    <div>
      <h1>Notifications</h1>
      <button
        onClick={() =>
          dispatch(markAllNotificationsAsReadByUserId(currentUser.id))
        }
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Mark all as read
      </button>
      {notifications.map((notification) => (
        <div key={notification.id} className="p-4 border-b">
          <p>{notification.message}</p>
          <p>{formatDate(notification.createdAt)}</p>
          <button
            onClick={() =>
              dispatch(
                updateNotificationById({
                  id: notification.id,
                  notificationData: { isRead: true },
                }),
              )
            }
            className="px-2 py-1 bg-green-500 text-white rounded mt-2"
          >
            Mark as Read
          </button>
          <button
            onClick={() => handleDeleteConfigured(notification.id, "soft")}
            className="px-2 py-1 bg-red-500 text-white rounded mt-2"
          >
            {userRole === "ADMIN" ? "Soft Delete" : "Delete"}
          </button>
          {userRole === "ADMIN" && (
            <button
              onClick={() => handleDeleteConfigured(notification.id, "hard")}
              className="px-2 py-1 bg-red-700 text-white rounded mt-2 ml-2"
            >
              Hard Delete
            </button>
          )}
        </div>
      ))}

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
