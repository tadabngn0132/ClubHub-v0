// TODO(member-application): rebuild this form to show the final review
// summary, gather final decision and notes, validate role-based access, and
// submit the final transition back to the aggregate detail state.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMemberApplicationFinalReview } from "../../../store/slices/memberApplicationSlice";
import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";
import { useParams } from "react-router-dom";

const MemberApplicationFinalReviewForm = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { applicationId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "pending",
      finalReviewComment: "",
      finalReviewerId: currentUser ? currentUser.id : null,
    },
  });

  const handleUpdateFinalReview = async (data) => {
    await dispatch(updateMemberApplicationFinalReview({ id: applicationId, finalReviewData: data })).unwrap();
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleUpdateFinalReview)}>
        <h1>Final Review</h1>

        {/* Status selection fields */}
        <label htmlFor="status">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          {...register("status", {
            required: VALIDATION_MESSAGES.finalStatusRequired,
            validate: (value) =>
              ["passed", "failed"].includes(value) ||
              VALIDATION_MESSAGES.finalStatusValueRequired,
          })}
        >
          <option value="pending">Pending</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
        {errors.status && <span>{errors.status.message}</span>}

        {/* Reviewer comment field */}
        <label htmlFor="finalReviewComment">Comments</label>
        <textarea
          id="finalReviewComment"
          rows={5}
          {...register("finalReviewComment")}
        />
      </form>
    </div>
  );
};

export default MemberApplicationFinalReviewForm;
