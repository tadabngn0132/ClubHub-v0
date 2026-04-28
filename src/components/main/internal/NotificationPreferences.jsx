import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllNotificationPreferencesByUserId,
  updateUserNotificationPreferences,
  resetNotificationPreferencesError,
} from "../../../store/slices/notificationPreferenceSlice";
import { getUserRole } from "../../../utils/helper";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import Loading from "../../layout/internal/Loading";

const NotificationPreferences = () => {
  // TODO: Implement the notification preferences component to allow students to customize their notification settings for club activities, events, and updates. This component will provide students with options to choose how they want to receive notifications (e.g., email, SMS, in-app) and what types of notifications they want to receive (e.g., event reminders, club announcements). The component will be designed to be user-friendly and intuitive, allowing students to easily manage their notification preferences and stay informed about their club activities and engagement. The settings will be saved and fetched from the backend to ensure that they are persistent and personalized for each student.
  const dispatch = useDispatch();
  const { preferences, isLoading, error } = useSelector(
    (state) => state.notificationPreference,
  );
  const { currentUser } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailNotifications: preferences ? preferences.emailNotifications : false,
      pushNotifications: preferences ? preferences.pushNotifications : false,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllNotificationPreferencesByUserId(currentUser.id));
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message ||
          "An error occurred while updating notification preferences.",
      );
      dispatch(resetNotificationPreferencesError());
    }
  }, [error, dispatch]);

  const handleUpdatePreferences = async (data) => {
    if (currentUser) {
      await dispatch(
        updateUserNotificationPreferences({
          userId: currentUser.id,
          preferenceData: {
            emailNotifications: data.emailNotifications,
            pushNotifications: data.pushNotifications,
          },
        }),
      ).unwrap();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      {/* <h1>Notification Preferences</h1>
      <form onSubmit={handleSubmit(handleUpdatePreferences)}>
        <div className="mb-4">
          <label className="block mb-2">Email Notifications</label>
          <input
            type="checkbox"
            {...register("emailNotifications")}
            defaultChecked={
              preferences ? preferences.emailNotifications : false
            }
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Push Notifications</label>
          <input
            type="checkbox"
            {...register("pushNotifications")}
            defaultChecked={preferences ? preferences.pushNotifications : false}
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Save Preferences
        </button>
      </form> */}
      <p className="text-sm text-slate-300">
        This feature is coming soon! Stay tuned for updates on notification preferences.
      </p>
    </div>
  );
};

export default NotificationPreferences;
