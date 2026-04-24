import { formatDate } from "../../../utils/formatters";

const DepartmentInterviewCard = ({ interview }) => {
    return (
        <div>
            <h3 className="text-lg font-semibold text-zinc-100 mb-2">Department Interview</h3>
            <p>Status: {interview?.status}</p>
            <p>Interviewer: {interview?.interviewer?.fullname || "Not specified"}</p>
            <p>Comment: {interview?.comment || "No comment provided."}</p>
            <p>Interviewed At: {formatDate(interview?.interviewedAt)}</p>
        </div>
    )
}

export default DepartmentInterviewCard;