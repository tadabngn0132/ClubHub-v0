import { useForm } from "react-hook-form";

const TaskVerificationForm = ({ taskVerifyData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      isVerified: taskVerifyData?.isVerified || false,
      reviewerComments: taskVerifyData?.reviewerComments || "",
    },
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 p-6 bg-gray-900 rounded-lg shadow-lg border border-gray-800"
    >
      {/* Verified/Rejected */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-100">
          Verification Result <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              value="true"
              {...register("isVerified", {
                required: "Verification result is required",
              })}
              className="form-radio text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-100">Verified</span>
          </label>
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              value="false"
              {...register("isVerified", {
                required: "Verification result is required",
              })}
              className="form-radio text-red-600 focus:ring-red-500"
            />
            <span className="text-sm text-gray-100">Rejected</span>
          </label>
        </div>
        {errors.isVerified && (
          <p className="text-sm text-red-400 font-medium">
            {errors.isVerified.message}
          </p>
        )}
      </div>

      {/* Reviewer Comments */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="reviewer_comments"
          className="text-sm font-semibold text-gray-100"
        >
          Comments
        </label>
        <textarea
          id="reviewer_comments"
          rows="5"
          className="block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm
                  placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                  text-sm text-gray-100 bg-gray-800 resize-none"
          placeholder="Enter your reviewer comments..."
          {...register("reviewerComments")}
        />
        {errors.reviewerComments && (
          <p className="text-sm text-red-400 font-medium">
            {errors.reviewerComments.message}
          </p>
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

export default TaskVerificationForm;
