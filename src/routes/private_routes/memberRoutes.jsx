import MemberLayout from "../../components/layout/member/MemberLayout.jsx";
import MemberDashboard from "../../pages/private/member/MemberDashboard.jsx";
import MemberActivities from "../../pages/private/member/MemberActivities.jsx";
import MemberTasks from "../../pages/private/member/MemberTasks.jsx";
import MemberProfile from "../../pages/private/member/MemberProfile.jsx";
import MemberViewActivity from "../../pages/private/member/MemberViewActivity.jsx";
import MemberViewTask from "../../pages/private/member/MemberViewTask.jsx";
import MemberUsers from "../../pages/private/member/MemberUsers.jsx";
import MemberViewUser from "../../pages/private/member/MemberViewUser.jsx";
import MemberDepartments from "../../pages/private/member/MemberDepartments.jsx";
import MemberViewDepartment from "../../pages/private/member/MemberViewDepartment.jsx";
import MemberPositions from "../../pages/private/member/MemberPositions.jsx";
import MemberViewPosition from "../../pages/private/member/MemberViewPosition.jsx";
import ChangePassword from "../../components/main/internal/ChangePasswordForm.jsx";
import MemberEditTask from "../../pages/private/member/MemberEditTask.jsx";

export const memberRoutes = [
  {
    path: "/member/dashboard",
    element: (
      <MemberLayout>
        <MemberDashboard />
      </MemberLayout>
    ),
  },
  {
    path: "/member/activities",
    element: (
      <MemberLayout>
        <MemberActivities />
      </MemberLayout>
    ),
  },
  {
    path: "/member/activities/view/:activityId",
    element: (
      <MemberLayout>
        <MemberViewActivity />
      </MemberLayout>
    ),
  },
  {
    path: "/member/tasks",
    element: (
      <MemberLayout>
        <MemberTasks />
      </MemberLayout>
    ),
  },
  {
    path: "/member/tasks/view/:taskId",
    element: (
      <MemberLayout>
        <MemberViewTask />
      </MemberLayout>
    ),
  },
  {
    path: "/member/tasks/edit/:taskId",
    element: (
      <MemberLayout>
        <MemberEditTask />
      </MemberLayout>
    ),
  },
  {
    path: "/member/profile",
    element: (
      <MemberLayout>
        <MemberProfile />
      </MemberLayout>
    ),
  },
  {
    path: "/member/users",
    element: (
      <MemberLayout>
        <MemberUsers />
      </MemberLayout>
    ),
  },
  {
    path: "/member/users/view/:userId",
    element: (
      <MemberLayout>
        <MemberViewUser />
      </MemberLayout>
    ),
  },
  {
    path: "/member/departments",
    element: (
      <MemberLayout>
        <MemberDepartments />
      </MemberLayout>
    ),
  },
  {
    path: "/member/departments/view/:departmentId",
    element: (
      <MemberLayout>
        <MemberViewDepartment />
      </MemberLayout>
    ),
  },
  {
    path: "/member/positions",
    element: (
      <MemberLayout>
        <MemberPositions />
      </MemberLayout>
    ),
  },
  {
    path: "/member/positions/view/:positionId",
    element: (
      <MemberLayout>
        <MemberViewPosition />
      </MemberLayout>
    ),
  },
  {
    path: "/member/change-password",
    element: (
      <MemberLayout>
        <ChangePassword />
      </MemberLayout>
    ),
  },
];
