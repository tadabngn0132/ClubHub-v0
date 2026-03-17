import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getActivityById,
  softDeleteActivityById,
} from "../../../store/slices/activitySlice";
import { Link } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetActivityStatus } from "../../../store/slices/activitySlice";
import { useParams } from "react-router-dom";

const ModeratorViewActivity = () => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { activity, isLoading, error, activityStatus } = useSelector(
    (state) => state.activity,
  );

  useEffect(() => {
    dispatch(getActivityById(activityId));
  }, [dispatch, activityId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  const handleDelete = () => {
    dispatch(softDeleteActivityById(activityId));

    if (activityStatus === "fulfilled") {
      navigate("/moderator/activities");
      dispatch(resetActivityStatus());
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <img src={activity?.thumbnailUrl} alt={activity?.title} />
      <Link to="/moderator/activities">Back to Activities</Link>

      <div className="flex items-center justify-between">
        <h1>Name: {activity?.title}</h1>

        <div className="flex space-x-4">
          <Link to={`/moderator/activities/edit/${activityId}`}>
            Edit Activity
          </Link>
          <button onClick={handleDelete}>Delete Activity</button>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <h3>Created At: {activity?.createdAt}</h3>
        <h3>Updated At: {activity?.updatedAt}</h3>
        <h1>By: {activity?.organize?.fullname}</h1>
      </div>

      <p>Description: {activity?.description}</p>
      <p>Start Date: {activity?.startDate}</p>
      <p>End Date: {activity?.endDate}</p>
      <p>Location Type: {activity?.locationType}</p>

      {(activity?.locationType === "online" ||
        activity?.locationType === "hybrid") && (
        <>
          <p>Meeting Platform: {activity?.meetingPlatform}</p>
          <p>Meeting Link: {activity?.meetingLink}</p>
          <p>Meeting ID: {activity?.meetingId}</p>
          <p>Meeting Password: {activity?.meetingPassword}</p>
        </>
      )}

      {(activity?.locationType === "in-person" ||
        activity?.locationType === "hybrid") && (
        <>
          <p>Venue Name: {activity?.venueName}</p>
          <p>Venue Address: {activity?.venueAddress}</p>
          <p>Room number: {activity?.roomNumber}</p>
        </>
      )}

      <p>Activity Type: {activity?.activityType}</p>
      <p>Activity Status: {activity?.status}</p>

      <p>Max Participants: {activity?.maxParticipants}</p>
      <p>Current Participants: {activity?.activityParticipants?.length || 0}</p>
      <p>Registration Deadline: {activity?.registrationDeadline}</p>
      {activity?.requireRegistration === true ? (
        <p>Registration is required for this activity.</p>
      ) : (
        <p>Registration is not required for this activity.</p>
      )}

      {activity?.activityParticipants &&
      activity?.activityParticipants.length > 0 ? (
        activity?.activityParticipants.map((participant) => (
          <div key={participant.id}>
            <p>Participant Name: {participant.name}</p>
            <p>Participant Email: {participant.email}</p>
          </div>
        ))
      ) : (
        <p>No participants registered for this activity.</p>
      )}

      {activity?.isPublic === true ? (
        <p>This activity is public.</p>
      ) : (
        <p>This activity is private.</p>
      )}

      {activity?.isFeatured === true ? (
        <p>This activity is featured.</p>
      ) : (
        <p>This activity is not featured.</p>
      )}

      <p>Priority: {activity?.priority}</p>

      {activity?.images && activity?.images.length > 0 ? (
        activity?.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Activity Image ${index + 1}`}
          />
        ))
      ) : (
        <p>No images available for this activity.</p>
      )}

      {activity?.videos && activity?.videos.length > 0 ? (
        activity?.videos.map((video, index) => (
          <video key={index} controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))
      ) : (
        <p>No videos available for this activity.</p>
      )}
    </div>
  );
};

export default ModeratorViewActivity;
