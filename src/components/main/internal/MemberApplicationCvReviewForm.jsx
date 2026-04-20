import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formatUppercaseToCapitalized } from "../../../utils/formatters.js";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules.js";

const MemberApplicationCvReviewForm = ({
  statusOptions,
  initialValues,
  isSubmitting,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: initialValues?.status || "PASSED",
      comment: initialValues?.comment || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    reset({
      status: initialValues?.status || "PASSED",
      comment: initialValues?.comment || "",
    });
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl border border-slate-700 bg-slate-900/70 p-4"
    >
      <div className="grid gap-3 md:grid-cols-3">
        <select
          {...register("status")}
          className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {formatUppercaseToCapitalized(option)}
            </option>
          ))}
        </select>
      </div>

      <textarea
        {...register("comment", {
          required: VALIDATION_MESSAGES.cvReviewCommentRequired,
        })}
        placeholder="Write CV review comment"
        rows={5}
        className="w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm"
      />
      {errors.comment && (
        <p className="text-sm font-medium text-red-400">
          {errors.comment.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg border border-[var(--pink-color)] px-4 py-2 text-sm font-semibold text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        Save CV Review
      </button>
    </form>
  );
};

export default MemberApplicationCvReviewForm;
