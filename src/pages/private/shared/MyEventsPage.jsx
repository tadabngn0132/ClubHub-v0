import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getActivityParticipationsByUserId } from "../../../store/slices/activityParticipationSlice";

const MyEventsPage = () => {
  // TODO: Implement My Events page to display a list of activities the student has registered for. This page will show details of each registered activity, including the title, description, date, and time. Students will also have the option to cancel their registration for any activity they no longer wish to attend. The page will fetch the student's registered activities from the backend and update in real-time as they register or cancel their participation.
  const dispatch = useDispatch();
  const { registrations } = useSelector((state) => state.activityParticipation);
  const { currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getActivityParticipationsByUserId(currentUser.id));
  }, [dispatch, currentUser.id]);

  return (
    <div>
      <h1>My Events</h1>
      <ul>
        {registrations.map((registration) => (
          <li key={registration.id}>
            <h2>{registration.activity.title}</h2>
            <p>{registration.activity.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyEventsPage;
