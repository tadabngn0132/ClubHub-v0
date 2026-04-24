import { formatDate } from "../../../utils/formatters";

const CVReviewCard = ({ cvReview }) => {

    return (
        <div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">CV Review</h3>
            <p>Status: {cvReview?.status}</p>
            <p>Reviewer: {cvReview?.reviewer?.fullname || "Not specified"}</p>
            <p>Comment: {cvReview?.comment || "No comment provided."}</p>
            <p>Reviewed At: {formatDate(cvReview?.reviewedAt)}</p>
        </div>
    )
}

export default CVReviewCard;