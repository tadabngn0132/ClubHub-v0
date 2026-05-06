import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivityParticipationsByUserId,
  updateActivityParticipationById,
} from "../../../store/slices/activityParticipationSlice";
import Loading from "../../layout/internal/Loading";
import toast from "react-hot-toast";

const MyEvents = () => {
  const dispatch = useDispatch();
  const { registrations, isLoading, error } = useSelector(
    (state) => state.activityParticipation,
  );
  const { currentUser } = useSelector((state) => state.auth);
  const safeRegistrations = registrations || [];

  useEffect(() => {
    if (!currentUser?.id) {
      return;
    }

    dispatch(getActivityParticipationsByUserId(currentUser.id));
  }, [dispatch, currentUser?.id]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching your events.",
      );
    }
  }, [error]);

  const handleCancelRegistration = (registrationId) => {
    dispatch(
      updateActivityParticipationById({
        id: registrationId,
        participationData: { status: "cancelled" },
      }),
    );
  };

  const handleStatusBadge = (status) => {
    switch (status) {
      case "REGISTERED":
        return "bg-yellow-500/20 text-yellow-200";
      case "ATTENDED":
        return "bg-green-500/20 text-green-200";
      case "ABSENT":
        return "bg-red-500/20 text-red-200";
      case "CANCELLED":
        return "bg-rose-500/20 text-rose-200";
      default:
        return "bg-gray-500/20 text-gray-200";
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-4 text-slate-100">
      <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20">
        <h1 className="text-2xl font-bold text-white">My Events</h1>
        <p className="mt-2 text-sm text-slate-300">
          Activities that you have registered for.
        </p>
      </section>

      {safeRegistrations.length > 0 ? (
        <ul className="grid gap-4">
          {safeRegistrations.map((registration) => (
            <li
              key={registration.id}
              className="flex items-start justify-between rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20"
            >
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {registration?.activity?.title || "Untitled activity"}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {registration?.activity?.description ||
                    "No description available."}
                </p>

                <button
                  onClick={() => handleCancelRegistration(registration.id)}
                  disabled={registration.status.toLowerCase() === "cancelled"}
                  className="mt-4 rounded-lg bg-rose-500/20 px-3 py-2 text-sm font-medium text-rose-200 transition hover:bg-rose-500/35 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-rose-500/20"
                >
                  Cancel Registration
                </button>
              </div>
              <span className={`mt-2 rounded-full px-3 py-1 text-xs font-medium ${handleStatusBadge(registration.status)}`}>
                {registration.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/65 px-5 py-8 text-center text-sm text-slate-400">
          You have not registered for any activities yet.
        </div>
      )}
    </div>
  );
};

export default MyEvents;
