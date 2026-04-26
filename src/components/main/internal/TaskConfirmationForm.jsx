import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const TaskConfirmationForm = ({ taskCfData, onSubmit }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      evidence: null,
      evidenceUrl: taskCfData?.evidenceUrl || "",
      additionalComments: taskCfData?.additionalComments || "",
    },
    mode: "onChange",
  });

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append("assigneeId", currentUser.id);
    formData.append("additionalComments", data.additionalComments);

    if (data.evidence && data.evidence[0]) {
      formData.append("evidence", data.evidence[0]);
    }

    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900/90 via-zinc-900/75 to-zinc-950/95 p-6 shadow-2xl shadow-black/25"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl" />

      {/* Evidence File Input */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="evidence"
          className="text-sm font-bold tracking-wide text-zinc-100"
        >
          Evidence <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <input
            type="file"
            id="evidence"
            accept="image/*"
            className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-cyan-500/20 file:text-cyan-100
                      hover:file:bg-cyan-500/30
                      cursor-pointer rounded-xl border border-white/10 p-2.5 bg-zinc-900/70
                      focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/25"
            {...register("evidence", { required: "Evidence is required" })}
          />
        </div>
        {errors.evidence && (
          <p className="text-sm font-medium text-red-300">
            {errors.evidence.message}
          </p>
        )}
      </div>

      {taskCfData?.evidenceUrl && (
        <div className="rounded-xl border border-cyan-300/20 bg-cyan-500/10 p-3">
          <p className="text-xs font-bold uppercase tracking-wide text-cyan-200">
            Current Evidence
          </p>
          <img
            src={taskCfData.evidenceUrl}
            alt="Current evidence"
            className="mt-2 max-h-56 rounded-lg border border-cyan-200/20 object-cover"
          />
        </div>
      )}

      {/* Additional Comments */}
      <div className="flex flex-col gap-2 mt-4">
        <label
          htmlFor="additional_comments"
          className="text-sm font-bold tracking-wide text-zinc-100"
        >
          Comments
        </label>
        <textarea
          id="additional_comments"
          rows="5"
          className="block w-full resize-none rounded-xl border border-white/10 bg-zinc-900/70 px-3 py-2.5 text-sm text-zinc-100 shadow-sm
                  placeholder-zinc-500 focus:outline-none focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/25"
          placeholder="Enter your additional comments..."
          {...register("additionalComments")}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-6 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-2.5
              font-bold text-zinc-950 transition duration-200 ease-in-out hover:-translate-y-0.5 hover:brightness-110
              focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        Submit
      </button>
    </form>
  );
};

export default TaskConfirmationForm;
