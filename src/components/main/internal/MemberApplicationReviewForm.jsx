import { useForm } from "react-hook-form";

const MemberApplicationReviewForm = ({ memberApplication, action, onSubmit }) => {
  const { 
    register,
    handleSubmit,
    formState: { errors }
   } = useForm({
    defaultValues: {
      cvReviewComment: memberApplication ? memberApplication.cvReviewComment : "",
      finalReviewComment: memberApplication ? memberApplication.finalReviewComment : "",
        cvReviewedBy: memberApplication ? memberApplication.cvReviewedBy : null,
        finalReviewedBy: memberApplication ? memberApplication.finalReviewedBy : null,
        cvReviewedAt: memberApplication ? memberApplication.cvReviewedAt : null,
        finalReviewedAt: memberApplication ? memberApplication.finalReviewedAt : null,
    },
    mode: "onChange",
   });
    
  <div>
    <form action="" onSubmit={handleSubmit(onSubmit)}>
        {(action === "cvreview") && (
            <>
                <label htmlFor="cvReviewComment">CV Review Comment <span className="text-red-500">*</span></label>
                <textarea id="cvReviewComment" name="cvReviewComment" rows="4" cols="50" {...register("cvReviewComment", { required: true })}></textarea>
                {errors.cvReviewComment && <span className="text-red-500">This field is required</span>}
            </>
        )}

        {(action === "finalreview") && (
            <>
                <label htmlFor="finalReviewComment">Final Review Comment <span className="text-red-500">*</span></label>
                <textarea id="finalReviewComment" name="finalReviewComment" rows="4" cols="50" {...register("finalReviewComment", { required: true })}></textarea>
                {errors.finalReviewComment && <span className="text-red-500">This field is required</span>}
            </>
        )}
    </form>
  </div>
};

export default MemberApplicationReviewForm;