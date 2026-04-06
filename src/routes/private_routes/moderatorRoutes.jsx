import ModeratorLayout from "../../components/layout/moderator/ModeratorLayout.jsx";
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
import ModeratorAIChat from "../../pages/private/moderator/ModeratorAIChat.jsx";

export const moderatorRoutes = [
  {
    path: "/moderator/dashboard",
    element: (
      <ModeratorLayout>
        <ModeratorDashboard />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/activities",
    element: (
      <ModeratorLayout>
        <ModeratorActivities />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/activities/edit/:activityId",
    element: (
      <ModeratorLayout>
        <ModeratorEditActivity />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/activities/view/:activityId",
    element: (
      <ModeratorLayout>
        <ModeratorViewActivity />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/activities/add",
    element: (
      <ModeratorLayout>
        <ModeratorAddActivity />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/tasks",
    element: (
      <ModeratorLayout>
        <ModeratorTasks />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/tasks/edit/:taskId",
    element: (
      <ModeratorLayout>
        <ModeratorEditTask />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/tasks/view/:taskId",
    element: (
      <ModeratorLayout>
        <ModeratorViewTask />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/tasks/add",
    element: (
      <ModeratorLayout>
        <ModeratorAddTask />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/profile",
    element: (
      <ModeratorLayout>
        <ModeratorProfile />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/users",
    element: (
      <ModeratorLayout>
        <ModeratorUsers />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/users/view/:userId",
    element: (
      <ModeratorLayout>
        <ModeratorViewUser />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/users/add",
    element: (
      <ModeratorLayout>
        <ModeratorAddUser />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/users/edit/:userId",
    element: (
      <ModeratorLayout>
        <ModeratorEditUser />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/departments",
    element: (
      <ModeratorLayout>
        <ModeratorDepartments />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/departments/view/:departmentId",
    element: (
      <ModeratorLayout>
        <ModeratorViewDepartment />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/positions",
    element: (
      <ModeratorLayout>
        <ModeratorPositions />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/positions/view/:positionId",
    element: (
      <ModeratorLayout>
        <ModeratorViewPosition />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/member-applications",
    element: (
      <ModeratorLayout>
        <ModeratorMemberApplications />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/member-applications/view/:applicationId",
    element: (
      <ModeratorLayout>
        <ModeratorViewMemberApplication />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/member-applications/cv-review/:applicationId",
    element: (
      <ModeratorLayout>
        <MemberApplicationProcess role="moderator" stage="cv-review" />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/member-applications/interview/:applicationId",
    element: (
      <ModeratorLayout>
        <MemberApplicationProcess role="moderator" stage="interview" />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/member-applications/final-review/:applicationId",
    element: (
      <ModeratorLayout>
        <MemberApplicationProcess role="moderator" stage="final-review" />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/change-password",
    element: (
      <ModeratorLayout>
        <ChangePassword />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/chat",
    element: (
      <ModeratorLayout>
        <ModeratorChat />
      </ModeratorLayout>
    ),
  },
  {
    path: "/moderator/ai-chat",
    element: (
      <ModeratorLayout>
        <ModeratorAIChat />
      </ModeratorLayout>
    ),
  }
];
