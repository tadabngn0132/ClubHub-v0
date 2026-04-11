import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading.jsx";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters";
import { getMemberApplicationDetails } from "../../../store/slices/memberApplicationSlice";
import { getDepartmentApplicationsByMemberApplication } from "../../../store/slices/departmentApplicationSlice";

const normalizeStatus = (value) =>
  String(value || "")
    .trim()
    .toUpperCase();

const badgeClass = (status) => {
  const normalized = normalizeStatus(status);

  if (normalized === "PASSED") {
    return "border-emerald-500/40 bg-emerald-500/20 text-emerald-300";
  }

  if (normalized === "FAILED") {
    return "border-rose-500/40 bg-rose-500/20 text-rose-300";
  }

  if (normalized === "PENDING") {
    return "border-amber-500/40 bg-amber-500/20 text-amber-300";
  }

  return "border-slate-600 bg-slate-700/40 text-slate-300";
};

const getInterviewSummary = (deptApplications = []) => {
  const summary = {
    total: deptApplications.length,
    pending: 0,
    passed: 0,
    failed: 0,
  };

  deptApplications.forEach((item) => {
    const status = normalizeStatus(item.interviewStatus);
    if (status === "PASSED") summary.passed += 1;
    else if (status === "FAILED") summary.failed += 1;
    else summary.pending += 1;
  });

  return summary;
};

