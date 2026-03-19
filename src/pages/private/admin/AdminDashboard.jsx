import { useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import { getUsersList, resetUserStatus } from "../../../store/slices/userSlice.js";
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
import toast from "react-hot-toast";

const AdminDashboard = () => {
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

  if (userLoading || tasksLoading || activitiesLoading || memberApplicationsLoading) {
    return <Loading />;
  }

  if (userError || tasksError || activitiesError || memberApplicationsError) {
    toast.error(
      userError || tasksError || activitiesError || memberApplicationsError,
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-lg">Welcome, {currentUser?.fullname || "Admin"}!</p>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>Total Users: {userLoading ? "Loading..." : users.length}</p>
        <p>Total Tasks: {tasksLoading ? "Loading..." : tasks.length}</p>
        <p>
          Total Activities:{" "}
          {activitiesLoading ? "Loading..." : activities.length}
        </p>
        <p>
          Total Member Applications:{" "}
          {memberApplicationsLoading ? "Loading..." : memberApplications.length}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Activities</h2>
        {activitiesLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {activities.slice(0, 5).map((activity) => (
              <li key={activity.id}>{activity.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Tasks</h2>
        {tasksLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {tasks.slice(0, 5).map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Member Applications</h2>
        {memberApplicationsLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {memberApplications.slice(0, 5).map((application) => (
              <li key={application.id}>{application.applicantName}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Admin Actions</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => dispatch(getUsersList())}>
          Refresh Users
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => dispatch(getAllTasksList())}>
          Refresh Tasks
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => dispatch(getActivitiesList())}>
          Refresh Activities
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => dispatch(getAllMemberApplicationsList())}>
          Refresh Member Applications
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Admin Tools</h2>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => navigate("/admin/users")}>
          Manage Users
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => navigate("/admin/tasks")}>
          Manage Tasks
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => navigate("/admin/activities")}>
          Manage Activities
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={() => navigate("/admin/member-applications")}>
          Manage Member Applications
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
