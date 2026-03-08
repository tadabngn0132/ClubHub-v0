import AdminLayout from '../../components/layout/admin/AdminLayout.jsx'
import AdminDashboard from '../../pages/private/admin/AdminDashboard.jsx'
import AdminActivities from '../../pages/private/admin/AdminActivities.jsx'
import AdminSchedule from '../../pages/private/admin/AdminSchedule.jsx'
import AdminTasks from '../../pages/private/admin/AdminTasks.jsx'
import AdminProfile from '../../pages/private/admin/AdminProfile.jsx'
import AdminMembers from '../../pages/private/admin/AdminMembers.jsx'
import AdminEditMember from '../../pages/private/admin/AdminEditUser.jsx'
import AdminViewMember from '../../pages/private/admin/AdminViewUser.jsx'
import AdminEditActivity from '../../pages/private/admin/AdminEditActivity.jsx'
import AdminViewActivity from '../../pages/private/admin/AdminViewActivity.jsx'
import AdminAddActivity from '../../pages/private/admin/AdminAddActivity.jsx'
import AdminAddMember from '../../pages/private/admin/AdminAddMember.jsx'
import AdminEditTask from '../../pages/private/admin/AdminEditTask.jsx'
import AdminViewTask from '../../pages/private/admin/AdminViewTask.jsx'
import AdminAddTask from '../../pages/private/admin/AdminAddTask.jsx'

export const adminRoutes = [
  {
    path: '/admin/dashboard',
    element: (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    )
  },
  {
    path: '/admin/activities',
    element: (
      <AdminLayout>
        <AdminActivities />
      </AdminLayout>
    )
  },
  {
    path: '/admin/activities/edit/:activityId',
    element: (
      <AdminLayout>
        <AdminEditActivity />
      </AdminLayout>
    )
  },
  {
    path: '/admin/activities/view/:activityId',
    element: (
      <AdminLayout>
        <AdminViewActivity />
      </AdminLayout>
    )
  },
  {
    path: '/admin/activities/add',
    element: (
      <AdminLayout>
        <AdminAddActivity />
      </AdminLayout>
    )
  },
  {
    path: '/admin/schedule',
    element: (
      <AdminLayout>
        <AdminSchedule />
      </AdminLayout>
    )
  },
  {
    path: '/admin/tasks',
    element: (
      <AdminLayout>
        <AdminTasks />
      </AdminLayout>
    )
  },
  {
    path: '/admin/tasks/edit/:taskId',
    element: (
      <AdminLayout>
        <AdminEditTask />
      </AdminLayout>
    )
  },
  {
    path: '/admin/tasks/view/:taskId',
    element: (
      <AdminLayout>
        <AdminViewTask />
      </AdminLayout>
    )
  },
  {
    path: '/admin/tasks/add',
    element: (
      <AdminLayout>
        <AdminAddTask />
      </AdminLayout>
    )
  },
  {
    path: '/admin/profile',
    element: (
      <AdminLayout>
        <AdminProfile />
      </AdminLayout>
    )
  },
  {
    path: '/admin/users',
    element: (
      <AdminLayout>
        <AdminMembers />
      </AdminLayout>
    )
  },
  {
    path: '/admin/users/view/:userId',
    element: (
      <AdminLayout>
        <AdminViewMember />
      </AdminLayout>
    )
  },
  {
    path: '/admin/users/edit/:userId',
    element: (
      <AdminLayout>
        <AdminEditMember />
      </AdminLayout>
    )
  },
  {
    path: '/admin/users/add',
    element: (
      <AdminLayout>
        <AdminAddMember />
      </AdminLayout>
    )
  }
]