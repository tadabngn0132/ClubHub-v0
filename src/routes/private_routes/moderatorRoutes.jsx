import ModeratorLayout from "../../components/layout/moderator/ModeratorLayout.jsx";
import ModeratorDashboard from "../../pages/private/moderator/ModeratorDashboard.jsx";
import ModeratorActivities from "../../pages/private/moderator/ModeratorActivities.jsx";
import ModeratorSchedule from "../../pages/private/moderator/ModeratorSchedule.jsx";
import ModeratorTasks from "../../pages/private/moderator/ModeratorTasks.jsx";
import ModeratorProfile from "../../pages/private/moderator/ModeratorProfile.jsx";
import ModeratorEditActivity from "../../pages/private/moderator/ModeratorEditActivity.jsx";
import ModeratorViewActivity from "../../pages/private/moderator/ModeratorViewActivity.jsx";
import ModeratorAddActivity from "../../pages/private/moderator/ModeratorAddActivity.jsx";
import ModeratorEditTask from "../../pages/private/moderator/ModeratorEditTask.jsx";
import ModeratorViewTask from "../../pages/private/moderator/ModeratorViewTask.jsx";
import ModeratorAddTask from "../../pages/private/moderator/ModeratorAddTask.jsx";

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
    path: "/moderator/schedule",
    element: (
      <ModeratorLayout>
        <ModeratorSchedule />
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
];