const MemberApplicationDetailsPage = ({ role }) => {
  const { applicationId } = useParams();
  const dispatch = useDispatch();

  const { memberApplication, isLoading, error } = useSelector(
    (state) => state.memberApplication,
  );
  const {
    deptApplications,
    isLoading: deptLoading,
    error: deptError,
  } = useSelector((state) => state.departmentApplication);

  useEffect(() => {
    if (!applicationId) return;
    dispatch(getMemberApplicationDetails(applicationId));
    dispatch(getDepartmentApplicationsByMemberApplication(applicationId));
  }, [dispatch, applicationId]);

  const interviewSummary = useMemo(
    () => getInterviewSummary(deptApplications || []),
    [deptApplications],
  );

  const cvStatus = normalizeStatus(memberApplication?.cvStatus);
  const finalStatus = normalizeStatus(memberApplication?.finalStatus);
  const canInterview = cvStatus === "PASSED";
  const canFinalReview =
    canInterview &&
    interviewSummary.total > 0 &&
    interviewSummary.pending === 0 &&
    interviewSummary.passed > 0;
  const actionDisabledClass = "pointer-events-none opacity-40";
  const isFinalDone = finalStatus !== "PENDING";

  const timelineItems = [
    {
      key: "cv",
      label: "CV Review",
      done: cvStatus !== "PENDING",
      status: cvStatus || "PENDING",
    },
    {
      key: "interview",
      label: "Interview",
      done: interviewSummary.total > 0 && interviewSummary.pending === 0,
      status:
        interviewSummary.total === 0
          ? "PENDING"
          : interviewSummary.pending > 0
            ? "PENDING"
            : interviewSummary.failed === interviewSummary.total
              ? "FAILED"
              : "PASSED",
    },
    {
      key: "final",
      label: "Final Review",
      done: isFinalDone,
      status: finalStatus || "PENDING",
    },
  ];

  const basePath = `/${role}/member-applications`;

  if (isLoading || deptLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error?.message || error);
  }

  if (deptError) {
    toast.error(deptError?.message || deptError);
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <section className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              Member Application Details
            </h1>
            <p className="mt-1 text-slate-300">
              #{memberApplication?.id || "N/A"} -{" "}
              {memberApplication?.fullname || "N/A"}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to={basePath}
              className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 hover:border-[var(--pink-color)]"
            >
              Back To List
            </Link>
            <Link
              to={`${basePath}/cv-review/${applicationId}`}
              className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-2 text-sm font-medium text-amber-300 hover:bg-amber-500/25"
            >
              CV Review
            </Link>
            <Link
              to={`${basePath}/interview/${applicationId}`}
              className={`rounded-lg border border-blue-500/40 bg-blue-500/15 px-3 py-2 text-sm font-medium text-blue-300 hover:bg-blue-500/25 ${
                canInterview ? "" : actionDisabledClass
              }`}
              title={
                canInterview
                  ? "Interview round"
                  : "Interview round is locked until CV status is PASSED"
              }
            >
              Interview Round
            </Link>
            <Link
              to={`${basePath}/final-review/${applicationId}`}
              className={`rounded-lg border border-emerald-500/40 bg-emerald-500/15 px-3 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/25 ${
                canInterview &&
                interviewSummary.total > 0 &&
                interviewSummary.pending === 0
                  ? ""
                  : actionDisabledClass
              }`}
              title={
                canInterview &&
                interviewSummary.total > 0 &&
                interviewSummary.pending === 0
                  ? "Final round"
                  : "Final round is locked until interviews are completed"
              }
            >
              Final Round
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/65 p-4">
          <h2 className="mb-3 text-lg font-bold">Application Timeline</h2>
          <div className="grid gap-3 md:grid-cols-3">
            {timelineItems.map((item, index) => (
              <div
                key={item.key}
                className="rounded-xl border border-slate-700 bg-slate-950/40 p-3"
              >
                <p className="text-xs uppercase text-slate-400">
                  Step {index + 1}
                </p>
                <p className="mt-1 font-semibold text-slate-100">
                  {item.label}
                </p>
                <span
                  className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClass(item.status)}`}
                >
                  {formatUppercaseToCapitalized(item.status)}
                </span>
                <p className="mt-2 text-xs text-slate-400">
                  {item.done ? "Completed" : "In Progress"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-slate-700 bg-slate-900/65 p-3">
            <p className="text-xs uppercase text-slate-400">CV Status</p>
            <span
              className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClass(cvStatus)}`}
            >
              {cvStatus || "N/A"}
            </span>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/65 p-3">
            <p className="text-xs uppercase text-slate-400">
              Interview Summary
            </p>
            <p className="mt-2 text-sm text-slate-100">
              {interviewSummary.passed} passed / {interviewSummary.failed}{" "}
              failed / {interviewSummary.pending} pending
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/65 p-3">
            <p className="text-xs uppercase text-slate-400">Final Status</p>
            <span
              className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClass(finalStatus)}`}
            >
              {finalStatus || "N/A"}
            </span>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/65 p-3">
            <p className="text-xs uppercase text-slate-400">Round Gates</p>
            <p className="mt-2 text-sm text-slate-100">
              Interview: {canInterview ? "Open" : "Locked"}
            </p>
            <p className="text-sm text-slate-100">
              Final: {canFinalReview ? "Open" : "Locked"}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/65 p-4">
          <h2 className="mb-3 text-lg font-bold">Applicant Information</h2>
          <div className="mb-4 flex items-center gap-4 rounded-xl border border-slate-700 bg-slate-950/40 p-3">
            {memberApplication?.avatarUrl ? (
              <img
                src={memberApplication.avatarUrl}
                alt={memberApplication?.fullname || "Applicant"}
                className="h-16 w-16 rounded-full border border-slate-600 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-600 bg-slate-800 text-lg font-bold text-slate-200">
                {String(memberApplication?.fullname || "N")
                  .trim()
                  .charAt(0)
                  .toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-base font-semibold text-slate-100">
                {memberApplication?.fullname || "N/A"}
              </p>
              <p className="text-sm text-slate-300">
                {memberApplication?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <p>
              <span className="text-slate-400">Full Name:</span>{" "}
              {memberApplication?.fullname || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Email:</span>{" "}
              {memberApplication?.email || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Phone:</span>{" "}
              {memberApplication?.phoneNumber || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Date Of Birth:</span>{" "}
              {formatDate(memberApplication?.dateOfBirth) || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Gender:</span>{" "}
              {memberApplication?.gender || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Major:</span>{" "}
              {memberApplication?.major || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Student ID:</span>{" "}
              {memberApplication?.studentId || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Applied At:</span>{" "}
              {formatDate(memberApplication?.appliedAt) || "N/A"}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/65 p-4">
          <h2 className="mb-3 text-lg font-bold">CV Review Round</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-slate-400">Status:</span>{" "}
              {cvStatus || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Comment:</span>{" "}
              {memberApplication?.cvReviewComment || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Reviewed At:</span>{" "}
              {formatDate(memberApplication?.cvReviewedAt) || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Reviewed By:</span>{" "}
              {memberApplication?.cvReviewer?.fullname || "N/A"}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/65 p-4">
          <h2 className="mb-3 text-lg font-bold">
            Interview Round (By Department)
          </h2>

          {deptApplications.length === 0 ? (
            <p className="text-sm text-slate-300">
              No department interview records yet.
            </p>
          ) : (
            <div className="space-y-3">
              {deptApplications.map((deptApp) => (
                <div
                  key={deptApp.id}
                  className="rounded-xl border border-slate-700 bg-slate-950/40 p-3"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-semibold text-slate-100">
                      {deptApp.department?.name ||
                        `Department #${deptApp.departmentId}`}
                    </h3>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${badgeClass(deptApp.interviewStatus)}`}
                    >
                      {normalizeStatus(deptApp.interviewStatus) || "PENDING"}
                    </span>
                  </div>
                  <p className="text-sm">
                    <span className="text-slate-400">Priority:</span>{" "}
                    {deptApp.priority ?? "N/A"}
                  </p>
                  <p className="text-sm">
                    <span className="text-slate-400">Interviewer:</span>{" "}
                    {deptApp.interviewer?.fullname || "N/A"}
                  </p>
                  <p className="text-sm">
                    <span className="text-slate-400">Interviewed At:</span>{" "}
                    {formatDate(deptApp.interviewedAt) || "N/A"}
                  </p>
                  <p className="text-sm">
                    <span className="text-slate-400">Comment:</span>{" "}
                    {deptApp.interviewComment || "N/A"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/65 p-4">
          <h2 className="mb-3 text-lg font-bold">Final Review Round</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-slate-400">Status:</span>{" "}
              {finalStatus || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Comment:</span>{" "}
              {memberApplication?.finalReviewComment || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Reviewed At:</span>{" "}
              {formatDate(memberApplication?.finalReviewedAt) || "N/A"}
            </p>
            <p>
              <span className="text-slate-400">Reviewed By:</span>{" "}
              {memberApplication?.finalReviewer?.fullname || "N/A"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MemberApplicationDetailsPage;
