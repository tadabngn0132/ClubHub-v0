import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserTasks, resetTaskStatus } from "../../../store/slices/taskSlice";
import {
  getActivitiesByUserId,
  resetActivityStatus,
} from "../../../store/slices/activitySlice";
import Loading from "../../../components/layout/internal/Loading";

const MemberDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
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

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserTasks(currentUser.id));
      dispatch(getActivitiesByUserId(currentUser.id));
    }

    dispatch(resetTaskStatus());
    dispatch(resetActivityStatus());
  }, [dispatch, currentUser]);

  if (tasksLoading || activitiesLoading) {
    return <Loading />;
  }

  const dashboardError = tasksError || activitiesError;

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-6 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.85)] backdrop-blur md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-300/80">
            Member Area
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight md:text-4xl">
            Member Dashboard
          </h1>
          <p className="mt-3 text-slate-300">
            Welcome,{" "}
            <span className="font-semibold text-white">
              {currentUser?.fullname || "Member"}
            </span>
            .
          </p>

          {dashboardError && (
            <div className="mt-4 rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
              {dashboardError}
            </div>
          )}
        </section>

        <section className="grid gap-4 sm:grid-cols-2">
          <article className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Assigned Tasks
            </p>
            <p className="mt-2 text-3xl font-bold text-cyan-300">
              {tasks.length}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Joined Activities
            </p>
            <p className="mt-2 text-3xl font-bold text-emerald-300">
              {activities.length}
            </p>
          </article>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">My Tasks</h2>
            {tasks.length === 0 ? (
              <p className="text-sm text-slate-400">No tasks assigned.</p>
            ) : (
              <ul className="space-y-3">
                {tasks.map((task) => (
                  <li
                    key={task.id}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium text-slate-100">
                        {task.title || task.name || "Untitled task"}
                      </span>
                      <button
                        className="shrink-0 rounded-lg bg-cyan-500/20 px-3 py-1 text-xs font-semibold text-cyan-300 transition hover:bg-cyan-500/35 cursor-pointer"
                        onClick={() =>
                          navigate(`/member/tasks/view/${task.id}`)
                        }
                      >
                        View
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">My Activities</h2>
            {activities.length === 0 ? (
              <p className="text-sm text-slate-400">No activities joined.</p>
            ) : (
              <ul className="space-y-3">
                {activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-medium text-slate-100">
                        {activity.title || activity.name || "Untitled activity"}
                      </span>
                      <button
                        className="shrink-0 rounded-lg bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/35 cursor-pointer"
                        onClick={() =>
                          navigate(`/member/activities/view/${activity.id}`)
                        }
                      >
                        View
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberDashboard;
