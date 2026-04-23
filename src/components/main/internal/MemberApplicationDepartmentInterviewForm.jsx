import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { formatUppercaseToCapitalized } from "../../../utils/formatters.js";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules.js";

const MemberApplicationDepartmentInterviewForm = () => {
  return (
    <div>
      <p className="text-sm text-slate-300">
        Department interview details will be displayed here. Click "Pass" or "Fail" to
        update the department interview status of the application.
      </p>
    </div>
  );
};

export default MemberApplicationDepartmentInterviewForm;
