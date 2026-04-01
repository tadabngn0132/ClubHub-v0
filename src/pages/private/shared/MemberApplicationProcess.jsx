import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading.jsx";
import { formatDate, formatUppercaseToCapitalized } from "../../../utils/formatters.js";
import {
  getMemberApplicationDetails,
  updateMemberApplicationCVReview,
  updateMemberApplicationFinalReview,
} from "../../../store/slices/memberApplicationSlice.js";
import {
  getDepartmentApplicationsByMemberApplication,
  updateDepartmentApplicationById,
} from "../../../store/slices/departmentApplicationSlice.js";
import { getPositionsList } from "../../../store/slices/positionSlice.js";
import { updateManyMemberApplications } from "../../../services/memberApplicationService.js";

const STATUS_OPTIONS = ["PASSED", "FAILED"];

const normalizeStatus = (value) => String(value || "").trim().toUpperCase();

const getInterviewSummary = (deptApplications = []) => {
  const summary = {
    total: deptApplications.length,
    passed: 0,
    failed: 0,
    pending: 0,
  };

  deptApplications.forEach((item) => {
    const status = normalizeStatus(item.interviewStatus);
    if (status === "PASSED") summary.passed += 1;
    else if (status === "FAILED") summary.failed += 1;
    else summary.pending += 1;
  });

  return summary;
};

