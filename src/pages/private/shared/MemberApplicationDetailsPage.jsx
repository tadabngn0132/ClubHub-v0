// TODO(member-application): rebuild this as the shared detail page for admin,
// moderator, and member flows. Fetch the application by id, render the
// aggregate profile, CV review, interview history, final review, and withdraw
// status, then expose only the actions allowed by role and transition state.
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMemberApplicationDetails, softDeleteMemberApplicationById, hardDeleteMemberApplicationById } from "../../../store/slices/memberApplicationSlice";
import Loading from "../../../components/layout/internal/Loading";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal";
import { formatDate, formatUppercaseToCapitalized } from "../../../utils/formatters";
import CVReviewCard from "../../../components/main/internal/CVReviewCard";
import DepartmentInterviewCard from "../../../components/main/internal/DepartmentInterviewCard";
import FinalReviewCard from "../../../components/main/internal/FinalReviewCard";

const MemberApplicationDetailsPage = ({ role }) => {
  const { applicationId } = useParams();
  const dispatch = useDispatch();
  const { memberApplication, isLoading } = useSelector(
    (state) => state.memberApplication,
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getMemberApplicationDetails(applicationId));
  }, [dispatch, applicationId]);

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
      dispatch(softDeleteMemberApplicationById(applicationId));
      handleCloseConfirmationModal();
    } else if (deleteMode === "hard") {
      dispatch(hardDeleteMemberApplicationById(applicationId));
      handleCloseConfirmationModal();
    }
  };

  const applicationState = memberApplication?.state ?? "unknown";
  const normalizedState = String(applicationState).toLowerCase();
  const displayName = memberApplication?.fullname || "Member Application";
  const statusTone = {
    submitted: "border-sky-400/40 bg-sky-400/15 text-sky-100",
    cv_pending: "border-amber-400/40 bg-amber-400/15 text-amber-100",
    cv_passed: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
    cv_failed: "border-rose-400/40 bg-rose-400/15 text-rose-100",
    department_interview_pending:
      "border-violet-400/40 bg-violet-400/15 text-violet-100",
    department_interview_passed:
      "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
    department_interview_failed:
      "border-rose-400/40 bg-rose-400/15 text-rose-100",
    final_pending: "border-cyan-400/40 bg-cyan-400/15 text-cyan-100",
    final_passed: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100",
    final_failed: "border-rose-400/40 bg-rose-400/15 text-rose-100",
    withdrawn: "border-zinc-400/40 bg-zinc-400/15 text-zinc-100",
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    return value;
  };

  const infoItems = [
    { label: "Full name", value: formatValue(memberApplication?.fullname) },
    { label: "Email", value: formatValue(memberApplication?.email) },
    { label: "Phone number", value: formatValue(memberApplication?.phoneNumber) },
    { label: "Date of birth", value: formatDate(memberApplication?.dateOfBirth) },
    {
      label: "Gender",
      value: formatUppercaseToCapitalized(memberApplication?.gender),
    },
    { label: "Major", value: formatValue(memberApplication?.major) },
    { label: "Student ID", value: formatValue(memberApplication?.studentId) },
    { label: "Applied at", value: formatDate(memberApplication?.appliedAt) },
  ];

  const canReviewCv = normalizedState === "submitted" || normalizedState === "cv_pending";
  const canInterview = normalizedState === "department_interview_pending";
  const canFinalReview = normalizedState === "final_pending";

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <section className="rounded-2xl border border-white/10 bg-zinc-950/75 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Link
                to={`/${role}/member-applications`}
                className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-medium text-white/80 transition hover:border-pink-400/60 hover:text-white"
              >
                Back
              </Link>
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${statusTone[normalizedState] || "border-white/10 bg-white/10 text-white/70"}`}>
                {formatUppercaseToCapitalized(applicationState)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {(role === "admin" && canReviewCv) && (
                <Link
                  to={`/${role}/member-applications/cv-review/${memberApplication?.id}`}
                  className="inline-flex items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/10 px-3.5 py-1.5 text-sm font-medium text-amber-100 transition hover:bg-amber-400/20"
                >
                  CV Review
                </Link>
              )}
              {(role === "admin" && canInterview) && (
                <Link
                  to={`/${role}/member-applications/interview/${memberApplication?.id}`}
                  className="inline-flex items-center justify-center rounded-full border border-violet-400/35 bg-violet-400/10 px-3.5 py-1.5 text-sm font-medium text-violet-100 transition hover:bg-violet-400/20"
                >
                  Interview
                </Link>
              )}
              {(role === "admin" && canFinalReview) && (
                <Link
                  to={`/${role}/member-applications/final-review/${memberApplication?.id}`}
                  className="inline-flex items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-400/10 px-3.5 py-1.5 text-sm font-medium text-cyan-100 transition hover:bg-cyan-400/20"
                >
                  Final Review
                </Link>
              )}
            </div>
          </div>

          <div className="mt-5 flex items-start gap-4">
            {memberApplication?.avatarUrl ? (
              <img
                src={memberApplication.avatarUrl}
                alt="Avatar"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-xl font-bold text-pink-100"
              />
            ) : (
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border border-pink-400/30 bg-pink-500/10 text-xl font-bold text-pink-100">
                {(displayName || "").slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                Member Application
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {displayName}
              </h1>
              <p className="mt-2 text-sm text-white/65">
                ID #{memberApplication?.id ?? "N/A"} • Applied {formatDate(memberApplication?.appliedAt)}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-white/10 bg-zinc-950/75 p-5 sm:p-6">
            <h2 className="text-base font-semibold text-white">Profile</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {infoItems.map((item) => (
                <div key={item.label} className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-white/45">
                    {item.label}
                  </p>
                  <p className="mt-1.5 break-words text-sm font-medium text-white/90">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-white/10 bg-zinc-950/75 p-5 sm:p-6">
              <h2 className="text-base font-semibold text-white">Workflow</h2>
              <p className="mt-3 text-sm leading-6 text-white/70">
                {(role === "admin" && canReviewCv)
                  ? "Ready for CV review."
                  : (role === "admin" && canInterview)
                    ? "Ready for interview review."
                    : (role === "admin" && canFinalReview)
                      ? "Ready for final review."
                      : "No action required at the moment."}
              </p>
              <p className="mt-2 text-sm text-white/60">
                {memberApplication?.avatarUrl ? "Avatar available" : "No avatar provided"}
              </p>
            </div>

            <div className="rounded-2xl border border-rose-400/20 bg-rose-400/5 p-5 sm:p-6">
              <h2 className="text-base font-semibold text-rose-100">Delete</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  onClick={() => handleDeleteConfigured("soft")}
                  className="inline-flex items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/10 px-3.5 py-1.5 text-sm font-medium text-amber-100 transition hover:bg-amber-400/20"
                >
                  Soft Delete
                </button>
                {role === "admin" && (
                  <button
                    onClick={() => handleDeleteConfigured("hard")}
                    className="inline-flex items-center justify-center rounded-full border border-rose-400/35 bg-rose-400/10 px-3.5 py-1.5 text-sm font-medium text-rose-100 transition hover:bg-rose-400/20"
                  >
                    Hard Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        <section>
          {memberApplication?.cvReview && <CVReviewCard cvReview={memberApplication.cvReview} />}
          {memberApplication?.departmentInterviews && memberApplication?.departmentInterviews.map((interview) => (<DepartmentInterviewCard key={interview.id} interview={interview} />))}
          {memberApplication?.finalReview && <FinalReviewCard finalReview={memberApplication.finalReview} />}
        </section>
      </div>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this member application?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default MemberApplicationDetailsPage;
