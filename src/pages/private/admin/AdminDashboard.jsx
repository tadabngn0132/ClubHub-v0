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
import { fetchDashboardStats } from "../../../store/slices/dashboardSlice.js";
import AdminModeratorDashboard from "../../../components/main/internal/AdminModeratorDashboard.jsx";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const {
    stats,
    isLoading: statsLoading,
    error: statsError,
  } = useSelector((state) => state.dashboard);

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
    dispatch(fetchDashboardStats());
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
      title: "Total Active Users",
      value: `${stats?.userCount || 0} / ${users.length || 0}`,
      accent: "text-teal-300",
    },
    {
      title: "Total Incomplete Tasks",
      value: `${stats?.taskCount || 0} / ${tasks.length || 0}`,
      accent: "text-cyan-300",
    },
    {
      title: "Total Upcoming Activities",
      value: `${stats?.eventCount || 0} / ${activities.length || 0}`,
      accent: "text-amber-300",
    },
    {
      title: "Member Applications",
      value: `${stats?.memberApplicationCount || 0} / ${memberApplications.length || 0}`,
      accent: "text-fuchsia-300",
    },
  ];

  const actionButtonClassName =
    "rounded-xl bg-sky-500/85 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 cursor-pointer";
  const toolButtonClassName =
    "rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-400 cursor-pointer";

  return (
    <AdminModeratorDashboard
      dashboardTitle="Admin Dashboard"
      currentUserName={currentUser?.fullname}
      fallbackRoleName="Admin"
      dashboardError={dashboardError}
      summaryCards={summaryCards}
      activities={activities}
      tasks={tasks}
      memberApplications={memberApplications}
      actionsTitle="Admin Actions"
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
      toolsTitle="Admin Tools"
      tools={[
        {
          label: "Manage Users",
          className: toolButtonClassName,
          onClick: () => navigate("/admin/users"),
        },
        {
          label: "Manage Tasks",
          className: toolButtonClassName,
          onClick: () => navigate("/admin/tasks"),
        },
        {
          label: "Manage Activities",
          className: toolButtonClassName,
          onClick: () => navigate("/admin/activities"),
        },
        {
          label: "Manage Applications",
          className: toolButtonClassName,
          onClick: () => navigate("/admin/member-applications"),
        },
      ]}
    />
  );
};

export default AdminDashboard;
