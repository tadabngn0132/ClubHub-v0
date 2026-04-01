import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const MemberApplicationInterviewForm = ({ departmentMemberApplication, onSubmit }) => {
  const { 
    register,
    handleSubmit,
    formState: { errors }
   } = useForm({
    defaultValues: {
      interviewComment: departmentMemberApplication ? departmentMemberApplication.interviewComment : "",
        interviewedBy: departmentMemberApplication ? departmentMemberApplication.interviewedBy : null,
        interviewedAt: departmentMemberApplication ? departmentMemberApplication.interviewedAt : null,
    },
    mode: "onChange",
   });

  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="interviewComment">Interview Comment <span className="text-red-500">*</span></label>
      <textarea id="interviewComment" name="interviewComment" rows="4" cols="50" {...register("interviewComment", { required: VALIDATION_MESSAGES.interviewCommentRequired })}></textarea>
      {errors.interviewComment && <span className="text-red-500">{errors.interviewComment.message}</span>}
      </form>
    </div>
  );
};

export default MemberApplicationInterviewForm;