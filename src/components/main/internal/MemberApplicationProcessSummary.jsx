import { formatDate } from "../../../utils/formatters.js";

const MemberApplicationProcessSummary = ({
  cvStatus,
  finalStatus,
  interviewSummary,
  appliedAt,
}) => {
  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          CV Status
        </p>
        <p className="mt-1 text-sm font-semibold">{cvStatus || "N/A"}</p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Interview Summary
        </p>
        <p className="mt-1 text-sm font-semibold">
          {interviewSummary.passed} passed / {interviewSummary.failed} failed /{" "}
          {interviewSummary.pending} pending
        </p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Final Status
        </p>
        <p className="mt-1 text-sm font-semibold">{finalStatus || "N/A"}</p>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900/70 p-3">
        <p className="text-xs uppercase tracking-wide text-slate-400">
          Applied At
        </p>
        <p className="mt-1 text-sm font-semibold">{formatDate(appliedAt)}</p>
      </div>
    </div>
  );
};

export default MemberApplicationProcessSummary;
