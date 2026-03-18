import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUserById, softDeleteUserById, hardDeleteUserById } from "../../../store/slices/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { getActivitiesByUserId } from "../../../store/slices/activitySlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import { useNavigate } from "react-router-dom";
import { resetUserStatus } from "../../../store/slices/userSlice";
import { formatDate, formatUppercaseToCapitalized } from "../../../utils/formatters.js";

const AdminViewUser = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, userStatus } = useSelector(
    (state) => state.user,
  );
  const {
    activities,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useSelector((state) => state.activity);

  const handleDelete = () => {
    // Dispatch delete action here
    const softConfirmed = window.confirm(
      "Do you want to deactivate this user?",
    );

    if (softConfirmed) {
      dispatch(softDeleteUserById(userId));
      return;
    }

    const hardConfirmed = window.confirm(
      "Do you want to permanently delete this user? This action cannot be undone.",
    );

    if (hardConfirmed) {
      dispatch(hardDeleteUserById(userId));
    }

    if (userStatus === "fulfilled") {
      navigate("/admin/users");
      dispatch(resetUserStatus());
    }
  };

  useEffect(() => {
    dispatch(getUserById(userId));
    dispatch(getActivitiesByUserId(userId));
  }, [dispatch, userId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  if (!user) return <p>No user found.</p>;

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />

      <Link to="/admin/users">Back to Members List</Link>

      <header>
        <img src={user.avatarUrl} alt="Avatar" />
        <h1>Full Name: {user.fullname}</h1>
        <p>Role: {formatUppercaseToCapitalized(user.userPosition[0].position.systemRole)}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        <Link to={`/admin/users/edit/${userId}`}>Edit Member</Link>
        <button onClick={() => handleDelete()}>Delete Member</button>
      </header>

      <section id="basic-info">
        <h2>Basic Informations</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone Number:</strong> {user.phoneNumber}
        </p>
        <p>
          <strong>Date of Birth:</strong> {user.dateOfBirth ? formatDate(user.dateOfBirth) : "Not specified"}
        </p>
        <p>
          <strong>Gender:</strong> {user.gender}
        </p>
        <p>
          <strong>Major:</strong> {user.major}
        </p>
      </section>

      <section id="club-info">
        <h2>Club's Member Information</h2>
        <p>
          <strong>Gen:</strong> {user.generation}
        </p>
        <p>
          <strong>Department:</strong> {user.userPosition[0].position.department.name}
        </p>
        <p>
          <strong>Role:</strong> {formatUppercaseToCapitalized(user.userPosition[0].position.systemRole)}
        </p>
        <p>
          <strong>Joined Date:</strong> {formatDate(user.joinedDate)}
        </p>
        <p>
          <strong>Status:</strong> {formatUppercaseToCapitalized(user.status)}
        </p>
      </section>

      <section id="profile-info">
        <h2>Profile Information</h2>
        <p>{user.bio}</p>
      </section>

      <section id="activity-summary">
        <h2>Activity Summary</h2>
        <p>
          <strong>Events Participated:</strong> {activities.length}
        </p>
        <p>
          <strong>Meetings Attended:</strong>{" "}
          {
            activities.filter((activity) => activity.type === "meeting")
              .length
          }
        </p>
        {/* Get tasks from server instead of current task type activities later */}
        <p>
          <strong>Tasks Completed:</strong>{" "}
          {activities.filter((activity) => activity.type === "task").length}
        </p>
      </section>

      <section id="recent-activities-list">
        <h2>Recent Activities</h2>
        {activitiesLoading ? (
          <p>Loading activities...</p>
        ) : activitiesError ? (
          toast.error(activitiesError)
        ) : (
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {formatDate(activity.date)}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* Need to use tasks data from API instead of current activities later */}
        <h2>Recent CF Tasks</h2>
        {activitiesLoading ? (
          <p>Loading activities...</p>
        ) : activitiesError ? (
          toast.error(activitiesError)
        ) : (
          <ul>
            {activities.map((activity) => (
              <li key={activity.id}>
                <h3>{activity.title}</h3>
                <p>{activity.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {formatDate(activity.date)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default AdminViewUser;
