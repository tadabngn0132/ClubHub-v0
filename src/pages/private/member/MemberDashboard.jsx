import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserTasks, resetStatus } from "../../../store/slices/taskSlice";
import {
  getActivitiesByUserId,
  resetStatus,
} from "../../../store/slices/activitySlice";
import Loading from "../../../components/layout/internal/Loading";

const MemberDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { currentUser } = useSelector((state) => state.auth);
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

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserTasks(currentUser.id));
      dispatch(getActivitiesByUserId(currentUser.id));
    }

    if (!tasksLoading && !activitiesLoading) {
      setLoading(false);
    }

    dispatch(resetStatus());
    dispatch(resetStatus());
  }, [dispatch, currentUser]);

  if (loading) {
    return <Loading />;
  }

  if (tasksError) {
    toast.error(tasksError);
  }

  if (activitiesError) {
    toast.error(activitiesError);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Member Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">My Tasks</h2>
          {tasks.length === 0 ? (
            <p>No tasks assigned.</p>
          ) : (
            <ul>
              {tasks.map((task) => (
                <li key={task.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <span>{task.title}</span>
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => navigate(`/member/tasks/view/${task.id}`)}
                    >
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">My Activities</h2>
          {activities.length === 0 ? (
            <p>No activities joined.</p>
          ) : (
            <ul>
              {activities.map((activity) => (
                <li key={activity.id} className="mb-2">
                  <div className="flex justify-between items-center">
                    <span>{activity.name}</span>
                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() =>
                        navigate(`/member/activities/view/${activity.id}`)
                      }
                    >
                      View
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
