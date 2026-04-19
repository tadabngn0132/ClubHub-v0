import { formatUppercaseToCapitalized } from "../../../utils/formatters.js";

const MemberApplicationCvReviewForm = ({
  statusOptions,
  cvForm,
  setCvForm,
  isSubmitting,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={onSubmit}
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
          {statusOptions.map((option) => (
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
  );
};

export default MemberApplicationCvReviewForm;
