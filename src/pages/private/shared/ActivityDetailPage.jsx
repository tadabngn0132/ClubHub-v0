import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  getActivityById,
  softDeleteActivityById,
  hardDeleteActivityById,
  createNewActivityImage,
  createNewActivityVideo,
  restoreAnActivityById,
  resetActivityError,
} from "../../../store/slices/activitySlice";
import {
  createNewActivityParticipation,
  deleteActivityParticipation,
  resetActivityParticipationError,
} from "../../../store/slices/activityParticipationSlice.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import ActivityMediaForm from "../../../components/main/internal/ActivityMediaForm.jsx";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";

const ActivityDetailPage = ({ role, basePath, permissions }) => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const {
    activity,
    isLoading: isActivityLoading,
    error: activityError,
  } = useSelector((state) => state.activity);
  const { isLoading: isParticipationsLoading, error: participationError } =
    useSelector((state) => state.activityParticipation);
  const { currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getActivityById(activityId));
  }, [dispatch, activityId]);

  useEffect(() => {
    if (activityError || participationError) {
      toast.error(activityError || participationError);
      dispatch(resetActivityError());
      dispatch(resetActivityParticipationError());
    }
  }, [activityError, participationError]);

  if (isActivityLoading) {
    return <Loading />;
  }

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (mode) => {
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = async () => {
    if (deleteMode === "soft") {
      await dispatch(softDeleteActivityById(activityId)).unwrap();
      navigate(basePath);
    } else if (deleteMode === "hard") {
      await dispatch(hardDeleteActivityById(activityId)).unwrap();
      navigate(basePath);
    }
  };

  const handleDeleteParticipation = async (participationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel your registration for this activity?",
    );

    if (confirmed) {
      await dispatch(deleteActivityParticipation(participationId)).unwrap();
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

  const handleDisableRegistrationButton = () => {
    if (activity?.requireRegistration === false) {
      return true;
    }

    if (
      activity?.registrationDeadline &&
      new Date() > new Date(activity.registrationDeadline)
    ) {
      return true;
    }

    if (
      activity?.maxParticipants &&
      activity?.activityParticipations?.length >= activity.maxParticipants
    ) {
      return true;
    }

    if (
      activity?.activityParticipations?.some(
        (p) => p.userId === currentUser.id && p.status === "REGISTERED",
      )
    ) {
      return true;
    }
    return false;
  };

  const handleRegister = async () => {
    await dispatch(
      createNewActivityParticipation({ activityId, userId: currentUser.id }),
    ).unwrap();
  };

  const handleRestore = async () => {
    await dispatch(restoreAnActivityById(activityId)).unwrap();
    await dispatch(getActivityById(activityId)).unwrap();
  };

  const formatDateTime = (date) => {
    if (!date) return "N/A";
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) return date;
    return parsedDate.toLocaleString("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const normalizeText = (text) => {
    if (!text) return "N/A";
    return String(text).replace(/_/g, " ");
  };

  const statusChipStyles = {
    DRAFT: "border-zinc-500/60 bg-zinc-500/20 text-zinc-200",
    UPCOMING: "border-cyan-500/60 bg-cyan-500/20 text-cyan-200",
    ONGOING: "border-sky-500/60 bg-sky-500/20 text-sky-200",
    COMPLETED: "border-emerald-500/60 bg-emerald-500/20 text-emerald-200",
    CANCELLED: "border-rose-500/60 bg-rose-500/20 text-rose-200",
  };

  const participants = activity?.activityParticipations || [];
  const isRegistrationDisabled = handleDisableRegistrationButton();
  const isCompleted = activity?.status === "COMPLETED";
  const isOnlineOrHybrid =
    activity?.locationType === "online" || activity?.locationType === "hybrid";
  const isInPersonOrHybrid =
    activity?.locationType === "in-person" ||
    activity?.locationType === "hybrid";

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 top-14 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-24 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6">
        <Link
          to={basePath}
          className="inline-flex w-max items-center rounded-full border border-zinc-500/70 bg-zinc-900/70 px-4 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-cyan-400/80 hover:text-cyan-200"
        >
          Back to Activities
        </Link>

        <section className="overflow-hidden rounded-2xl border border-zinc-700/60 bg-zinc-950/50 backdrop-blur">
          <div className="h-52 w-full sm:h-64 lg:h-80">
            {activity?.avatarUrl ? (
              <img
                src={activity?.avatarUrl}
                alt="Avatar"
                className="flex h-full w-full shrink-0 items-center justify-center rounded-2xl border border-pink-400/30 bg-pink-500/10 text-8xl font-bold text-pink-100"
              />
            ) : (
              <div className="flex h-full w-full shrink-0 items-center justify-center rounded-2xl border border-pink-400/30 bg-pink-500/10 text-8xl font-bold text-pink-100">
                {(activity?.title || "").slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${statusChipStyles[activity?.status] || "border-zinc-500/60 bg-zinc-500/20 text-zinc-100"}`}
                >
                  {normalizeText(activity?.status)}
                </span>
                <span className="rounded-full border border-amber-500/60 bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-200">
                  {normalizeText(activity?.type)}
                </span>
                <span className="rounded-full border border-violet-500/60 bg-violet-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-violet-200">
                  Priority: {String(activity?.priority)}
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                {activity?.title || "Activity detail"}
              </h1>
              <p className="mt-3 whitespace-pre-line text-sm leading-6 text-zinc-300">
                {activity?.description || "No description available."}
              </p>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                <p className="rounded-lg border border-zinc-700 bg-zinc-900/60 p-3">
                  <span className="font-semibold text-zinc-400">By:</span>{" "}
                  {activity?.organizer?.fullname || "N/A"}
                </p>
                <p className="rounded-lg border border-zinc-700 bg-zinc-900/60 p-3">
                  <span className="font-semibold text-zinc-400">
                    Location:
                  </span>{" "}
                  {activity?.locationType === "online" ? "Online" : activity?.locationType === "in_person" ? activity?.venueName : activity?.locationType === "hybrid" ? `${activity?.venueName} and Online` : "N/A"}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Quick Actions
              </h2>
              <div className="flex flex-wrap gap-2">
                {permissions?.canEdit && (
                  <Link
                    to={`${basePath}/edit/${activityId}`}
                    className="rounded-lg bg-cyan-500/20 px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-cyan-500/35"
                  >
                    Edit Activity
                  </Link>
                )}

                {role !== "MEMBER" && (
                  <>
                    <Link
                      to={`${basePath}/${activityId}/participants`}
                      className="rounded-lg bg-blue-500/20 px-3 py-2 text-sm font-medium text-blue-200 transition hover:bg-blue-500/35"
                    >
                      View Participants
                    </Link>
                    <button
                      onClick={() => handleDeleteConfigured("soft")}
                      className="rounded-lg bg-amber-500/20 px-3 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-500/35"
                    >
                      Soft Delete
                    </button>
                  </>
                )}

                {role === "ADMIN" && (
                  <>
                    <button
                      onClick={() => handleDeleteConfigured("hard")}
                      className="rounded-lg bg-rose-500/20 px-3 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/35"
                    >
                      Hard Delete
                    </button>
                    {activity?.isDeleted && (
                      <button
                        onClick={handleRestore}
                        className="rounded-lg bg-yellow-500/20 px-3 py-2 text-sm font-medium text-yellow-200 transition hover:bg-yellow-500/35"
                      >
                        Restore
                      </button>
                    )}
                  </>
                )}

                <button
                  onClick={handleRegister}
                  disabled={isRegistrationDisabled || isParticipationsLoading}
                  className="rounded-lg bg-emerald-500/20 px-3 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-500/35 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {isParticipationsLoading
                    ? "Registering..."
                    : "Register for Activity"}
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-zinc-300">
                <p className="rounded-md border border-zinc-700 bg-zinc-950/70 p-2">
                  Created: {formatDateTime(activity?.createdAt)}
                </p>
                <p className="rounded-md border border-zinc-700 bg-zinc-950/70 p-2">
                  Updated: {formatDateTime(activity?.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Schedule & Capacity
            </h2>
            <div className="space-y-2 text-sm text-zinc-200">
              <p>
                <span className="font-semibold text-zinc-400">Start Date:</span>{" "}
                {formatDateTime(activity?.startDate)}
              </p>
              <p>
                <span className="font-semibold text-zinc-400">End Date:</span>{" "}
                {formatDateTime(activity?.endDate)}
              </p>
              <p>
                <span className="font-semibold text-zinc-400">
                  Registration Deadline:
                </span>{" "}
                {formatDateTime(activity?.registrationDeadline)}
              </p>
              <p>
                <span className="font-semibold text-zinc-400">
                  Max Participants:
                </span>{" "}
                {activity?.maxParticipants || "Unlimited"}
              </p>
              <p>
                <span className="font-semibold text-zinc-400">
                  Current Participants:
                </span>{" "}
                {participants.length}
              </p>
              <p>
                <span className="font-semibold text-zinc-400">
                  Registration:
                </span>{" "}
                {activity?.requireRegistration
                  ? "Required for this activity"
                  : "Not required"}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Visibility
            </h2>
            <div className="space-y-2 text-sm text-zinc-200">
              <p>
                <span className="font-semibold text-zinc-400">Public:</span>{" "}
                {activity?.isPublic ? "Yes" : "No"}
              </p>
              <p>
                <span className="font-semibold text-zinc-400">Featured:</span>{" "}
                {activity?.isFeatured ? "Yes" : "No"}
              </p>
            </div>

            {isOnlineOrHybrid && (
              <div className="mt-4 rounded-lg border border-cyan-600/40 bg-cyan-600/10 p-3 text-sm text-cyan-100">
                <h3 className="mb-2 font-semibold uppercase tracking-wide text-cyan-300">
                  Online Details
                </h3>
                <p>Platform: {activity?.meetingPlatform || "N/A"}</p>
                <p>
                  Meeting Link:{" "}
                  {activity?.meetingLink ? (
                    <a
                      href={activity.meetingLink}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-cyan-300/40 underline-offset-2 hover:text-cyan-200"
                    >
                      Join now
                    </a>
                  ) : (
                    "N/A"
                  )}
                </p>
                <p>Meeting ID: {activity?.meetingId || "N/A"}</p>
                <p>Meeting Password: {activity?.meetingPassword || "N/A"}</p>
              </div>
            )}

            {isInPersonOrHybrid && (
              <div className="mt-4 rounded-lg border border-orange-600/40 bg-orange-600/10 p-3 text-sm text-orange-100">
                <h3 className="mb-2 font-semibold uppercase tracking-wide text-orange-300">
                  In-person Details
                </h3>
                <p>Venue Name: {activity?.venueName || "N/A"}</p>
                <p>Venue Address: {activity?.venueAddress || "N/A"}</p>
                <p>Room Number: {activity?.roomNumber || "N/A"}</p>
              </div>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Participants ({participants.length})
          </h2>

          {participants.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="rounded-lg border border-zinc-700 bg-zinc-950/60 p-3"
                >
                  <p className="font-semibold text-zinc-100">
                    {participant.name || "Unknown member"}
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">
                    {participant.email || "N/A"}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {participant.phoneNumber || "N/A"}
                  </p>

                  {role === "ADMIN" && (
                    <button
                      onClick={() => handleDeleteParticipation(participant.id)}
                      className="mt-3 rounded-md bg-rose-500/20 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-rose-200 transition hover:bg-rose-500/35"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/60 p-4 text-sm text-zinc-400">
              No participants registered for this activity.
            </p>
          )}
        </section>

        <section className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Activity Images
          </h2>
          {activity?.images?.length > 0 && isCompleted ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {activity.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Activity Image ${index + 1}`}
                  className="h-48 w-full rounded-lg border border-zinc-700 object-cover"
                />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/60 p-4 text-sm text-zinc-400">
              No images available for this activity.
            </p>
          )}
        </section>

        <section className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
            Activity Videos
          </h2>
          {activity?.videos?.length > 0 && isCompleted ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {activity.videos.map((video, index) => (
                <video
                  key={index}
                  controls
                  className="h-64 w-full rounded-lg border border-zinc-700 bg-black object-cover"
                >
                  <source src={video.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-zinc-700 bg-zinc-950/60 p-4 text-sm text-zinc-400">
              No videos available for this activity.
            </p>
          )}
        </section>

        {role !== "MEMBER" && (
          <section className="rounded-xl border border-zinc-700 bg-zinc-900/70 p-4">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Upload Activity Media
            </h2>
            <ActivityMediaForm
              onImagesSubmit={handleImagesSubmit}
              onVideosSubmit={handleVideosUploading}
            />
          </section>
        )}
      </div>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this activity?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default ActivityDetailPage;
