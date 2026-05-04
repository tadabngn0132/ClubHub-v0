import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getUserById,
  softDeleteUserById,
  hardDeleteUserById,
  unlockUserAccount,
  restoreUserById,
  resetUserError,
} from "../../../store/slices/userSlice";
import toast from "react-hot-toast";
import { getActivitiesByUserId } from "../../../store/slices/activitySlice";
import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters.js";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal.jsx";
import { getUserRole } from "../../../utils/helper.js";

const UserDetailPage = ({ role, basePath }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.user);
  const {
    activities,
    isLoading: activitiesLoading,
    error: activitiesError,
  } = useSelector((state) => state.activity);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getUserById(userId));
    dispatch(getActivitiesByUserId(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load user details");
      dispatch(resetUserError());
    }
  }, [error]);

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

  const handleDelete = () => {
    if (deleteMode === "soft") {
      dispatch(softDeleteUserById(userId));
      navigate(basePath);
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteUserById(userId));
      navigate(basePath);
    }
  };

  const handleUnlock = () => {
    dispatch(unlockUserAccount(userId));
  };

  const handleRestore = async () => {
    await dispatch(restoreUserById(userId)).unwrap();
    await dispatch(getUserById(userId)).unwrap();
  };

  if (loading.details) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-slate-300">
        <p className="rounded-xl border border-slate-700 bg-slate-900/70 px-6 py-4 text-sm md:text-base">
          No user found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <Link
            to={basePath}
            className="inline-flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-teal-400 hover:text-teal-300"
          >
            Back to Members List
          </Link>
        </div>

        <header className="rounded-3xl border border-slate-700/60 bg-slate-900/70 p-5 shadow-[0_20px_60px_-25px_rgba(15,23,42,0.85)] backdrop-blur md:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-5">
              <img
                src={user.avatarUrl || null}
                alt="Avatar"
                className="h-20 w-20 rounded-2xl border-2 border-teal-400/60 object-cover shadow-lg shadow-teal-500/20 md:h-24 md:w-24"
              />

              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                  {user.fullname}
                </h1>
                <p className="text-sm text-slate-300">{user.email}</p>
                <p className="text-sm text-slate-300">{user.phoneNumber}</p>
                <span className="mt-1 inline-flex rounded-full border border-teal-400/50 bg-teal-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-200">
                  {formatUppercaseToCapitalized(getUserRole(user))}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {role !== "MEMBER" && (
                <>
                  <Link
                    to={`${basePath}/edit/${userId}`}
                    className="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-teal-400"
                  >
                    Edit Member
                  </Link>
                  <button
                    onClick={() => handleDeleteConfigured("soft")}
                    className="rounded-xl border border-rose-400/60 bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/25"
                  >
                    Soft Delete
                  </button>
                </>
              )}

              {role === "ADMIN" && (
                <>
                  <button
                    onClick={() => handleDeleteConfigured("hard")}
                    className="rounded-xl border border-rose-600/70 bg-rose-500/20 px-4 py-2 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/35"
                  >
                    Hard Delete
                  </button>
                  <button
                    onClick={() => handleUnlock()}
                    className="rounded-xl border border-teal-400/60 bg-teal-500/15 px-4 py-2 text-sm font-semibold text-teal-200 transition hover:bg-teal-500/25"
                    disabled={user.failedLoginAttempts !== 5}
                  >
                    Unlock Account
                  </button>
                  {user.isDeleted && (
                    <button
                      onClick={() => handleRestore()}
                      className="rounded-xl border border-green-500/70 bg-green-500/20 px-4 py-2 text-sm font-semibold text-green-300 transition hover:bg-green-500/35"
                    >
                      Restore
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div
            id="basic-info"
            className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6"
          >
            <h2 className="mb-4 text-lg font-bold text-slate-100">
              Basic Information
            </h2>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <strong className="text-slate-100">Email:</strong> {user.email}
              </p>
              <p>
                <strong className="text-slate-100">Phone Number:</strong>{" "}
                {user.phoneNumber}
              </p>
              <p>
                <strong className="text-slate-100">Date of Birth:</strong>{" "}
                {user.dateOfBirth
                  ? formatDate(user.dateOfBirth)
                  : "Not specified"}
              </p>
              <p>
                <strong className="text-slate-100">Gender:</strong>{" "}
                {user.gender}
              </p>
              <p>
                <strong className="text-slate-100">Major:</strong> {user.major}
              </p>
            </div>
          </div>

          <div
            id="club-info"
            className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6"
          >
            <h2 className="mb-4 text-lg font-bold text-slate-100">
              Club Member Information
            </h2>
            <div className="space-y-2 text-sm text-slate-300">
              <p>
                <strong className="text-slate-100">Gen:</strong>{" "}
                {user.generation}
              </p>
              <p>
                <strong className="text-slate-100">Department:</strong>{" "}
                {
                  user?.userPosition?.find((up) => up.isPrimary)?.position
                    ?.department?.name
                }
              </p>
              <p>
                <strong className="text-slate-100">Role:</strong>{" "}
                {formatUppercaseToCapitalized(getUserRole(user))}
              </p>
              <p>
                <strong className="text-slate-100">Joined Date:</strong>{" "}
                {formatDate(user.joinedAt)}
              </p>
              <p>
                <strong className="text-slate-100">Status:</strong>{" "}
                {formatUppercaseToCapitalized(user.status)}
              </p>
            </div>
          </div>
        </section>

        <section
          id="profile-info"
          className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6"
        >
          <h2 className="mb-3 text-lg font-bold text-slate-100">
            Profile Information
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            {user.bio || "No bio available."}
          </p>
        </section>

        <section
          id="activity-summary"
          className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6"
        >
          <h2 className="mb-4 text-lg font-bold text-slate-100">
            Activity Summary
          </h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Events Participated
              </p>
              <p className="mt-1 text-2xl font-bold text-teal-300">
                {activities.length}
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Meetings Attended
              </p>
              <p className="mt-1 text-2xl font-bold text-cyan-300">
                {
                  activities.filter((activity) => activity.type === "meeting")
                    .length
                }
              </p>
            </div>
            <div className="rounded-xl border border-slate-700 bg-slate-800/70 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Tasks Completed
              </p>
              <p className="mt-1 text-2xl font-bold text-amber-300">
                {
                  activities.filter((activity) => activity.type === "task")
                    .length
                }
              </p>
            </div>
          </div>
        </section>

        <section
          id="recent-activities-list"
          className="grid gap-6 lg:grid-cols-2"
        >
          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold text-slate-100">
              Recent Activities
            </h2>
            {activitiesLoading ? (
              <p className="text-sm text-slate-400">Loading activities...</p>
            ) : activitiesError ? (
              <p className="text-sm text-rose-300">{activitiesError}</p>
            ) : (
              <ul className="space-y-3">
                {activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-4"
                  >
                    <h3 className="font-semibold text-slate-100">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      {activity.description}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      <strong className="text-slate-300">Date:</strong>{" "}
                      {formatDate(activity.date)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
            <h2 className="mb-4 text-lg font-bold text-slate-100">
              Recent CF Tasks
            </h2>
            {activitiesLoading ? (
              <p className="text-sm text-slate-400">Loading activities...</p>
            ) : activitiesError ? (
              <p className="text-sm text-rose-300">{activitiesError}</p>
            ) : (
              <ul className="space-y-3">
                {activities.map((activity) => (
                  <li
                    key={activity.id}
                    className="rounded-xl border border-slate-700 bg-slate-800/70 p-4"
                  >
                    <h3 className="font-semibold text-slate-100">
                      {activity.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">
                      {activity.description}
                    </p>
                    <p className="mt-2 text-xs text-slate-400">
                      <strong className="text-slate-300">Date:</strong>{" "}
                      {formatDate(activity.date)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <ConfirmationModal
          open={isConfirmationModalOpen}
          title="Confirm Deletion"
          message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this user?`}
          variant={deleteMode === "soft" ? "warning" : "danger"}
          confirmButtonText="Delete"
          cancelButtonText="Cancel"
          onCancel={handleCloseConfirmationModal}
          onConfirm={() => handleDelete()}
        />
      </div>
    </div>
  );
};

export default UserDetailPage;
