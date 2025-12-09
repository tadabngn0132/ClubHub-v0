import ProtectedRoute from '../../components/auth/ProtectedRoute'

const ModeratorLayout = ({ children }) => {
  return (
    <>
    <ProtectedRoute>
      <ModeratorHeader />
      { children }
      <ModeratorFooter />
    </ProtectedRoute>
    </>
  )
}
export const moderatorRoutes = [
  {
    path: '/moderator/dashboard',
    element: (
      <ModeratorLayout>
        <ModeratorDashboard />
      </ModeratorLayout>
    )
  },
  {
    path: '/moderator/activities',
    element: (
      <ModeratorLayout>
        <ModeratorActivities />
      </ModeratorLayout>
    )
  },
  {
    path: '/moderator/schedule',
    element: (
      <ModeratorLayout>
        <ModeratorSchedule />
      </ModeratorLayout>
    )
  },
  {
    path: '/moderator/tasks',
    element: (
      <ModeratorLayout>
        <ModeratorTasks />
      </ModeratorLayout>
    )
  },
  {
    path: '/moderator/square',
    element: (
      <ModeratorLayout>
        <ModeratorSquare />
      </ModeratorLayout>
    )
  },
  {
    path: '/moderator/profile',
    element: (
      <ModeratorLayout>
        <ModeratorProfile />
      </ModeratorLayout>
    )
  },
]
