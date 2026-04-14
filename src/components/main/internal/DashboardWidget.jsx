import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDashboardStats } from "../../../store/slices/userSlice";
import { getUserNotifications } from "../../../store/slices/notificationSlice";
import Loading from "../../layout/internal/Loading";
import toast from "react-hot-toast";

const DashboardWidget = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { dashboardStats, isLoading, error } = useSelector((state) => state.user);
  const { notifications, isLoading: isNotificationsLoading, error: notificationError } = useSelector((state) => state.notification);
  const { incompleteTasks, upcomingEvents, recentActivities } = dashboardStats || {};
    
  useEffect(() => {
    if (currentUser) {
      dispatch(getAllUserDashboardStats(currentUser.id));
      dispatch(getUserNotifications(currentUser.id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (error || notificationError) {
      toast.error(error || notificationError);
    }
  }, [error, notificationError]);

  const userRole = currentUser?.userPosition[0]?.position?.systemRole.toLowerCase();

  if (isLoading || isNotificationsLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <section>
        <h2 className="text-xl font-semibold mb-2">Welcome, {currentUser?.name}!</h2>
        <p className="text-gray-600">Here's a quick overview of your recent activities and notifications.</p>
      </section>

      {/* Stats section */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Incompleted Tasks</h3>
            <p className="text-2xl font-bold">{incompleteTasks?.length || 0}</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
            <p className="text-2xl font-bold">{upcomingEvents?.length || 0}</p>
          </div>
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
            <p className="text-2xl font-bold">{recentActivities?.length || 0}</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Incompleted Tasks</h2>
          {incompleteTasks?.length === 0 ? (
            <p className="text-sm text-gray-500">No tasks assigned.</p>
          ) : (
            <ul className="list-disc list-inside">
              {incompleteTasks?.map((task) => (
                <li key={task.id} className="text-sm">
                  <Link to={`/${userRole}/tasks/view/${task.id}`}>
                    {task.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Notifications</h2>
          {notifications?.length === 0 ? (
            <p className="text-sm text-gray-500">No notifications.</p>
          ) : (
            <ul className="list-disc list-inside">
              {notifications?.map((notification) => (
                <li key={notification.id} className="text-sm">
                  {notification.message}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
          {upcomingEvents?.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming events.</p>
          ) : (
            <ul className="list-disc list-inside">
              {upcomingEvents?.map((event) => (
                <li key={event.id} className="text-sm">
                  <Link to={`/${userRole}/activities/view/${event.id}`}>
                    {event.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
          {recentActivities?.length === 0 ? (
            <p className="text-sm text-gray-500">No recent activities.</p>
          ) : (
            <ul className="list-disc list-inside">
              {recentActivities?.map((activity) => (
                <li key={activity.id} className="text-sm">
                  <Link to={`/${userRole}/activities/view/${activity.id}`}>
                    {activity.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;
