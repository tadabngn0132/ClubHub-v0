import { formatDate } from "../../../utils/formatters";

const FinalReviewCard = ({ finalReview }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Final Review</h3>
            <p>Status: {finalReview?.status}</p>
            <p>Reviewer: {finalReview?.reviewer?.fullname || "Not specified"}</p>
            <p>Comment: {finalReview?.comment || "No comment provided."}</p>
            <p>Reviewed At: {formatDate(finalReview?.reviewedAt)}</p>
        </div>
    )
}

export default FinalReviewCard;