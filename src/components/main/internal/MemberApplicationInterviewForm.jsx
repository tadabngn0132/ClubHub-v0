import { useForm } from "react-hook-form";

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
    
  <div>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
        {(action === "interview") && (
            <>
                <label htmlFor="interviewComment">Interview Comment <span className="text-red-500">*</span></label>
                <textarea id="interviewComment" name="interviewComment" rows="4" cols="50" {...register("interviewComment", { required: true })}></textarea>
                {errors.interviewComment && <span className="text-red-500">This field is required</span>}
            </>
        )}
    </form>
  </div>
};

export default MemberApplicationInterviewForm;