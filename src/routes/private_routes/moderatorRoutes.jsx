import SharedLayout from "../../components/layout/internal/SharedLayout.jsx";
import ModeratorDashboard from "../../pages/private/moderator/ModeratorDashboard.jsx";
import ModeratorActivities from "../../pages/private/moderator/ModeratorActivities.jsx";
import ModeratorTasks from "../../pages/private/moderator/ModeratorTasks.jsx";
import ModeratorProfile from "../../pages/private/moderator/ModeratorProfile.jsx";
import ModeratorEditActivity from "../../pages/private/moderator/ModeratorEditActivity.jsx";
import ModeratorViewActivity from "../../pages/private/moderator/ModeratorViewActivity.jsx";
import ModeratorAddActivity from "../../pages/private/moderator/ModeratorAddActivity.jsx";
import ModeratorEditTask from "../../pages/private/moderator/ModeratorEditTask.jsx";
import ModeratorViewTask from "../../pages/private/moderator/ModeratorViewTask.jsx";
import ModeratorAddTask from "../../pages/private/moderator/ModeratorAddTask.jsx";
import ModeratorUsers from "../../pages/private/moderator/ModeratorUsers.jsx";
import ModeratorViewUser from "../../pages/private/moderator/ModeratorViewUser.jsx";
import ModeratorDepartments from "../../pages/private/moderator/ModeratorDepartments.jsx";
import ModeratorViewDepartment from "../../pages/private/moderator/ModeratorViewDepartment.jsx";
import ModeratorPositions from "../../pages/private/moderator/ModeratorPositions.jsx";
import ModeratorViewPosition from "../../pages/private/moderator/ModeratorViewPosition.jsx";
import ModeratorMemberApplications from "../../pages/private/moderator/ModeratorMemberApplications.jsx";
import ModeratorViewMemberApplication from "../../pages/private/moderator/ModeratorViewMemberApplication.jsx";
import ChangePassword from "../../components/main/internal/ChangePasswordForm.jsx";
import ModeratorAddUser from "../../pages/private/moderator/ModeratorAddUser.jsx";
import ModeratorEditUser from "../../pages/private/moderator/ModeratorEditUser.jsx";
import MemberApplicationProcess from "../../pages/private/shared/MemberApplicationProcess.jsx";
import ModeratorChat from "../../pages/private/moderator/ModeratorChat.jsx";
import NotFoundError from "../../components/layout/internal/NotFoundError.jsx";
import ForbiddenError from "../../components/layout/internal/ForbiddenError.jsx";
import ModeratorActivityParticipants from "../../pages/private/moderator/ModeratorActivityParticipants.jsx";

export const moderatorRoutes = [
  {
    path: "/moderator/dashboard",
    element: (
      <SharedLayout role="moderator">
        <ModeratorDashboard />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/activities",
    element: (
      <SharedLayout role="moderator">
        <ModeratorActivities />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/activities/:activityId/participants",
    element: (
      <SharedLayout role="moderator">
        <ModeratorActivityParticipants />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/activities/edit/:activityId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorEditActivity />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/activities/view/:activityId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorViewActivity />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/activities/add",
    element: (
      <SharedLayout role="moderator">
        <ModeratorAddActivity />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/tasks",
    element: (
      <SharedLayout role="moderator">
        <ModeratorTasks />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/tasks/edit/:taskId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorEditTask />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/tasks/view/:taskId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorViewTask />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/tasks/add",
    element: (
      <SharedLayout role="moderator">
        <ModeratorAddTask />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/profile",
    element: (
      <SharedLayout role="moderator">
        <ModeratorProfile />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/users",
    element: (
      <SharedLayout role="moderator">
        <ModeratorUsers />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/users/view/:userId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorViewUser />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/users/add",
    element: (
      <SharedLayout role="moderator">
        <ModeratorAddUser />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/users/edit/:userId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorEditUser />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/departments",
    element: (
      <SharedLayout role="moderator">
        <ModeratorDepartments />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/departments/view/:departmentId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorViewDepartment />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/positions",
    element: (
      <SharedLayout role="moderator">
        <ModeratorPositions />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/positions/view/:positionId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorViewPosition />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/member-applications",
    element: (
      <SharedLayout role="moderator">
        <ModeratorMemberApplications />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/member-applications/view/:applicationId",
    element: (
      <SharedLayout role="moderator">
        <ModeratorViewMemberApplication />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/member-applications/cv-review/:applicationId",
    element: (
      <SharedLayout role="moderator">
        <MemberApplicationProcess role="moderator" stage="cv-review" />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/member-applications/interview/:applicationId",
    element: (
      <SharedLayout role="moderator">
        <MemberApplicationProcess role="moderator" stage="interview" />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/member-applications/final-review/:applicationId",
    element: (
      <SharedLayout role="moderator">
        <MemberApplicationProcess role="moderator" stage="final-review" />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/change-password",
    element: (
      <SharedLayout role="moderator">
        <ChangePassword />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/chat",
    element: (
      <SharedLayout role="moderator">
        <ModeratorChat />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/forbidden",
    element: (
      <SharedLayout role="moderator">
        <ForbiddenError role="moderator" />
      </SharedLayout>
    ),
  },
  {
    path: "/moderator/*",
    element: (
      <SharedLayout role="moderator">
        <NotFoundError role="moderator" />
      </SharedLayout>
    ),
  },
];
