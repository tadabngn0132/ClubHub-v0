import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules.js";

const MemberApplicationFinalReviewForm = ({
  canFinalReview,
  allInterviewFailed,
  isSubmitting,
  initialValues,
  passedDepartments,
  positions,
  onSubmit,
  onMarkFinalFailed,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: initialValues?.status || "PASSED",
      comment: initialValues?.comment || "",
      rootDepartmentId: initialValues?.rootDepartmentId || "",
      positionId: initialValues?.positionId || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset({
      status: initialValues?.status || "PASSED",
      comment: initialValues?.comment || "",
      rootDepartmentId: initialValues?.rootDepartmentId || "",
      positionId: initialValues?.positionId || "",
    });
  }, [initialValues, reset]);

  const handleMarkFailed = () => {
    const currentComment = String(getValues("comment") || "").trim();
    onMarkFinalFailed(currentComment);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-4"
    >
      {!canFinalReview && !allInterviewFailed && (
        <div className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-3 py-2 text-sm text-amber-200">
          Final review is locked. Requirement: CV PASSED, all interview results
          reviewed, and at least one department PASSED.
        </div>
      )}

      {allInterviewFailed && (
        <div className="rounded-lg border border-rose-500/40 bg-rose-500/15 px-3 py-2 text-sm text-rose-200">
          All interview results are FAILED. According to business rule, final
          result must be FAILED.
        </div>
      )}

      {!allInterviewFailed && (
        <>
          <div className="grid gap-3 md:grid-cols-3">
            <select
              {...register("status")}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm disabled:opacity-60"
            >
              <option value="PASSED">Passed</option>
            </select>

            <select
              {...register("rootDepartmentId", {
                required:
                  "Please choose accepted department for user creation.",
              })}
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
            {errors.rootDepartmentId && (
              <p className="text-sm font-medium text-red-400">
                {errors.rootDepartmentId.message}
              </p>
            )}

            <select
              {...register("positionId", {
                required: "Please choose position for user creation.",
              })}
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
            {errors.positionId && (
              <p className="text-sm font-medium text-red-400">
                {errors.positionId.message}
              </p>
            )}
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
        {...register("comment", {
          required: VALIDATION_MESSAGES.finalReviewCommentRequired,
        })}
        placeholder="Write final review comment"
        rows={5}
        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
      />
      {errors.comment && (
        <p className="text-sm font-medium text-red-400">
          {errors.comment.message}
        </p>
      )}

      {allInterviewFailed && (
        <button
          type="button"
          onClick={handleMarkFailed}
          disabled={isSubmitting}
          className="rounded-lg border border-rose-500 px-4 py-2 text-sm font-semibold text-rose-300 hover:bg-rose-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          Mark Final Failed
        </button>
      )}
    </form>
  );
};

export default MemberApplicationFinalReviewForm;
