import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading.jsx";
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
import MemberApplicationProcessHeader from "../../../components/main/internal/MemberApplicationProcessHeader.jsx";
import MemberApplicationProcessSummary from "../../../components/main/internal/MemberApplicationProcessSummary.jsx";
import MemberApplicationCvReviewForm from "../../../components/main/internal/MemberApplicationCvReviewForm.jsx";
import MemberApplicationInterviewSection from "../../../components/main/internal/MemberApplicationInterviewSection.jsx";
import MemberApplicationFinalReviewForm from "../../../components/main/internal/MemberApplicationFinalReviewForm.jsx";

const STATUS_OPTIONS = ["PASSED", "FAILED"];

const normalizeStatus = (value) =>
  String(value || "")
    .trim()
    .toUpperCase();

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

  useEffect(() => {
    if (!applicationId) return;
    dispatch(getMemberApplicationDetails(applicationId));
    dispatch(getDepartmentApplicationsByMemberApplication(applicationId));
    dispatch(getPositionsList());
  }, [dispatch, applicationId]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message || error);
    }
  }, [error]);

  useEffect(() => {
    if (deptError) {
      toast.error(deptError?.message || deptError);
    }
  }, [deptError]);

  const interviewSummary = useMemo(
    () => getInterviewSummary(deptApplications || []),
    [deptApplications],
  );

  const cvStatus = normalizeStatus(memberApplication?.cvStatus);
  const finalStatus = normalizeStatus(memberApplication?.finalStatus);
  const canInterview = cvStatus === "PASSED";
  const isInterviewDone =
    interviewSummary.total > 0 && interviewSummary.pending === 0;
  const hasInterviewPass = interviewSummary.passed > 0;
  const allInterviewFailed =
    isInterviewDone && interviewSummary.failed === interviewSummary.total;
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

  const initialCvForm = useMemo(
    () => ({
      status:
        normalizeStatus(memberApplication?.cvStatus) === "FAILED"
          ? "FAILED"
          : "PASSED",
      comment: memberApplication?.cvReviewComment || "",
    }),
    [memberApplication],
  );

  const initialFinalForm = useMemo(
    () => ({
      status:
        normalizeStatus(memberApplication?.finalStatus) === "FAILED"
          ? "FAILED"
          : "PASSED",
      comment: memberApplication?.finalReviewComment || "",
      rootDepartmentId: "",
      positionId: "",
    }),
    [memberApplication],
  );

  const basePath = `/${role}/member-applications`;

  const refreshData = async () => {
    await Promise.all([
      dispatch(getMemberApplicationDetails(applicationId)),
      dispatch(getDepartmentApplicationsByMemberApplication(applicationId)),
    ]);
  };

  const handleSubmitCvReview = async (formData) => {
    const cvComment = String(formData.comment || "").trim();

    if (!cvComment) {
      toast.error("CV review comment is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateMemberApplicationCVReview({
          id: applicationId,
          cvReviewData: {
            status: formData.status,
            cvReviewStatus: formData.status,
            cvReviewComment: cvComment,
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

  const handleSubmitInterview = async (deptApplication, formData) => {
    if (!canInterview) {
      toast.error("Cannot interview before CV review is PASSED.");
      return;
    }

    const interviewComment = String(formData.comment || "").trim();

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
            interviewStatus: formData.status || "PASSED",
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

  const handleMarkFinalFailed = async (finalComment) => {
    if (!allInterviewFailed) {
      toast.error(
        "Final fail is only auto-applied when all interviews FAILED.",
      );
      return;
    }

    const normalizedComment = String(finalComment || "").trim();

    if (!normalizedComment) {
      toast.error("Final review comment is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await updateManyMemberApplications({
        ids: [Number(applicationId)],
        data: {
          finalStatus: "FAILED",
          finalReviewComment: normalizedComment,
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

  const handleSubmitFinalReview = async (formData) => {
    const finalComment = String(formData.comment || "").trim();

    if (!canFinalReview) {
      toast.error(
        "Final review requires CV PASSED, all interviews reviewed, and at least one PASSED interview.",
      );
      return;
    }

    if (!finalComment) {
      toast.error("Final review comment is required.");
      return;
    }

    if (!formData.rootDepartmentId || !formData.positionId) {
      toast.error(
        "Please choose accepted department and position for user creation.",
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(
        updateMemberApplicationFinalReview({
          id: applicationId,
          finalReviewData: {
            status: formData.status,
            finalReviewStatus: formData.status,
            finalReviewComment: finalComment,
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
            rootDepartmentId: Number(formData.rootDepartmentId),
            positionId: Number(formData.positionId),
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

  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto w-full max-w-6xl space-y-5">
        <MemberApplicationProcessHeader
          headerTitle={headerTitle}
          memberApplication={memberApplication}
          basePath={basePath}
        />

        <MemberApplicationProcessSummary
          cvStatus={cvStatus}
          finalStatus={finalStatus}
          interviewSummary={interviewSummary}
          appliedAt={memberApplication?.appliedAt}
        />

        {stage === "cv-review" && (
          <MemberApplicationCvReviewForm
            statusOptions={STATUS_OPTIONS}
            initialValues={initialCvForm}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmitCvReview}
          />
        )}

        {stage === "interview" && (
          <MemberApplicationInterviewSection
            canInterview={canInterview}
            isSubmitting={isSubmitting}
            deptApplications={deptApplications || []}
            statusOptions={STATUS_OPTIONS}
            onSubmitInterview={handleSubmitInterview}
            normalizeStatus={normalizeStatus}
          />
        )}

        {stage === "final-review" && (
          <MemberApplicationFinalReviewForm
            canFinalReview={canFinalReview}
            allInterviewFailed={allInterviewFailed}
            isSubmitting={isSubmitting}
            initialValues={initialFinalForm}
            passedDepartments={passedDepartments}
            positions={positions || []}
            onSubmit={handleSubmitFinalReview}
            onMarkFinalFailed={handleMarkFinalFailed}
          />
        )}
      </div>
    </div>
  );
};

export default MemberApplicationProcess;
