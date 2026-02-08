import AdminLayout from '../../components/layout/admin/AdminLayout.jsx'
import AdminDashboard from '../../pages/private/admin/AdminDashboard.jsx'
import AdminActivities from '../../pages/private/admin/AdminActivities.jsx'
import AdminSchedule from '../../pages/private/admin/AdminSchedule.jsx'
import AdminTasks from '../../pages/private/admin/AdminTasks.jsx'
import AdminSquare from '../../pages/private/admin/AdminSquare.jsx'
import AdminProfile from '../../pages/private/admin/AdminProfile.jsx'
import AdminMembers from '../../pages/private/admin/AdminMembers.jsx'
import AdminEditMember from '../../pages/private/admin/AdminEditMember.jsx'
import AdminViewMember from '../../pages/private/admin/AdminViewMember.jsx'
import AdminEditActivity from '../../pages/private/admin/AdminEditActivity.jsx'
import AdminViewActivity from '../../pages/private/admin/AdminViewActivity.jsx'
import AdminAddActivity from '../../pages/private/admin/AdminAddActivity.jsx'
import AdminAddMember from '../../pages/private/admin/AdminAddMember.jsx'

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
  },
  {
    path: '/admin/members/view/:userId',
    element: (
      <AdminLayout>
        <AdminViewMember />
      </AdminLayout>
    )
  },
  {
    path: '/admin/members/edit/:userId',
    element: (
      <AdminLayout>
        <AdminEditMember />
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
    path: '/admin/members/add',
    element: (
      <AdminLayout>
        <AdminAddMember />
      </AdminLayout>
    )
  }
]