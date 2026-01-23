import AdminLayout from '../../components/layout/admin/AdminLayout.jsx'
import AdminDashboard from '../../pages/private/admin/AdminDashboard.jsx'
import AdminActivities from '../../pages/private/admin/AdminActivities.jsx'
import AdminSchedule from '../../pages/private/admin/AdminSchedule.jsx'
import AdminTasks from '../../pages/private/admin/AdminTasks.jsx'
import AdminSquare from '../../pages/private/admin/AdminSquare.jsx'
import AdminProfile from '../../pages/private/admin/AdminProfile.jsx'
import AdminMembers from '../../pages/private/admin/AdminMembers.jsx'

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
    path: '/admin/square',
    element: (
      <AdminLayout>
        <AdminSquare />
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
    path: '/admin/members',
    element: (
      <AdminLayout>
        <AdminMembers />
      </AdminLayout>
    )
  }
]