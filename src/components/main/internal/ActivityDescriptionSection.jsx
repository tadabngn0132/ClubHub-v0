import React from "react";
import { useFormContext } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const ActivityDescriptionSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputClassName =
    "mt-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelClassName = "mt-3 text-sm font-semibold text-gray-100";
  const errorClassName = "mt-1 text-sm font-medium text-red-400";

  return (
    <div className="flex w-full flex-col">
      {/* TODO: Implement rich text editor for better description input */}
      <label htmlFor="activity_description" className="text-sm font-semibold text-gray-100">
        Activity Description <span className="text-red-400">*</span>
      </label>
      <textarea
        name="description"
        id="description"
        rows="5"
        className={inputClassName}
        {...register("description", {
          required: VALIDATION_MESSAGES.activityDescriptionMinLength,
          minLength: {
            value: 10,
            message: VALIDATION_MESSAGES.activityDescriptionMinLength,
          },
          maxLength: {
            value: 5000,
            message: "Activity description cannot exceed 5000 characters",
          },
        })}
      ></textarea>
      {errors.description && (
        <p className={errorClassName}>{errors.description.message}</p>
      )}

      {/* Is Public */}
      <div className="mt-4 flex items-center rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-3">
        <input
          type="checkbox"
          id="isPublic"
          {...register("isPublic")}
          className="mr-2 h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="isPublic" className="text-sm text-gray-200">Is Public</label>
      </div>

      {/* Is Featured */}
      <div className="mt-2 flex items-center rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-3">
        <input
          type="checkbox"
          id="isFeatured"
          {...register("isFeatured")}
          className="mr-2 h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="isFeatured" className="text-sm text-gray-200">Is Featured</label>
      </div>

      {/* Priority */}
      <label htmlFor="priority" className={labelClassName}>
        Priority
      </label>
      <input
        type="number"
        id="priority"
        {...register("priority", {
          min: {
            value: 0,
            message: "Priority cannot be negative",
          },
        })}
        className={inputClassName}
      />
      {errors.priority && (
        <p className={errorClassName}>{errors.priority.message}</p>
      )}
    </div>
  );
};

export default ActivityDescriptionSection;
