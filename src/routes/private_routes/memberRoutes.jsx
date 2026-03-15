import MemberLayout from "../../components/layout/member/MemberLayout.jsx";
import MemberDashboard from "../../pages/private/member/MemberDashboard.jsx";
import MemberActivities from "../../pages/private/member/MemberActivities.jsx";
import MemberSchedule from "../../pages/private/member/MemberSchedule.jsx";
import MemberTasks from "../../pages/private/member/MemberTasks.jsx";
import MemberProfile from "../../pages/private/member/MemberProfile.jsx";
import MemberViewActivity from "../../pages/private/member/MemberViewActivity.jsx";
import MemberViewTask from "../../pages/private/member/MemberViewTask.jsx";

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
    path: "/member/schedule",
    element: (
      <MemberLayout>
        <MemberSchedule />
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
    path: "/member/profile",
    element: (
      <MemberLayout>
        <MemberProfile />
      </MemberLayout>
    ),
  },
];
