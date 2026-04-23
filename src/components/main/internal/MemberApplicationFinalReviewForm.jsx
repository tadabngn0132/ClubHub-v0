import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules.js";

const MemberApplicationFinalReviewForm = () => {
  return (
    <div>
      <p className="text-sm text-slate-300">
        Final review details will be displayed here. Click "Accept" or "Reject"
        to update the final review status of the application.
      </p>
    </div>
  );
};

export default MemberApplicationFinalReviewForm;
