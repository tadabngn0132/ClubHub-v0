import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  getUsersList,
  resetUserStatus,
} from "../../../store/slices/userSlice.js";
import {
  getAllTasksList,
  resetTaskStatus,
} from "../../../store/slices/taskSlice.js";
import {
  getActivitiesList,
  resetActivityStatus,
} from "../../../store/slices/activitySlice.js";
import {
  getAllMemberApplicationsList,
  resetMemberApplicationStatus,
} from "../../../store/slices/memberApplicationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ModeratorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  // Fetch necessary data for the dashboard
  const {
    users,
    isLoading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useSelector((state) => state.task);
  const {
    activities,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useSelector((state) => state.activity);
  const {
    memberApplications,
    isLoading: memberApplicationsLoading,
    error: memberApplicationsError,
  } = useSelector((state) => state.memberApplication);

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getAllTasksList());
    dispatch(getActivitiesList());
    dispatch(getAllMemberApplicationsList());
    dispatch(resetUserStatus());
    dispatch(resetTaskStatus());
    dispatch(resetActivityStatus());
    dispatch(resetMemberApplicationStatus());
  }, [dispatch]);

  if (
    userLoading ||
    tasksLoading ||
    activitiesLoading ||
    memberApplicationsLoading
  ) {
    return <Loading />;
  }

  const dashboardError =
    userError || tasksError || activitiesError || memberApplicationsError;

  const summaryCards = [
    {
      title: "Total Users",
      value: users.length,
      accent: "text-teal-300",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      accent: "text-cyan-300",
    },
    {
      title: "Total Activities",
      value: activities.length,
      accent: "text-amber-300",
    },
    {
      title: "Member Applications",
      value: memberApplications.length,
      accent: "text-violet-300",
    },
  ];

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Moderator Dashboard
          </h1>
          <p className="mt-1 text-slate-300">
            Welcome,{" "}
            <span className="font-semibold text-white">
              {currentUser?.fullname || "Moderator"}
            </span>
            .
          </p>

          {dashboardError && (
            <div className="mt-4 rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
              {dashboardError}
            </div>
          )}
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {card.title}
              </p>
              <p className={`mt-2 text-3xl font-bold ${card.accent}`}>
                {card.value}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">Recent Activities</h2>
            {activities.length === 0 ? (
              <p className="text-sm text-slate-400">No activities found.</p>
            ) : (
              <ul className="space-y-3">
                {activities.slice(0, 5).map((activity) => (
                  <li
                    key={activity.id}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-3"
                  >
                    <p className="text-sm font-semibold text-slate-100">
                      {activity.title || activity.name || "Untitled activity"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">Recent Tasks</h2>
            {tasks.length === 0 ? (
              <p className="text-sm text-slate-400">No tasks found.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.slice(0, 5).map((task) => (
                  <li
                    key={task.id}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-3"
                  >
                    <p className="text-sm font-semibold text-slate-100">
                      {task.title || task.name || "Untitled task"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">
              Recent Member Applications
            </h2>
            {memberApplications.length === 0 ? (
              <p className="text-sm text-slate-400">No applications found.</p>
            ) : (
              <ul className="space-y-3">
                {memberApplications.slice(0, 5).map((application) => (
                  <li
                    key={application.id}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-3"
                  >
                    <p className="text-sm font-semibold text-slate-100">
                      {application.applicantName ||
                        application.fullname ||
                        "Unnamed applicant"}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">Moderator Actions</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                className="rounded-xl bg-sky-500/85 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 cursor-pointer"
                onClick={() => dispatch(getUsersList())}
              >
                Refresh Users
              </button>
              <button
                className="rounded-xl bg-sky-500/85 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 cursor-pointer"
                onClick={() => dispatch(getAllTasksList())}
              >
                Refresh Tasks
              </button>
              <button
                className="rounded-xl bg-sky-500/85 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 cursor-pointer"
                onClick={() => dispatch(getActivitiesList())}
              >
                Refresh Activities
              </button>
              <button
                className="rounded-xl bg-sky-500/85 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 cursor-pointer"
                onClick={() => dispatch(getAllMemberApplicationsList())}
              >
                Refresh Applications
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">Moderator Tools</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <button
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
                onClick={() => navigate("/moderator/users")}
              >
                Manage Users
              </button>
              <button
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
                onClick={() => navigate("/moderator/tasks")}
              >
                Manage Tasks
              </button>
              <button
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
                onClick={() => navigate("/moderator/activities")}
              >
                Manage Activities
              </button>
              <button
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer"
                onClick={() => navigate("/moderator/member-applications")}
              >
                Manage Applications
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
