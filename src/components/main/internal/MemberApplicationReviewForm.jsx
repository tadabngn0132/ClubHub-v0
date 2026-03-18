import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getMemberApplicationDetails,
    updateMemberApplicationCVReview,
    updateMemberApplicationFinalReview,
} from "../../../store/slices/memberApplicationSlice";
import { useParams } from "react-router-dom";
import { createNewDepartmentApplication } from "../../../store/slices/departmentApplicationSlice"

const MemberApplicationReviewForm = ({ mode, action }) => {
    const { memberApplicationId } = useParams();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.auth);
    const { isLoading, error } = useSelector((state) => state.memberApplication);
  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors }
   } = useForm({
    defaultValues: {
      cvReviewComment: "",
      interviewComment: "",
      finalReviewComment: "",
        cvReviewedBy: null,
        interviewedBy: null,
        finalReviewedBy: null,
        cvReviewedAt: null,
        interviewedAt: null,
        finalReviewedAt: null,
    },
    mode: "onChange",
   });

    useEffect(() => {
        const fetchData = async () => {
            if (mode === "edit") {
                const resData = await dispatch(getMemberApplicationDetails(memberApplicationId)).unwrap();
    
                if (resData) {
                    if (action === "cvreview" && resData.cvReviewComment) {
                        reset({
                            cvReviewComment: resData.cvReviewComment,
                            cvReviewedBy: resData.cvReviewedBy || null,
                            cvReviewedAt: resData.cvReviewedAt || null,
                        });
                    } else if (action === "interview" && resData.interviewComment) {
                        reset({
                            interviewComment: resData.interviewComment,
                            interviewedBy: resData.interviewer || null,
                            interviewedAt: resData.interviewedAt || null,
                        });
                     } else if (action === "finalreview" && resData.finalReviewComment) {
                        reset({
                            finalReviewComment: resData.finalReviewComment,
                            finalReviewedBy: resData.finalReviewer || null,
                            finalReviewedAt: resData.finalReviewedAt || null,
                        });
                    }
                }
            } else if (mode === "add") {
                if (action === "cvreview") {
                    reset({
                        cvReviewComment: "",
                        cvReviewedBy: null,
                        cvReviewedAt: null,
                    });
                } else if (action === "interview") {
                    reset({
                        interviewComment: "",
                        interviewedBy: null,
                        interviewedAt: null,
                    });
                } else if (action === "finalreview") {
                    reset({
                        finalReviewComment: "",
                        finalReviewedBy: null,
                        finalReviewedAt: null,
                    });
                }
            }
        }
        fetchData();
    }, [mode, action, memberApplicationId, dispatch, reset]);

  const handleSubmitForm = (data) => {
    // Handle form submission based on the action type
    if (action === "cvreview") {
        dispatch(updateMemberApplicationCVReview({ id: memberApplicationId, reviewData: data }));
    } else if (action === "interview") {
        dispatch(createNewDepartmentApplication({ memberApplicationId: memberApplicationId, departmentId: currentUser.userPosition[0].position.department.id, reviewData: data }));
    } else if (action === "finalreview") {
        dispatch(updateMemberApplicationFinalReview({ id: memberApplicationId, reviewData: data }));
    }
  };
    
  <div>
    <form action="" onSubmit={handleSubmit(handleSubmitForm)}>
        {(action === "cvreview") && (
            <>
                <label htmlFor="cvReviewComment">CV Review Comment <span className="text-red-500">*</span></label>
                <textarea id="cvReviewComment" name="cvReviewComment" rows="4" cols="50" {...register("cvReviewComment", { required: true })}></textarea>
                {errors.cvReviewComment && <span className="text-red-500">This field is required</span>}
            </>
        )}

        {(action === "interview") && (
            <>
                <label htmlFor="interviewComment">Interview Comment <span className="text-red-500">*</span></label>
                <textarea id="interviewComment" name="interviewComment" rows="4" cols="50" {...register("interviewComment", { required: true })}></textarea>
                {errors.interviewComment && <span className="text-red-500">This field is required</span>}
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