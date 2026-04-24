// TODO(member-application): rebuild this form to manage one or many
// department interview records, including interviewer, department, notes,
// decision, and validation of the current workflow stage.
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMemberApplicationDepartmentInterview } from "../../../store/slices/memberApplicationSlice";
import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";
import { useParams } from "react-router-dom";

const MemberApplicationDepartmentInterviewForm = () => {
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
      comment: "",
      interviewerId: currentUser ? currentUser.id : null,
    },
  });

  const handleUpdateDepartmentInterview = async (data) => {
    await dispatch(updateMemberApplicationDepartmentInterview({ id: applicationId, departmentInterviewData: data })).unwrap();
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit(handleUpdateDepartmentInterview)}>
        <h1>Department Interview</h1>

        {/* Status selection fields */}
        <label htmlFor="status">
          Status <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          {...register("status", {
            required: VALIDATION_MESSAGES.interviewStatusRequired,
            validate: (value) =>
              ["passed", "failed"].includes(value) ||
              VALIDATION_MESSAGES.interviewStatusValueRequired,
          })}
        >
          <option value="pending">Pending</option>
          <option value="passed">Passed</option>
          <option value="failed">Failed</option>
        </select>
        {errors.status && <span>{errors.status.message}</span>}

        {/* Reviewer comment field */}
        <label htmlFor="comment">Comments</label>
        <textarea id="comment" rows={5} {...register("comment")} />
      </form>
    </div>
  );
};

export default MemberApplicationDepartmentInterviewForm;
