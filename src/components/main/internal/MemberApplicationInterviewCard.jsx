import { formatUppercaseToCapitalized } from "../../../utils/formatters.js";

const MemberApplicationInterviewCard = ({
  deptApp,
  formValue,
  canInterview,
  isSubmitting,
  statusOptions,
  normalizeStatus,
  setInterviewFormMap,
  onSubmitInterview,
}) => {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/50 p-4">
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
          {statusOptions.map((option) => (
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
        onClick={() => onSubmitInterview(deptApp)}
        disabled={!canInterview || isSubmitting}
        className="mt-3 rounded-lg border border-[var(--pink-color)] px-4 py-2 text-sm font-semibold text-[var(--pink-color)] hover:bg-[var(--pink-color)] hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        Save Interview Result
      </button>
    </div>
  );
};

export default MemberApplicationInterviewCard;
