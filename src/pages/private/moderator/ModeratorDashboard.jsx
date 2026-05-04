import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  getUsersList,
  resetUserStatus,
} from "../../../store/slices/userSlice.js";
import {
  getAllTasksList,
  resetTaskStatus,
} from "../../../store/slices/taskSlice.js";
import {
  getActivitiesList,
  resetActivityStatus,
} from "../../../store/slices/activitySlice.js";
import {
  getAllMemberApplicationsList,
  resetMemberApplicationStatus,
} from "../../../store/slices/memberApplicationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminModeratorDashboard from "../../../components/main/internal/AdminModeratorDashboard.jsx";

const ModeratorDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);

  // Fetch necessary data for the dashboard
  const {
    users,
    isLoading: userLoading,
    error: userError,
  } = useSelector((state) => state.user);
  const {
    tasks,
    isLoading: tasksLoading,
    error: tasksError,
  } = useSelector((state) => state.task);
  const {
    activities,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useSelector((state) => state.activity);
  const {
    memberApplications,
    isLoading: memberApplicationsLoading,
    error: memberApplicationsError,
  } = useSelector((state) => state.memberApplication);

  useEffect(() => {
    dispatch(getUsersList());
    dispatch(getAllTasksList());
    dispatch(getActivitiesList());
    dispatch(getAllMemberApplicationsList());
    dispatch(resetUserStatus());
    dispatch(resetTaskStatus());
    dispatch(resetActivityStatus());
    dispatch(resetMemberApplicationStatus());
  }, [dispatch]);

  if (
    userLoading ||
    tasksLoading ||
    activitiesLoading ||
    memberApplicationsLoading
  ) {
    return <Loading />;
  }

  const dashboardError =
    userError || tasksError || activitiesError || memberApplicationsError;

  const summaryCards = [
    {
      title: "Total Users",
      value: users.length,
      accent: "text-teal-300",
    },
    {
      title: "Total Tasks",
      value: tasks.length,
      accent: "text-cyan-300",
    },
    {
      title: "Total Activities",
      value: activities.length,
      accent: "text-amber-300",
    },
    {
      title: "Member Applications",
      value: memberApplications.length,
      accent: "text-violet-300",
    },
  ];

  const actionButtonClassName =
    "rounded-xl bg-sky-500/85 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 cursor-pointer";
  const toolButtonClassName =
    "rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 cursor-pointer";

  return (
    <AdminModeratorDashboard
      dashboardTitle="Moderator Dashboard"
      currentUserName={currentUser?.fullname}
      fallbackRoleName="Moderator"
      userRole="moderator"
      dashboardError={dashboardError}
      summaryCards={summaryCards}
      activities={activities}
      tasks={tasks}
      memberApplications={memberApplications}
      actionsTitle="Moderator Actions"
      actions={[
        {
          label: "Refresh Users",
          className: actionButtonClassName,
          onClick: () => dispatch(getUsersList()),
        },
        {
          label: "Refresh Tasks",
          className: actionButtonClassName,
          onClick: () => dispatch(getAllTasksList()),
        },
        {
          label: "Refresh Activities",
          className: actionButtonClassName,
          onClick: () => dispatch(getActivitiesList()),
        },
        {
          label: "Refresh Applications",
          className: actionButtonClassName,
          onClick: () => dispatch(getAllMemberApplicationsList()),
        },
      ]}
      toolsTitle="Moderator Tools"
      tools={[
        {
          label: "Manage Users",
          className: toolButtonClassName,
          onClick: () => navigate("/moderator/users"),
        },
        {
          label: "Manage Tasks",
          className: toolButtonClassName,
          onClick: () => navigate("/moderator/tasks"),
        },
        {
          label: "Manage Activities",
          className: toolButtonClassName,
          onClick: () => navigate("/moderator/activities"),
        },
        {
          label: "Manage Applications",
          className: toolButtonClassName,
          onClick: () => navigate("/moderator/member-applications"),
        },
      ]}
    />
  );
};

export default ModeratorDashboard;
