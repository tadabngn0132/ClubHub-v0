import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkInActivityParticipant,
  markActivityParticipantNoShow,
  getActivityParticipationsByActivityId,
  resetActivityParticipantStatus,
  resetActivityParticipationError,
} from "../../../store/slices/activityParticipationSlice";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { getUserRole } from "../../../utils/helper";

const ParticipantsPage = () => {
  const dispatch = useDispatch();
  const { activityId } = useParams();
  const { currentUser } = useSelector((state) => state.auth);
  const { registrations, isLoading, error } = useSelector(
    (state) => state.activityParticipation,
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchValue, setSearchValue] = useState("");

  const safeRegistrations = registrations || [];

  useEffect(() => {
    dispatch(getActivityParticipationsByActivityId(activityId));
  }, [dispatch, activityId]);

  useEffect(() => {
    if (error) {
      toast.error(
        error.message || "An error occurred while fetching participant data.",
      );
      dispatch(resetActivityParticipationError());
    }
  }, [dispatch, error]);

  const filteredRegistrations = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    return safeRegistrations.filter((participant) => {
      const statusMatched =
        statusFilter === "all" ||
        (statusFilter === "registered" &&
          participant.status === "REGISTERED") ||
        (statusFilter === "checked-in" && participant.status === "ATTENDED") ||
        (statusFilter === "no-show" && participant.status === "ABSENT") ||
        (statusFilter === "cancelled" && participant.status === "CANCELLED");

      const name = participant.participantName || "";
      const email = participant.participantEmail || "";
      const searchMatched =
        normalizedSearch.length === 0 ||
        name.toLowerCase().includes(normalizedSearch) ||
        email.toLowerCase().includes(normalizedSearch);

      return statusMatched && searchMatched;
    });
  }, [safeRegistrations, statusFilter, searchValue]);

  const statsCards = [
    {
      title: "Total Participants",
      value: safeRegistrations.length,
      styles: "border-cyan-500/50 bg-cyan-500/10 text-cyan-200",
    },
    {
      title: "Checked-In",
      value: safeRegistrations.filter((p) => p.status === "ATTENDED").length,
      styles: "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
    },
    {
      title: "No-Shows",
      value: safeRegistrations.filter((p) => p.status === "ABSENT").length,
      styles: "border-rose-500/50 bg-rose-500/10 text-rose-200",
    },
  ];

  const getStatusClassName = (status) => {
    if (status === "ATTENDED") {
      return "border-emerald-500/50 bg-emerald-500/20 text-emerald-200";
    }

    if (status === "ABSENT") {
      return "border-rose-500/50 bg-rose-500/20 text-rose-200";
    }

    if (status === "CANCELLED") {
      return "border-zinc-500/50 bg-zinc-500/20 text-zinc-200";
    }

    return "border-amber-500/50 bg-amber-500/20 text-amber-200";
  };

  const exportToCsv = () => {
    if (filteredRegistrations.length === 0) {
      toast.error("No participant data available to export.");
      return;
    }

    const header = ["Name", "Email", "Status"];
    const rows = filteredRegistrations.map((p) => [
      p.participantName || "N/A",
      p.participantEmail || "N/A",
      p.status || "N/A",
    ]);

    const csvContent = [header, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `participants-${activityId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const userRole = getUserRole(currentUser);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-hidden">
      <Link
        to={`/${userRole}/activities/view/${activityId}`}
        className="inline-flex w-max items-center rounded-full border border-zinc-500/70 bg-zinc-900/70 mb-4 px-4 py-1.5 text-sm font-medium text-zinc-200 transition hover:border-cyan-400/80 hover:text-cyan-200"
      >
        Back to Activity Details
      </Link>

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5">
        <header className="rounded-2xl border border-zinc-700/60 bg-zinc-950/50 p-4 backdrop-blur sm:p-5">
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Participants Management
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">
            Manage attendance for this activity, track check-in status, and
            export filtered participant data.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {statsCards.map((card, index) => (
            <div key={index} className={`rounded-xl border p-4 ${card.styles}`}>
              <h2 className="text-xs font-semibold uppercase tracking-wide opacity-90">
                {card.title}
              </h2>
              <p className="mt-2 text-3xl font-black leading-none">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <section className="rounded-2xl border border-zinc-700 bg-zinc-900/70 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 outline-none transition focus:border-cyan-400"
              >
                <option value="all">All statuses</option>
                <option value="registered">Registered</option>
                <option value="checked-in">Checked-In</option>
                <option value="no-show">No-Shows</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <input
                type="text"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                placeholder="Search by name or email..."
                className="min-w-[240px] rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 outline-none transition focus:border-cyan-400"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-lg bg-zinc-700/60 px-3 py-2 text-sm font-medium text-zinc-200 opacity-70"
                disabled
              >
                Bulk Attended
              </button>
              <button
                type="button"
                className="rounded-lg bg-zinc-700/60 px-3 py-2 text-sm font-medium text-zinc-200 opacity-70"
                disabled
              >
                Bulk Absent
              </button>
              <button
                type="button"
                onClick={exportToCsv}
                className="rounded-lg bg-cyan-500/20 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/35"
              >
                Export CSV
              </button>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-700">
            <table className="min-w-full divide-y divide-zinc-700 text-left text-sm">
              <thead className="bg-zinc-900/80 text-xs uppercase tracking-wide text-zinc-400">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800 bg-zinc-950/50 text-zinc-200">
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((participation) => (
                    <tr key={participation.id} className="hover:bg-zinc-900/60">
                      <td className="px-4 py-3 font-medium text-zinc-100">
                        {participation.participantName || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-zinc-300">
                        {participation.participantEmail || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusClassName(participation.status)}`}
                        >
                          {participation.status || "UNKNOWN"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              dispatch(
                                checkInActivityParticipant(participation.id),
                              )
                            }
                            className="rounded-md bg-emerald-500/20 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:bg-emerald-500/35"
                          >
                            Attended
                          </button>
                          <button
                            onClick={() =>
                              dispatch(
                                markActivityParticipantNoShow(participation.id),
                              )
                            }
                            className="rounded-md bg-rose-500/20 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-rose-200 transition hover:bg-rose-500/35"
                          >
                            Absent
                          </button>
                          <button
                            onClick={() =>
                              dispatch(
                                resetActivityParticipantStatus(
                                  participation.id,
                                ),
                              )
                            }
                            className="rounded-md bg-amber-500/20 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-200 transition hover:bg-amber-500/35"
                          >
                            Reset
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-8 text-center text-sm text-zinc-400"
                    >
                      No participants match the current filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ParticipantsPage;
