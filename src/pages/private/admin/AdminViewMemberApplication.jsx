import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getMemberApplicationDetails } from "../../../store/slices/memberApplicationSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../../components/layout/internal/Loading";
import { formatDate } from "../../../utils/formatters";

const AdminViewMemberApplication = () => {
  const { memberApplicationId } = useParams();
  const dispatch = useDispatch();
  const { memberApplication, isLoading, error } = useSelector((state) => state.memberApplication);

  useEffect(() => {
    dispatch(getMemberApplicationDetails(memberApplicationId));
  }, [dispatch, memberApplicationId]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <h1>Member Application Details</h1>

      <div>
        <p>Applied At: {formatDate(memberApplication?.appliedAt)}</p>
        <p>Applied By: {memberApplication?.fullname || "N/A"}</p>
      </div>

      <p>Full Name: {memberApplication?.fullname || "N/A"}</p>
      <p>Email: {memberApplication?.email || "N/A"}</p>
      <p>Phone: {memberApplication?.phone || "N/A"}</p>
      <p>Date of Birth: {formatDate(memberApplication?.dateOfBirth)}</p>
      <p>Gender: {memberApplication?.gender || "N/A"}</p>
      <p>Major: {memberApplication?.major || "N/A"}</p>
      <p>Student ID: {memberApplication?.studentId || "N/A"}</p>
      <p>CV Status: {memberApplication?.cvStatus || "N/A"}</p>
      <p>CV Review Comment: {memberApplication?.cvReviewComment || "N/A"}</p>
      <p>CV Reviewed At: {formatDate(memberApplication?.cvReviewedAt)}</p>
      <p>CV Reviewed By: {memberApplication?.cvReviewer?.fullname || "N/A"}</p>
      <p>Interview Status: {memberApplication?.interviewStatus || "N/A"}</p>
      <p>Interview Comment: {memberApplication?.interviewComment || "N/A"}</p>
      <p>Interview At: {formatDate(memberApplication?.interviewedAt)}</p>
      <p>Interviewed By: {memberApplication?.interviewer?.fullname || "N/A"}</p>
      <p>Final Status: {memberApplication?.finalStatus || "N/A"}</p>
      <p>Final Review Comment: {memberApplication?.finalReviewComment || "N/A"}</p>
      <p>Final Reviewed At: {formatDate(memberApplication?.finalReviewedAt)}</p>
      <p>Final Reviewed By: {memberApplication?.finalReviewer?.fullname || "N/A"}</p>
    </div>
  );
};

export default AdminViewMemberApplication;
