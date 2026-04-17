const AdminModeratorDashboard = ({
  dashboardTitle,
  currentUserName,
  fallbackRoleName,
  dashboardError,
  summaryCards,
  activities,
  tasks,
  memberApplications,
  actionsTitle,
  actions,
  toolsTitle,
  tools,
}) => {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            {dashboardTitle}
          </h1>
          <p className="mt-1 text-slate-300">
            Welcome, <span className="font-semibold text-white">{currentUserName || fallbackRoleName}</span>.
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
            <h2 className="mb-4 text-lg font-bold">Recent Member Applications</h2>
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
            <h2 className="mb-4 text-lg font-bold">{actionsTitle}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {actions.map((action) => (
                <button
                  key={action.label}
                  className={action.className}
                  onClick={action.onClick}
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold">{toolsTitle}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {tools.map((tool) => (
                <button
                  key={tool.label}
                  className={tool.className}
                  onClick={tool.onClick}
                >
                  {tool.label}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminModeratorDashboard;