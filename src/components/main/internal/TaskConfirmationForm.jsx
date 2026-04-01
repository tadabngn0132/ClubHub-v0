import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const TaskConfirmationForm = ({ taskCfData, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            evidence: null,
            evidenceUrl: taskCfData?.evidenceUrl || "",
            additionalComments: taskCfData?.additionalComments || "",
        },
        mode: "onChange",
    });

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        formData.append("evidenceUrl", data.evidenceUrl);
        formData.append("additionalComments", data.additionalComments);

        if (data.evidence && data.evidence[0]) {
            formData.append("evidence", data.evidence[0]);
        }

        onSubmit(formData);
    };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-6 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800">
        {/* Evidence File Input */}
        <div className="flex flex-col gap-2">
            <label htmlFor="evidence" className="text-sm font-semibold text-gray-100">
                Evidence <span className="text-red-400">*</span>
            </label>
            <div className="relative">
                <input
                    type="file"
                    id="evidence"
                    accept="image/*"
                    className="block w-full text-sm text-gray-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-blue-900 file:text-blue-200
                      hover:file:bg-blue-800
                      cursor-pointer border border-gray-700 rounded-md p-2 bg-gray-800
                      focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    {...register("evidence", { required: "Evidence is required" })}
                />
            </div>
            {errors.evidence && (
                <p className="text-sm text-red-400 font-medium">{errors.evidence.message}</p>
            )}
        </div>

        {/* Additional Comments */}
        <div className="flex flex-col gap-2">
            <label htmlFor="additional_comments" className="text-sm font-semibold text-gray-100">
                Comments <span className="text-red-400">*</span>
            </label>
            <textarea
                id="additional_comments"
                rows="5"
                className="block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm
                  placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                  text-sm text-gray-100 bg-gray-800 resize-none"
                placeholder="Enter your additional comments..."
                {...register("additionalComments", {
                    required: VALIDATION_MESSAGES.commentMinLength,
                    minLength: {
                        value: 10,
                        message: VALIDATION_MESSAGES.commentMinLength,
                    },
                })}
            />
            {errors.additionalComments && (
                <p className="text-sm text-red-400 font-medium">{errors.additionalComments.message}</p>
            )}
        </div>

        {/* Submit Button */}
        <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800
              text-white font-semibold py-2 px-4 rounded-md
              transition duration-200 ease-in-out
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
            Submit
        </button>
    </form>
  );
};

export default TaskConfirmationForm;