import { formatDate } from "../../../utils/formatters";

const FinalReviewCard = ({ finalReview }) => {
  const status = finalReview?.status;
  const badgeColor =
    status === "Approved"
      ? "bg-emerald-300 text-emerald-900"
      : status === "Rejected"
        ? "bg-rose-300 text-rose-900"
        : "bg-amber-300 text-amber-900";

  return (
    <div className="bg-zinc-800/60 border border-zinc-700 rounded-lg p-4 shadow-sm mb-4">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-zinc-100">Final Review</h3>
        <span
          className={`text-xs px-2 py-1 rounded-md font-medium ${badgeColor}`}
        >
          {status || "Pending"}
        </span>
      </div>

      <div className="text-sm text-zinc-200 space-y-1">
        <div>
          <span className="font-medium text-zinc-100">Reviewer:</span>{" "}
          <span className="text-zinc-400">
            {finalReview?.reviewer?.fullname || "Not specified"}
          </span>
        </div>
        <div>
          <span className="font-medium text-zinc-100">Comment:</span>{" "}
          <span className="text-zinc-400">
            {finalReview?.comment || "No comment provided."}
          </span>
        </div>
        <div>
          <span className="font-medium text-zinc-100">Reviewed At:</span>{" "}
          <span className="text-zinc-400">
            {formatDate(finalReview?.reviewedAt) || "—"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinalReviewCard;
