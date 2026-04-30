// TODO(member-application): rebuild this as the main application list screen.
// It should support search, state filters, sort options, bulk actions, state
// badges, and links to the detail page. Keep the list driven by the aggregate
// state field instead of legacy cv/final flat fields.
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMemberApplicationsList,
  softDeleteMemberApplicationById,
  hardDeleteMemberApplicationById,
  restoreMemberApplicationById,
} from "../../../store/slices/memberApplicationSlice";
import Loading from "../../../components/layout/internal/Loading";
import { Link } from "react-router-dom";
import ConfirmationModal from "../../../components/main/internal/ConfirmationModal";
import { formatDate } from "../../../utils/formatters";

const MemberApplicationsPage = ({ role }) => {
  const dispatch = useDispatch();
  const { memberApplications, isLoading } = useSelector(
    (state) => state.memberApplication,
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [selectedMemAppId, setSelectedMemAppId] = useState(null);
  const [deleteMode, setDeleteMode] = useState("");

  useEffect(() => {
    dispatch(getAllMemberApplicationsList());
  }, [dispatch]);

  const handleOpenConfirmationModal = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleDeleteConfigured = (memAppId, mode) => {
    setSelectedMemAppId(memAppId);
    setDeleteMode(mode);
    handleOpenConfirmationModal();
  };

  const handleDelete = async (selectedMemAppId) => {
    try {
      if (deleteMode === "soft") {
        await dispatch(
          softDeleteMemberApplicationById(selectedMemAppId),
        ).unwrap();
      } else if (deleteMode === "hard") {
        await dispatch(
          hardDeleteMemberApplicationById(selectedMemAppId),
        ).unwrap();
      }
    } finally {
      handleCloseConfirmationModal();
    }
  };

  const handleRestore = async (memAppId) => {
    await dispatch(restoreMemberApplicationById(memAppId)).unwrap();
    await dispatch(getAllMemberApplicationsList()).unwrap();
  };

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

  const formatState = (state) =>
    String(state || "unknown")
      .toLowerCase()
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-1 sm:px-0">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-950/75 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Member Applications
            </h1>
            <p className="mt-1 text-sm text-white/60">
              {memberApplications.length} application(s)
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/75">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead className="bg-white/[0.03]">
                <tr className="border-b border-white/10">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Avatar
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Full Name
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Email
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Phone Number
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Major
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Student ID
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Applied Date
                  </th>
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Status
                  </th>
                  {role === "ADMIN" && (
                    <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                      Is Deleted
                    </th>
                  )}
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white/55">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {memberApplications.length === 0 ? (
                  <tr>
                    <td
                      colSpan="10"
                      className="px-4 py-6 text-center text-sm text-white/70"
                    >
                      No member applications found.
                    </td>
                  </tr>
                ) : null}

                {memberApplications.map((application) => {
                  const normalizedState = String(
                    application.state || "unknown",
                  ).toLowerCase();

                  return (
                    <tr
                      key={application.id}
                      className="border-b border-white/10 last:border-b-0 hover:bg-white/[0.03]"
                    >
                      <td className="px-4 py-3">
                        {application.avatarUrl ? (
                          <img
                            src={application.avatarUrl}
                            alt={`${application.fullname} avatar`}
                            className="h-10 w-10 rounded-full border border-white/10 object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white/65">
                            {(application.fullname || "N")
                              .slice(0, 1)
                              .toUpperCase()}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-white/90">
                        {application.fullname || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/75">
                        {application.email || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/75">
                        {application.phoneNumber || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/75">
                        {application.major || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/75">
                        {application.studentId || "N/A"}
                      </td>
                      <td className="px-4 py-3 text-sm text-white/75">
                        {formatDate(application.appliedAt)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.1em] ${statusTone[normalizedState] || "border-white/15 bg-white/10 text-white/70"}`}
                        >
                          {formatState(application.state)}
                        </span>
                      </td>
                      {role === "ADMIN" && (
                        <td className="px-4 py-3 text-center">
                          {user.isDeleted ? (
                            <p className="badge text-red-500/80 text-sm/tight">
                              Deleted
                            </p>
                          ) : (
                            <p className="badge text-green-500/80 text-sm/tight">
                              Not Deleted
                            </p>
                          )}
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          <Link
                            to={`/${role}/member-applications/view/${application.id}`}
                            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white/10"
                          >
                            View
                          </Link>
                          {normalizedState === "cv_pending" && (
                            <Link
                              to={`/${role}/member-applications/cv-review/${application.id}`}
                              className="inline-flex items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-100 transition hover:bg-amber-400/20"
                            >
                              CV Review
                            </Link>
                          )}
                          {normalizedState ===
                            "department_interview_pending" && (
                            <Link
                              to={`/${role}/member-applications/interview/${application.id}`}
                              className="inline-flex items-center justify-center rounded-full border border-violet-400/35 bg-violet-400/10 px-3 py-1.5 text-xs font-semibold text-violet-100 transition hover:bg-violet-400/20"
                            >
                              Interview
                            </Link>
                          )}
                          {normalizedState === "final_pending" && (
                            <Link
                              to={`/${role}/member-applications/final-review/${application.id}`}
                              className="inline-flex items-center justify-center rounded-full border border-cyan-400/35 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
                            >
                              Final Review
                            </Link>
                          )}
                          <button
                            onClick={() =>
                              handleDeleteConfigured(application.id, "soft")
                            }
                            className="inline-flex items-center justify-center rounded-full border border-amber-400/35 bg-amber-400/10 px-3 py-1.5 text-xs font-semibold text-amber-100 transition hover:bg-amber-400/20"
                          >
                            Soft Delete
                          </button>
                          {role === "admin" && (
                            <>
                              <button
                                onClick={() =>
                                  handleDeleteConfigured(application.id, "hard")
                                }
                                className="inline-flex items-center justify-center rounded-full border border-rose-400/35 bg-rose-400/10 px-3 py-1.5 text-xs font-semibold text-rose-100 transition hover:bg-rose-400/20"
                              >
                                Hard Delete
                              </button>
                              {application.isDeleted && (
                                <button
                                  onClick={() => handleRestore(application.id)}
                                  className="inline-flex items-center justify-center rounded-full border border-yellow-400/35 bg-yellow-400/10 px-3 py-1.5 text-xs font-semibold text-yellow-100 transition hover:bg-yellow-400/20"
                                >
                                  Restore
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ConfirmationModal
        open={isConfirmationModalOpen}
        title="Confirm Deletion"
        message={`Are you sure you want to ${deleteMode === "soft" ? "soft" : "hard"} delete this member application?`}
        variant={deleteMode === "soft" ? "warning" : "danger"}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        onCancel={handleCloseConfirmationModal}
        onConfirm={() => handleDelete(selectedMemAppId)}
      />
    </div>
  );
};

export default MemberApplicationsPage;
