// TODO(member-application): rebuild this form to display the current CV review
// data, collect reviewer notes and decision, validate allowed transitions, and
// submit through the memberApplication review thunk.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMemberApplicationCVReview } from "../../../store/slices/memberApplicationSlice";
import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const MemberApplicationCvReviewForm = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "pending",
      cvReviewComment: "",
      cvReviewerId: currentUser ? currentUser.id : null,
    },
  });

  const handleUpdateCVReview = async (data) => {
    await dispatch(updateMemberApplicationCVReview(data)).unwrap();
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleUpdateCVReview)}>
        <h1>CV Review</h1>

        {/* Status selection fields */}
        <label htmlFor="status">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          {...register("status", {
            required: VALIDATION_MESSAGES.cvStatusRequired,
            validate: (value) =>
              ["passed", "failed"].includes(value) ||
              VALIDATION_MESSAGES.cvStatusValueRequired,
          })}
        >
          <option value="pending">Pending</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
        {errors.status && <span>{errors.status.message}</span>}

        {/* Reviewer comment field */}
        <label htmlFor="cvReviewComment">Comments</label>
        <textarea
          id="cvReviewComment"
          rows={5}
          {...register("cvReviewComment")}
        />
      </form>
    </div>
  );
};

export default MemberApplicationCvReviewForm;
