import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getActivityById,
  deleteActivityById,
} from "../../../store/slices/activitySlice";
import { Link } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast, { Toaster } from "react-hot-toast";

const MemberViewActivity = ({ activityId }) => {
  const dispatch = useDispatch();
  const { activity, isLoading, error } = useSelector((state) => state.activity);

  useEffect(() => {
    dispatch(getActivityById(activityId));
  }, [dispatch, activityId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div className="flex flex-col space-y-4 p-4">
      <Toaster position="top-right" reverseOrder={false} />
      <img src={activity?.thumbnailUrl} alt={activity?.title} />
      <Link to="/member/activities">Back to Activities</Link>

      <h1>Name: {activity?.title}</h1>

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

export default MemberViewActivity;
