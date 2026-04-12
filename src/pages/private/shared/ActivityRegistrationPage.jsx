import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewActivityParticipation } from "../../../store/slices/activityParticipationSlice"

const ActivityRegistrationPage = () => {
  const dispatch = useDispatch();
  const { registrations, isLoading, error } = useSelector((state) => state.activityParticipation);

  useEffect(() => {
    // TODO: Fetch upcoming activities from the backend
  }, []);

  const handleRegister = (activityId) => {
    dispatch(createNewActivityParticipation(activityId));
  };

  // TODO: Implement activity registration page to allow students to browse and register for club activities. This page will display a list of upcoming activities, provide details about each activity, and enable students to sign up for events they are interested in. The registration process will be integrated with the backend to manage participant lists and send confirmation notifications.
  return (
    <div>
      <h1>Activity Registration</h1>
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
            <button onClick={() => handleRegister(activity.id)}>
              Register
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityRegistrationPage;
