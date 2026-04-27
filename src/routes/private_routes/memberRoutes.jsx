import SharedLayout from "../../components/layout/internal/SharedLayout.jsx";
import MemberDashboard from "../../pages/private/member/MemberDashboard.jsx";
import MemberActivities from "../../pages/private/member/MemberActivities.jsx";
import MemberTasks from "../../pages/private/member/MemberTasks.jsx";
import MemberProfile from "../../pages/private/member/MemberProfile.jsx";
import MemberViewActivity from "../../pages/private/member/MemberViewActivity.jsx";
import MemberViewTask from "../../pages/private/member/MemberViewTask.jsx";
import MemberUsers from "../../pages/private/member/MemberUsers.jsx";
import MemberViewUser from "../../pages/private/member/MemberViewUser.jsx";
import MemberDepartments from "../../pages/private/member/MemberDepartments.jsx";
import MemberPositions from "../../pages/private/member/MemberPositions.jsx";
import ChangePassword from "../../components/main/internal/ChangePasswordForm.jsx";
import MemberChat from "../../pages/private/member/MemberChat.jsx";
import NotFoundError from "../../components/layout/internal/NotFoundError.jsx";
import ForbiddenError from "../../components/layout/internal/ForbiddenError.jsx";
import MemberSetting from "../../pages/private/member/MemberSetting.jsx";
import NotificationsPage from "../../pages/private/shared/NotificationsPage.jsx";

export const memberRoutes = [
  {
    path: "/member/dashboard",
    element: (
      <SharedLayout role="member">
        <MemberDashboard />
      </SharedLayout>
    ),
  },
  {
    path: "/member/activities",
    element: (
      <SharedLayout role="member">
        <MemberActivities />
      </SharedLayout>
    ),
  },
  {
    path: "/member/activities/view/:activityId",
    element: (
      <SharedLayout role="member">
        <MemberViewActivity />
      </SharedLayout>
    ),
  },
  {
    path: "/member/tasks",
    element: (
      <SharedLayout role="member">
        <MemberTasks />
      </SharedLayout>
    ),
  },
  {
    path: "/member/tasks/view/:taskId",
    element: (
      <SharedLayout role="member">
        <MemberViewTask />
      </SharedLayout>
    ),
  },
  {
    path: "/member/profile",
    element: (
      <SharedLayout role="member">
        <MemberProfile />
      </SharedLayout>
    ),
  },
  {
    path: "/member/users",
    element: (
      <SharedLayout role="member">
        <MemberUsers />
      </SharedLayout>
    ),
  },
  {
    path: "/member/users/view/:userId",
    element: (
      <SharedLayout role="member">
        <MemberViewUser />
      </SharedLayout>
    ),
  },
  {
    path: "/member/departments",
    element: (
      <SharedLayout role="member">
        <MemberDepartments />
      </SharedLayout>
    ),
  },
  {
    path: "/member/positions",
    element: (
      <SharedLayout role="member">
        <MemberPositions />
      </SharedLayout>
    ),
  },
  {
    path: "/member/change-password",
    element: (
      <SharedLayout role="member">
        <ChangePassword />
      </SharedLayout>
    ),
  },
  {
    path: "/member/chat",
    element: (
      <SharedLayout role="member">
        <MemberChat />
      </SharedLayout>
    ),
  },
  {
    path: "/member/setting",
    element: (
      <SharedLayout role="member">
        <MemberSetting />
      </SharedLayout>
    ),
  },
  {
    path: "/member/notifications",
    element: (
      <SharedLayout role="member">
        <NotificationsPage />
      </SharedLayout>
    ),
  },
  {
    path: "/member/forbidden",
    element: (
      <SharedLayout role="member">
        <ForbiddenError role="member" />
      </SharedLayout>
    ),
  },
  {
    path: "/member/*",
    element: (
      <SharedLayout role="member">
        <NotFoundError role="member" />
      </SharedLayout>
    ),
  },
];