const MemberApplicationProcess = ({ role, stage }) => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { memberApplication, isLoading, error } = useSelector(
    (state) => state.memberApplication,
  );
  const {
    deptApplications,
    isLoading: deptLoading,
    error: deptError,
  } = useSelector((state) => state.departmentApplication);
  const { positions } = useSelector((state) => state.position);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cvForm, setCvForm] = useState({ status: "PASSED", comment: "" });
  const [finalForm, setFinalForm] = useState({
    status: "PASSED",
    comment: "",
    rootDepartmentId: "",
    positionId: "",
  });
  const [interviewFormMap, setInterviewFormMap] = useState({});

  useEffect(() => {
    if (!applicationId) return;
    dispatch(getMemberApplicationDetails(applicationId));
    dispatch(getDepartmentApplicationsByMemberApplication(applicationId));
    dispatch(getPositionsList());
  }, [dispatch, applicationId]);

  useEffect(() => {
    if (!memberApplication) return;
    setCvForm({
      status: normalizeStatus(memberApplication.cvStatus) === "FAILED" ? "FAILED" : "PASSED",
      comment: memberApplication.cvReviewComment || "",
    });
    setFinalForm((prev) => ({
      ...prev,
      status: normalizeStatus(memberApplication.finalStatus) === "FAILED" ? "FAILED" : "PASSED",
      comment: memberApplication.finalReviewComment || "",
    }));
  }, [memberApplication]);

  useEffect(() => {
    const next = {};
    (deptApplications || []).forEach((item) => {
      next[item.id] = {
        status: normalizeStatus(item.interviewStatus) === "FAILED" ? "FAILED" : "PASSED",
        comment: item.interviewComment || "",
      };
    });
    setInterviewFormMap(next);
  }, [deptApplications]);

  const interviewSummary = useMemo(
    () => getInterviewSummary(deptApplications || []),
    [deptApplications],
  );

  const cvStatus = normalizeStatus(memberApplication?.cvStatus);
  const finalStatus = normalizeStatus(memberApplication?.finalStatus);
  const isCvDone = cvStatus !== "PENDING";
  const canInterview = cvStatus === "PASSED";
  const isInterviewDone =
    interviewSummary.total > 0 &&
    interviewSummary.pending === 0;
  const hasInterviewPass = interviewSummary.passed > 0;
  const allInterviewFailed = isInterviewDone && interviewSummary.failed === interviewSummary.total;
  const canFinalReview = canInterview && isInterviewDone && hasInterviewPass;

  const passedDepartments = useMemo(
    () =>
      (deptApplications || []).filter(
        (item) => normalizeStatus(item.interviewStatus) === "PASSED",
      ),
    [deptApplications],
  );

  const headerTitle =
    stage === "cv-review"
      ? "CV Review"
      : stage === "interview"
        ? "Interview Review"
        : "Final Review";

  const basePath = `/${role}/member-applications`;

  const refreshData = async () => {
    await Promise.all([
      dispatch(getMemberApplicationDetails(applicationId)),
      dispatch(getDepartmentApplicationsByMemberApplication(applicationId)),
    ]);
  };

  const handleSubmitCvReview = async (event) => {
    event.preventDefault();

    if (!cvForm.comment.trim()) {
      toast.error("CV review comment is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateMemberApplicationCVReview({
          id: applicationId,
          cvReviewData: {
            status: cvForm.status,
            cvReviewStatus: cvForm.status,
            cvReviewComment: cvForm.comment.trim(),
            cvReviewerId: currentUser?.id,
          },
        }),
      ).unwrap();
      toast.success("CV review updated.");
      await refreshData();
    } catch (err) {
      toast.error(err?.message || "Failed to update CV review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitInterview = async (deptApplication) => {
    if (!canInterview) {
      toast.error("Cannot interview before CV review is PASSED.");
      return;
    }

    const payload = interviewFormMap[deptApplication.id] || {};
    const interviewComment = String(payload.comment || "").trim();

    if (!interviewComment) {
      toast.error("Interview comment is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateDepartmentApplicationById({
          id: deptApplication.id,
          deptApplicationData: {
            memberApplicationId: deptApplication.memberApplicationId,
            departmentId: deptApplication.departmentId,
            interviewStatus: payload.status || "PASSED",
            priority: deptApplication.priority || 1,
            interviewComment,
            interviewerId: currentUser?.id,
            interviewedAt: new Date().toISOString(),
          },
        }),
      ).unwrap();
      toast.success("Interview review updated.");
      await refreshData();
    } catch (err) {
      toast.error(err?.message || "Failed to update interview review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMarkFinalFailed = async () => {
    if (!allInterviewFailed) {
      toast.error("Final fail is only auto-applied when all interviews FAILED.");
      return;
    }

    if (!finalForm.comment.trim()) {
      toast.error("Final review comment is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await updateManyMemberApplications({
        ids: [Number(applicationId)],
        data: {
          finalStatus: "FAILED",
          finalReviewComment: finalForm.comment.trim(),
          finalReviewedAt: new Date().toISOString(),
          finalReviewerId: currentUser?.id,
        },
      });

      if (!response?.success) {
        throw new Error(response?.message || "Failed to set final status.");
      }

      toast.success("Final status marked as FAILED.");
      await refreshData();
    } catch (err) {
      toast.error(err?.message || "Failed to mark final failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitFinalReview = async (event) => {
    event.preventDefault();

    if (!canFinalReview) {
      toast.error(
        "Final review requires CV PASSED, all interviews reviewed, and at least one PASSED interview.",
      );
      return;
    }

    if (!finalForm.comment.trim()) {
      toast.error("Final review comment is required.");
      return;
    }

    if (!finalForm.rootDepartmentId || !finalForm.positionId) {
      toast.error("Please choose accepted department and position for user creation.");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateMemberApplicationFinalReview({
          id: applicationId,
          finalReviewData: {
            status: finalForm.status,
            finalReviewStatus: finalForm.status,
            finalReviewComment: finalForm.comment.trim(),
            finalReviewerId: currentUser?.id,
            fullname: memberApplication?.fullname,
            email: memberApplication?.email,
            phoneNumber: memberApplication?.phoneNumber,
            dateOfBirth: memberApplication?.dateOfBirth,
            gender: memberApplication?.gender,
            major: memberApplication?.major,
            studentId: memberApplication?.studentId,
            avatarUrl: memberApplication?.avatarUrl,
            bio: memberApplication?.bio,
            rootDepartmentId: Number(finalForm.rootDepartmentId),
            positionId: Number(finalForm.positionId),
          },
        }),
      ).unwrap();

      toast.success("Final review completed and user created.");
      navigate(basePath);
    } catch (err) {
      toast.error(err?.message || "Failed to complete final review.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mx-auto w-full max-w-6xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
              {headerTitle}
            </h1>
            <p className="mt-1 text-slate-300">
              {memberApplication?.fullname || "N/A"} - {memberApplication?.email || "N/A"}
            </p>
          </div>

          <Link
            to={basePath}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-100 hover:border-[var(--pink-color)]"
          >
            Back To List
          </Link>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">CV Status</p>
            <p className="mt-1 text-sm font-semibold">{cvStatus || "N/A"}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Interview Summary</p>
            <p className="mt-1 text-sm font-semibold">
              {interviewSummary.passed} passed / {interviewSummary.failed} failed / {interviewSummary.pending} pending
            </p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Final Status</p>
            <p className="mt-1 text-sm font-semibold">{finalStatus || "N/A"}</p>
          </div>
          <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">Applied At</p>
            <p className="mt-1 text-sm font-semibold">{formatDate(memberApplication?.appliedAt)}</p>
          </div>
        </div>

        {stage === "cv-review" && (
          <form
            onSubmit={handleSubmitCvReview}
            className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-4"
          >
            <div className="grid gap-3 md:grid-cols-3">
              <select
                value={cvForm.status}
                onChange={(e) =>
                  setCvForm((prev) => ({ ...prev, status: e.target.value }))
                }
                className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
              >
                {STATUS_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {formatUppercaseToCapitalized(option)}
                  </option>
                ))}
              </select>
            </div>

            <textarea
              value={cvForm.comment}
              onChange={(e) =>
                setCvForm((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Write CV review comment"
              rows={5}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg border border-[var(--pink-color)] px-4 py-2 text-sm font-semibold text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Save CV Review
            </button>
          </form>
        )}

        {stage === "interview" && (
          <div className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
            {!canInterview && (
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-2 text-sm text-amber-200">
                Interview round is locked. CV review must be PASSED first.
              </div>
            )}

            {deptApplications.length === 0 ? (
              <p className="text-sm text-slate-300">No department choices found for this application.</p>
            ) : (
              deptApplications.map((deptApp) => {
                const formValue = interviewFormMap[deptApp.id] || {
                  status: "PASSED",
                  comment: "",
                };

                return (
                  <div key={deptApp.id} className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-semibold text-slate-100">
                        {deptApp.department?.name || "Unknown Department"}
                      </h3>
                      <span className="text-xs text-slate-400">
                        Current: {normalizeStatus(deptApp.interviewStatus) || "PENDING"}
                      </span>
                    </div>

                    <div className="grid gap-3 md:grid-cols-3">
                      <select
                        value={formValue.status}
                        onChange={(e) =>
                          setInterviewFormMap((prev) => ({
                            ...prev,
                            [deptApp.id]: {
                              ...(prev[deptApp.id] || {}),
                              status: e.target.value,
                            },
                          }))
                        }
                        disabled={!canInterview || isSubmitting}
                        className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm disabled:opacity-60"
                      >
                        {STATUS_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {formatUppercaseToCapitalized(option)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <textarea
                      value={formValue.comment}
                      onChange={(e) =>
                        setInterviewFormMap((prev) => ({
                          ...prev,
                          [deptApp.id]: {
                            ...(prev[deptApp.id] || {}),
                            comment: e.target.value,
                          },
                        }))
                      }
                      disabled={!canInterview || isSubmitting}
                      placeholder="Write interview review comment"
                      rows={4}
                      className="mt-3 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm disabled:opacity-60"
                    />

                    <button
                      type="button"
                      onClick={() => handleSubmitInterview(deptApp)}
                      disabled={!canInterview || isSubmitting}
                      className="mt-3 rounded-lg border border-[var(--pink-color)] px-4 py-2 text-sm font-semibold text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Save Interview Result
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}

        {stage === "final-review" && (
          <form
            onSubmit={handleSubmitFinalReview}
            className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-4"
          >
            {!canFinalReview && !allInterviewFailed && (
              <div className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-2 text-sm text-amber-200">
                Final review is locked. Requirement: CV PASSED, all interview results reviewed, and at least one department PASSED.
              </div>
            )}

            {allInterviewFailed && (
              <div className="rounded-lg border border-rose-500/40 bg-rose-500/15 px-3 py-2 text-sm text-rose-200">
                All interview results are FAILED. According to business rule, final result must be FAILED.
              </div>
            )}

            {!allInterviewFailed && (
              <>
                <div className="grid gap-3 md:grid-cols-3">
                  <select
                    value={finalForm.status}
                    onChange={(e) =>
                      setFinalForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                    disabled={isSubmitting}
                    className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm disabled:opacity-60"
                  >
                    <option value="PASSED">Passed</option>
                  </select>

                  <select
                    value={finalForm.rootDepartmentId}
                    onChange={(e) =>
                      setFinalForm((prev) => ({ ...prev, rootDepartmentId: e.target.value }))
                    }
                    disabled={!canFinalReview || isSubmitting}
                    className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm disabled:opacity-60"
                  >
                    <option value="">Select Accepted Department</option>
                    {passedDepartments.map((item) => (
                      <option key={item.id} value={item.departmentId}>
                        {item.department?.name || `Department #${item.departmentId}`}
                      </option>
                    ))}
                  </select>

                  <select
                    value={finalForm.positionId}
                    onChange={(e) =>
                      setFinalForm((prev) => ({ ...prev, positionId: e.target.value }))
                    }
                    disabled={!canFinalReview || isSubmitting}
                    className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm disabled:opacity-60"
                  >
                    <option value="">Select Position</option>
                    {(positions || []).map((position) => (
                      <option key={position.id} value={position.id}>
                        {position.title}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!canFinalReview || isSubmitting}
                  className="rounded-lg border border-[var(--pink-color)] px-4 py-2 text-sm font-semibold text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Complete Final Review
                </button>
              </>
            )}

            <textarea
              value={finalForm.comment}
              onChange={(e) =>
                setFinalForm((prev) => ({ ...prev, comment: e.target.value }))
              }
              placeholder="Write final review comment"
              rows={5}
              className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
            />

            {allInterviewFailed && (
              <button
                type="button"
                onClick={handleMarkFinalFailed}
                disabled={isSubmitting}
                className="rounded-lg border border-rose-500 px-4 py-2 text-sm font-semibold text-rose-300 hover:bg-rose-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Mark Final Failed
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default MemberApplicationProcess;