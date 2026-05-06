import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserDashboardStats } from "../../../store/slices/userSlice";
import Loading from "../../layout/internal/Loading";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getUserRole } from "../../../utils/helper";

const DashboardWidget = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { dashboardStats, isLoading, error } = useSelector(
    (state) => state.user,
  );
  const { incompleteTasks, upcomingEvents, recentActivities } =
    dashboardStats || {};

  useEffect(() => {
    if (currentUser) {
      dispatch(getAllUserDashboardStats(currentUser.id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "An error occurred while fetching dashboard data.");
    }
  }, [error]);

  const userRole = getUserRole(currentUser)?.toLowerCase();

  if (isLoading) {
    return <Loading />;
  }

  const stats = [
    {
      label: "Incompleted Tasks",
      value: incompleteTasks?.length || 0,
      accent: "from-emerald-500/20 via-emerald-500/10 to-transparent",
      border: "border-emerald-500/20",
      valueColor: "text-emerald-300",
    },
    {
      label: "Upcoming Events",
      value: upcomingEvents?.length || 0,
      accent: "from-sky-500/20 via-sky-500/10 to-transparent",
      border: "border-sky-500/20",
      valueColor: "text-sky-300",
    },
    {
      label: "Recent Activities",
      value: recentActivities?.length || 0,
      accent: "from-violet-500/20 via-violet-500/10 to-transparent",
      border: "border-violet-500/20",
      valueColor: "text-violet-300",
    },
  ];

  const sectionCardClassName =
    "rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-white/20";

  const listItemClassName =
    "rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-white/20 hover:bg-white/10";

  return (
    <div className="p-2 md:p-0">
      <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <div className="inline-flex w-fit items-center rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
            Dashboard Overview
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Welcome, {currentUser?.fullname}!
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
              A quick snapshot of your tasks, events, activities, and recent
              notifications in one place.
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
          Role:{" "}
          <span className="font-semibold text-white">
            {userRole || "member"}
          </span>
        </div>
      </div>

      <section className="mb-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`relative overflow-hidden rounded-2xl border ${stat.border} bg-slate-900/90 p-5 shadow-lg shadow-black/20`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`}
              />
              <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
                {stat.label}
              </p>
              <div className="mt-4 flex items-end justify-between gap-4">
                <p className={`text-4xl font-bold ${stat.valueColor}`}>
                  {stat.value}
                </p>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  Updated live
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-2">
        <div className={sectionCardClassName}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Incompleted Tasks
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Tasks that still need your attention.
              </p>
            </div>
            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
              {incompleteTasks?.length || 0}
            </span>
          </div>
          {incompleteTasks?.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-400">
              No tasks assigned.
            </p>
          ) : (
            <ul className="space-y-3">
              {incompleteTasks?.map((task) => (
                <li key={task.id} className={listItemClassName}>
                  <Link
                    to={`/${userRole}/tasks/view/${task.id}`}
                    className="block transition hover:text-white"
                  >
                    {task.task.title || "Untitled task"}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={sectionCardClassName}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Upcoming Events
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Events you may want to open next.
              </p>
            </div>
            <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
              {upcomingEvents?.length || 0}
            </span>
          </div>
          {upcomingEvents?.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-400">
              No upcoming events.
            </p>
          ) : (
            <ul className="space-y-3">
              {upcomingEvents?.map((event) => (
                <li key={event.id} className={listItemClassName}>
                  <Link
                    to={`/${userRole}/activities/view/${event.id}`}
                    className="block transition hover:text-white"
                  >
                    {event.title || "Untitled event"}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={sectionCardClassName}>
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Recent Activities
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                A feed of the latest club movements.
              </p>
            </div>
            <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-200">
              {recentActivities?.length || 0}
            </span>
          </div>
          {recentActivities?.length === 0 ? (
            <p className="rounded-xl border border-dashed border-white/10 bg-white/5 px-4 py-4 text-sm text-slate-400">
              No recent activities.
            </p>
          ) : (
            <ul className="space-y-3">
              {recentActivities?.map((activity) => (
                <li key={activity.id} className={listItemClassName}>
                  <Link
                    to={`/${userRole}/activities/view/${activity.id}`}
                    className="block transition hover:text-white"
                  >
                    {activity.title || "Untitled activity"}
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
