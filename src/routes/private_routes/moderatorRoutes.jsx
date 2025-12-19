import ModeratorLayout from '../../components/layout/moderator/ModeratorLayout.jsx'
import ModeratorDashboard from '../../pages/private/moderator/ModeratorDashboard.jsx'
import ModeratorActivities from '../../pages/private/moderator/ModeratorActivities.jsx'
import ModeratorSchedule from '../../pages/private/moderator/ModeratorSchedule.jsx'
import ModeratorTasks from '../../pages/private/moderator/ModeratorTasks.jsx'
import ModeratorSquare from '../../pages/private/moderator/ModeratorSquare.jsx'
import ModeratorProfile from '../../pages/private/moderator/ModeratorProfile.jsx'

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
