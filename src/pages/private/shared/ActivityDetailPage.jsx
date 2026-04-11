import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getActivityById,
  softDeleteActivityById,
  hardDeleteActivityById,
  createNewActivityImage,
  createNewActivityVideo,
  resetActivityError,
} from "../../../store/slices/activitySlice";
import { Link } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { resetActivityStatus } from "../../../store/slices/activitySlice";
import { useParams } from "react-router-dom";
import ActivityMediaForm from "../../../components/main/internal/ActivityMediaForm.jsx";

const ActivityDetailPage = ({ role, basePath, permissions }) => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const { activity, isLoading, error, activityStatus } = useSelector(
    (state) => state.activity,
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getActivityById(activityId));
  }, [dispatch, activityId]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetActivityError());
    }
  }, [error]);

  if (isLoading) {
    return <Loading />;
  }

  const handleDelete = () => {
    if (permissions?.canSoftDelete) {
      const softConfirmed = window.confirm(
        "Do you want to deactivate this activity?",
      );

      if (softConfirmed) {
        dispatch(softDeleteActivityById(activityId));
        return;
      }
    }

    if (permissions?.canHardDelete) {
      const hardConfirmed = window.confirm(
        "Do you want to permanently delete this activity? This action cannot be undone.",
      );

      if (hardConfirmed) {
        dispatch(hardDeleteActivityById(activityId));
      }
    }

    if (activityStatus === "fulfilled") {
      navigate(basePath);
      dispatch(resetActivityStatus());
    }
  };

  const handleVideosUploading = async (videos) => {
    if (videos && videos.length > 0) {
      const uploadedVideos = videos.map(async (video) => {
        try {
          if (!video.type.startsWith("video/")) {
            toast.error(`File ${video.name} is not a valid video format.`);
            return;
          }

          if (video.size > 100 * 1024 * 1024) {
            // 100MB limit
            toast.error(`Video ${video.name} exceeds the 100MB size limit.`);
            return;
          }

          const formData = new FormData();
          formData.append("video", video);
          formData.append("upload_preset", "clubhub_activity_videos_unsigned");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dztrteakz/video/upload",
            {
              method: "POST",
              body: formData,
            },
          );

          const resData = await response.json();

          return dispatch(
            createNewActivityVideo({ activityId, videoData: resData }),
          );
        } catch (error) {
          console.error("Error uploading video:", error);
          toast.error("Failed to upload video. Please try again.");
        }
      });

      await Promise.all(uploadedVideos);
    }
  };

  const handleImagesSubmit = async (images) => {
    if (images && images.length > 0) {
      const uploadedImages = images.map(async (image) => {
        try {
          if (!image.type.startsWith("image/")) {
            toast.error(`File ${image.name} is not a valid image format.`);
            return;
          }

          if (image.size > 5 * 1024 * 1024) {
            // 5MB limit
            toast.error(`Image ${image.name} exceeds the 5MB size limit.`);
            return;
          }

          const formData = new FormData();
          formData.append("image", image);
          formData.append("upload_preset", "clubhub_activity_images_unsigned");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dztrteakz/image/upload",
            {
              method: "POST",
              body: formData,
            },
          );

          const resData = await response.json();
          return dispatch(
            createNewActivityImage({ activityId, imageData: resData }),
          );
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image. Please try again.");
        }
      });

      await Promise.all(uploadedImages);
    }
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <img src={activity?.thumbnailUrl} alt={activity?.title} />
      <Link to={basePath}>Back to Activities</Link>

      <div className="flex items-center justify-between">
        <h1>Name: {activity?.title}</h1>

        <div className="flex space-x-4">
          {permissions?.canEdit && (
            <Link to={`${basePath}/edit/${activityId}`}>Edit Activity</Link>
          )}
          {role !== "MEMBER" && (
            <button onClick={handleDelete}>Delete Activity</button>
          )}
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

      <ActivityMediaForm
        onImagesSubmit={handleImagesSubmit}
        onVideosSubmit={handleVideosUploading}
      />
    </div>
  );
};

export default ActivityDetailPage;
