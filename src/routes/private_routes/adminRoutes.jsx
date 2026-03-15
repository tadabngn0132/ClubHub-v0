import AdminLayout from "../../components/layout/admin/AdminLayout.jsx";
import AdminDashboard from "../../pages/private/admin/AdminDashboard.jsx";
import AdminActivities from "../../pages/private/admin/AdminActivities.jsx";
import AdminSchedule from "../../pages/private/admin/AdminSchedule.jsx";
import AdminTasks from "../../pages/private/admin/AdminTasks.jsx";
import AdminProfile from "../../pages/private/admin/AdminProfile.jsx";
import AdminUsers from "../../pages/private/admin/AdminUsers.jsx";
import AdminEditUser from "../../pages/private/admin/AdminEditUser.jsx";
import AdminViewUser from "../../pages/private/admin/AdminViewUser.jsx";
import AdminEditActivity from "../../pages/private/admin/AdminEditActivity.jsx";
import AdminViewActivity from "../../pages/private/admin/AdminViewActivity.jsx";
import AdminAddActivity from "../../pages/private/admin/AdminAddActivity.jsx";
import AdminAddUser from "../../pages/private/admin/AdminAddUser.jsx";
import AdminEditTask from "../../pages/private/admin/AdminEditTask.jsx";
import AdminViewTask from "../../pages/private/admin/AdminViewTask.jsx";
import AdminAddTask from "../../pages/private/admin/AdminAddTask.jsx";
import AdminDepartments from "../../pages/private/admin/AdminDepartments.jsx";
import AdminAddDepartment from "../../pages/private/admin/AdminAddDepartment.jsx";
import AdminEditDepartment from "../../pages/private/admin/AdminEditDepartment.jsx";
import AdminViewDepartment from "../../pages/private/admin/AdminViewDepartment.jsx";
import AdminPositions from "../../pages/private/admin/AdminPositions.jsx";
import AdminAddPosition from "../../pages/private/admin/AdminAddPosition.jsx";
import AdminEditPosition from "../../pages/private/admin/AdminEditPosition.jsx";
import AdminViewPosition from "../../pages/private/admin/AdminViewPosition.jsx";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <AdminLayout>
        <AdminDashboard />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/activities",
    element: (
      <AdminLayout>
        <AdminActivities />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/activities/edit/:activityId",
    element: (
      <AdminLayout>
        <AdminEditActivity />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/activities/view/:activityId",
    element: (
      <AdminLayout>
        <AdminViewActivity />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/activities/add",
    element: (
      <AdminLayout>
        <AdminAddActivity />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/schedule",
    element: (
      <AdminLayout>
        <AdminSchedule />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/tasks",
    element: (
      <AdminLayout>
        <AdminTasks />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/tasks/edit/:taskId",
    element: (
      <AdminLayout>
        <AdminEditTask />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/tasks/view/:taskId",
    element: (
      <AdminLayout>
        <AdminViewTask />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/tasks/add",
    element: (
      <AdminLayout>
        <AdminAddTask />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/profile",
    element: (
      <AdminLayout>
        <AdminProfile />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <AdminLayout>
        <AdminUsers />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/users/view/:userId",
    element: (
      <AdminLayout>
        <AdminViewUser />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/users/edit/:userId",
    element: (
      <AdminLayout>
        <AdminEditUser />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/users/add",
    element: (
      <AdminLayout>
        <AdminAddUser />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/departments",
    element: (
      <AdminLayout>
        <AdminDepartments />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/departments/add",
    element: (
      <AdminLayout>
        <AdminAddDepartment />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/departments/edit/:departmentId",
    element: (
      <AdminLayout>
        <AdminEditDepartment />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/departments/view/:departmentId",
    element: (
      <AdminLayout>
        <AdminViewDepartment />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/positions",
    element: (
      <AdminLayout>
        <AdminPositions />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/positions/add",
    element: (
      <AdminLayout>
        <AdminAddPosition />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/positions/edit/:positionId",
    element: (
      <AdminLayout>
        <AdminEditPosition />
      </AdminLayout>
    ),
  },
  {
    path: "/admin/positions/view/:positionId",
    element: (
      <AdminLayout>
        <AdminViewPosition />
      </AdminLayout>
    ),
  },
];
