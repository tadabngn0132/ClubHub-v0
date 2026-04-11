import { Link } from "react-router-dom";
import {
  getAllMemberApplicationsList,
  softDeleteMemberApplicationById,
  resetMemberApplicationStatus,
  resetMemberApplicationError,
} from "../../../store/slices/memberApplicationSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import Loading from "../../../components/layout/internal/Loading.jsx";
import toast from "react-hot-toast";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters.js";
import { MEMBER_APPLICATION_FINAL_STATUS_OPTIONS } from "../../../utils/constants";

const normalizeStatus = (value) =>
  String(value || "")
    .trim()
    .toUpperCase();

const getInterviewSummary = (application) => {
  const departmentApplications = application?.departmentApplications || [];
  const summary = {
    total: departmentApplications.length,
    pending: 0,
    passed: 0,
    failed: 0,
  };

  departmentApplications.forEach((deptApp) => {
    const status = normalizeStatus(deptApp.interviewStatus);
    if (status === "PASSED") summary.passed += 1;
    else if (status === "FAILED") summary.failed += 1;
    else summary.pending += 1;
  });

  return summary;
};

const ModeratorMemberApplications = () => {
  const dispatch = useDispatch();
  const { memberApplications, isLoading, error } = useSelector(
    (state) => state.memberApplication,
  );
  const [selectedMemberApplications, setSelectedMemberApplications] = useState(
    [],
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("applied_desc");

  useEffect(() => {
    dispatch(getAllMemberApplicationsList());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetMemberApplicationError());
    }
  }, [error]);

  const applications = memberApplications || [];
  const selectedCount = selectedMemberApplications.length;
  const isAllSelected =
    applications.length > 0 && selectedCount === applications.length;

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedMemberApplications(
        applications.map((application) => application.id),
      );
      return;
    }

    setSelectedMemberApplications([]);
  };

  const handleSelectOne = (applicationId) => {
    setSelectedMemberApplications((prev) => {
      if (prev.includes(applicationId)) {
        return prev.filter((id) => id !== applicationId);
      }

      return [...prev, applicationId];
    });
  };

  const handleDelete = (applicationId) => {
    const softConfirmed = window.confirm(
      "Do you want to deactivate this member application?",
    );

    if (softConfirmed) {
      dispatch(softDeleteMemberApplicationById(applicationId));
      return;
    }

    dispatch(resetMemberApplicationStatus());
  };

  if (isLoading) {
    return <Loading />;
  }

  const getStatusBadgeClass = (status) => {
    const normalizedStatus = String(status || "").toUpperCase();

    if (normalizedStatus === "PENDING") {
      return "border-amber-500/40 bg-amber-500/20 text-amber-300";
    }

    if (normalizedStatus === "PASSED") {
      return "border-emerald-500/40 bg-emerald-500/20 text-emerald-300";
    }

    if (normalizedStatus === "FAILED") {
      return "border-rose-500/40 bg-rose-500/20 text-rose-300";
    }

    return "border-gray-600 bg-gray-700/40 text-gray-300";
  };

  const filteredApplications = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    let result = [...applications];

    if (keyword) {
      result = result.filter((application) =>
        [
          application.fullname,
          application.email,
          application.cvStatus,
          application.finalStatus,
        ]
          .join(" ")
          .toLowerCase()
          .includes(keyword),
      );
    }

    if (statusFilter !== "all") {
      result = result.filter(
        (application) =>
          String(application.finalStatus || "").toUpperCase() === statusFilter,
      );
    }

    result.sort((a, b) => {
      if (sortBy === "name_asc") {
        return String(a.fullname || "").localeCompare(String(b.fullname || ""));
      }
      if (sortBy === "name_desc") {
        return String(b.fullname || "").localeCompare(String(a.fullname || ""));
      }
      if (sortBy === "applied_asc") {
        return new Date(a.appliedAt) - new Date(b.appliedAt);
      }
      return new Date(b.appliedAt) - new Date(a.appliedAt);
    });

    return result;
  }, [applications, searchTerm, statusFilter, sortBy]);

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setSortBy("applied_desc");
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-gray-100 md:text-3xl">
            Member Applications
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {filteredApplications.length} member applications | {selectedCount}{" "}
            selected
          </p>
        </div>

        <div className="mb-4 grid gap-3 md:grid-cols-4">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search full name, email, status..."
            className="md:col-span-2 rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[var(--pink-color)]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="all">All Final Status</option>
            {MEMBER_APPLICATION_FINAL_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {formatUppercaseToCapitalized(status)}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-100 outline-none focus:border-[var(--pink-color)]"
          >
            <option value="applied_desc">Applied Date: Newest</option>
            <option value="applied_asc">Applied Date: Oldest</option>
            <option value="name_asc">Name: A-Z</option>
            <option value="name_desc">Name: Z-A</option>
          </select>
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-sm font-medium text-gray-100 hover:border-[var(--pink-color)]"
          >
            Clear Filters
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900/90 shadow-xl">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-800 text-sm text-gray-200">
              <thead className="bg-gray-950/80 text-xs uppercase tracking-wide text-gray-400">
                <tr>
                  <th className="w-12 px-4 py-3 text-left">
                    <input
                      type="checkbox"
                      name="selectAll"
                      id="selectAll"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Application Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredApplications.map((application) => {
                  const isSelected = selectedMemberApplications.includes(
                    application.id,
                  );
                  const cvStatus = normalizeStatus(application.cvStatus);
                  const summary = getInterviewSummary(application);
                  const canInterviewRound = cvStatus === "PASSED";
                  const canFinalRound =
                    canInterviewRound &&
                    summary.total > 0 &&
                    summary.pending === 0;
                  const actionDisabledClass = "pointer-events-none opacity-40";

                  return (
                    <tr
                      key={application.id}
                      className={`transition hover:bg-gray-800/60 ${
                        isSelected ? "bg-blue-500/10" : "bg-transparent"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          name="application"
                          id={`application-${application.id}`}
                          checked={isSelected}
                          onChange={() => handleSelectOne(application.id)}
                          className="h-4 w-4 cursor-pointer rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-100">
                        {application.fullname || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {application.email || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-gray-300">
                        {formatDate(application.appliedAt) || "N/A"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${getStatusBadgeClass(application.finalStatus)}`}
                        >
                          {application.finalStatus || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Link
                            to={`/moderator/member-applications/view/${application.id}`}
                            className="rounded-md bg-sky-500/15 px-3 py-1.5 text-xs font-medium text-sky-300 transition hover:bg-sky-500/30"
                          >
                            View
                          </Link>
                          <Link
                            to={`/moderator/member-applications/cv-review/${application.id}`}
                            className="rounded-md bg-amber-500/15 px-3 py-1.5 text-xs font-medium text-amber-300 transition hover:bg-amber-500/30"
                          >
                            CV Review
                          </Link>
                          <Link
                            to={`/moderator/member-applications/interview/${application.id}`}
                            className={`rounded-md bg-blue-500/15 px-3 py-1.5 text-xs font-medium text-blue-300 transition hover:bg-blue-500/30 ${
                              canInterviewRound ? "" : actionDisabledClass
                            }`}
                            title={
                              canInterviewRound
                                ? "Interview round"
                                : "Interview round is locked until CV status is PASSED"
                            }
                          >
                            Interview Round
                          </Link>
                          <Link
                            to={`/moderator/member-applications/final-review/${application.id}`}
                            className={`rounded-md bg-green-500/15 px-3 py-1.5 text-xs font-medium text-green-300 transition hover:bg-green-500/30 ${
                              canFinalRound ? "" : actionDisabledClass
                            }`}
                            title={
                              canFinalRound
                                ? "Final round"
                                : "Final round is locked until all interview results are completed"
                            }
                          >
                            Final Round
                          </Link>
                          <button
                            onClick={() => handleDelete(application.id)}
                            className="rounded-md bg-rose-500/15 px-3 py-1.5 text-xs font-medium text-rose-300 transition hover:bg-rose-500/30"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredApplications.length === 0 && (
            <div className="border-t border-gray-800 px-4 py-10 text-center text-sm text-gray-400">
              No member applications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModeratorMemberApplications;
