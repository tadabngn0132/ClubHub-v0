import SharedLayout from "../../components/layout/internal/SharedLayout.jsx";
import AdminDashboard from "../../pages/private/admin/AdminDashboard.jsx";
import AdminActivities from "../../pages/private/admin/AdminActivities.jsx";
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
import AdminMemberApplications from "../../pages/private/admin/AdminMemberApplications.jsx";
import AdminViewMemberApplication from "../../pages/private/admin/AdminViewMemberApplication.jsx";
import ChangePassword from "../../components/main/internal/ChangePasswordForm.jsx";
import MemberApplicationProcess from "../../pages/private/shared/MemberApplicationProcess.jsx";
import AdminDocuments from "../../pages/private/admin/AdminDocuments.jsx";
import AdminChat from "../../pages/private/admin/AdminChat.jsx";

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: (
      <SharedLayout role="admin">
        <AdminDashboard />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/activities",
    element: (
      <SharedLayout role="admin">
        <AdminActivities />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/activities/edit/:activityId",
    element: (
      <SharedLayout role="admin">
        <AdminEditActivity />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/activities/view/:activityId",
    element: (
      <SharedLayout role="admin">
        <AdminViewActivity />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/activities/add",
    element: (
      <SharedLayout role="admin">
        <AdminAddActivity />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/tasks",
    element: (
      <SharedLayout role="admin">
        <AdminTasks />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/tasks/edit/:taskId",
    element: (
      <SharedLayout role="admin">
        <AdminEditTask />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/tasks/view/:taskId",
    element: (
      <SharedLayout role="admin">
        <AdminViewTask />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/tasks/add",
    element: (
      <SharedLayout role="admin">
        <AdminAddTask />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/profile",
    element: (
      <SharedLayout role="admin">
        <AdminProfile />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/users",
    element: (
      <SharedLayout role="admin">
        <AdminUsers />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/users/view/:userId",
    element: (
      <SharedLayout role="admin">
        <AdminViewUser />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/users/edit/:userId",
    element: (
      <SharedLayout role="admin">
        <AdminEditUser />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/users/add",
    element: (
      <SharedLayout role="admin">
        <AdminAddUser />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/departments",
    element: (
      <SharedLayout role="admin">
        <AdminDepartments />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/departments/add",
    element: (
      <SharedLayout role="admin">
        <AdminAddDepartment />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/departments/edit/:departmentId",
    element: (
      <SharedLayout role="admin">
        <AdminEditDepartment />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/departments/view/:departmentId",
    element: (
      <SharedLayout role="admin">
        <AdminViewDepartment />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/positions",
    element: (
      <SharedLayout role="admin">
        <AdminPositions />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/positions/add",
    element: (
      <SharedLayout role="admin">
        <AdminAddPosition />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/positions/edit/:positionId",
    element: (
      <SharedLayout role="admin">
        <AdminEditPosition />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/positions/view/:positionId",
    element: (
      <SharedLayout role="admin">
        <AdminViewPosition />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/member-applications",
    element: (
      <SharedLayout role="admin">
        <AdminMemberApplications />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/member-applications/view/:applicationId",
    element: (
      <SharedLayout role="admin">
        <AdminViewMemberApplication />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/member-applications/cv-review/:applicationId",
    element: (
      <SharedLayout role="admin">
        <MemberApplicationProcess role="admin" stage="cv-review" />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/member-applications/interview/:applicationId",
    element: (
      <SharedLayout role="admin">
        <MemberApplicationProcess role="admin" stage="interview" />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/member-applications/final-review/:applicationId",
    element: (
      <SharedLayout role="admin">
        <MemberApplicationProcess role="admin" stage="final-review" />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/change-password",
    element: (
      <SharedLayout role="admin">
        <ChangePassword />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/documents",
    element: (
      <SharedLayout role="admin">
        <AdminDocuments />
      </SharedLayout>
    ),
  },
  {
    path: "/admin/chat",
    element: (
      <SharedLayout role="admin">
        <AdminChat />
      </SharedLayout>
    ),
  },
];
