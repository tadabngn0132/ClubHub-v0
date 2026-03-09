import AdminLayout from '../../components/layout/admin/AdminLayout.jsx'
import AdminDashboard from '../../pages/private/admin/AdminDashboard.jsx'
import AdminActivities from '../../pages/private/admin/AdminActivities.jsx'
import AdminSchedule from '../../pages/private/admin/AdminSchedule.jsx'
import AdminTasks from '../../pages/private/admin/AdminTasks.jsx'
import AdminProfile from '../../pages/private/admin/AdminProfile.jsx'
import AdminUsers from '../../pages/private/admin/AdminUsers.jsx'
import AdminEditUser from '../../pages/private/admin/AdminEditUser.jsx'
import AdminViewUser from '../../pages/private/admin/AdminViewUser.jsx'
import AdminEditActivity from '../../pages/private/admin/AdminEditActivity.jsx'
import AdminViewActivity from '../../pages/private/admin/AdminViewActivity.jsx'
import AdminAddActivity from '../../pages/private/admin/AdminAddActivity.jsx'
import AdminAddUser from '../../pages/private/admin/AdminAddUser.jsx'
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
        <AdminUsers />
      </AdminLayout>
    )
  },
  {
    path: '/admin/users/view/:userId',
    element: (
      <AdminLayout>
        <AdminViewUser />
      </AdminLayout>
    )
  },
  {
    path: '/admin/users/edit/:userId',
    element: (
      <AdminLayout>
        <AdminEditUser />
      </AdminLayout>
    )
  },
  {
    path: '/admin/users/add',
    element: (
      <AdminLayout>
        <AdminAddUser />
      </AdminLayout>
    )
  }
]