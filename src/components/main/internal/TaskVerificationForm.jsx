import { useForm } from "react-hook-form";

const TaskVerificationForm = ({ taskVerifyData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isVerified: taskVerifyData?.status === "VERIFIED" ? "true" : "false",
      reviewerComments: taskVerifyData?.reviewerComments || "",
      assigneeId: taskVerifyData?.assigneeId || null,
    },
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative mt-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/75 to-zinc-950/95 p-6 shadow-2xl shadow-black/20"
    >
      <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-emerald-500/10 blur-2xl" />

      {/* Verified/Rejected */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-bold tracking-wide text-zinc-100">
          Verification Result <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-500/10 px-3 py-2.5">
            <input
              type="radio"
              value="true"
              {...register("isVerified", {
                required: "Verification result is required",
              })}
              className="h-4 w-4 border-white/20 bg-zinc-900 text-emerald-400 focus:ring-emerald-300"
            />
            <span className="text-sm font-semibold text-emerald-100">
              Verified
            </span>
          </label>
          <label className="inline-flex items-center gap-2 rounded-xl border border-rose-300/25 bg-rose-500/10 px-3 py-2.5">
            <input
              type="radio"
              value="false"
              {...register("isVerified", {
                required: "Verification result is required",
              })}
              className="h-4 w-4 border-white/20 bg-zinc-900 text-rose-400 focus:ring-rose-300"
            />
            <span className="text-sm font-semibold text-rose-100">
              Rejected
            </span>
          </label>
        </div>
        {errors.isVerified && (
          <p className="text-sm font-medium text-red-300">
            {errors.isVerified.message}
          </p>
        )}
      </div>

      {/* Reviewer Comments */}
      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="reviewer_comments"
          className="text-sm font-bold tracking-wide text-zinc-100"
        >
          Comments
        </label>
        <textarea
          id="reviewer_comments"
          rows="5"
          className="block w-full resize-none rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2.5 text-sm text-zinc-100 shadow-sm
                  placeholder-zinc-500 focus:outline-none focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/25"
          placeholder="Enter your reviewer comments..."
          {...register("reviewerComments")}
        />
        {errors.reviewerComments && (
          <p className="text-sm font-medium text-red-300">
            {errors.reviewerComments.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-4 py-2.5
              font-bold text-zinc-950 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:brightness-110
              focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskVerificationForm;
