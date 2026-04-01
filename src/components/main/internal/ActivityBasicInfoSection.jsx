import React from "react";
import { useFormContext } from "react-hook-form";
import { ACTIVITY_TYPES, ACTIVITY_STATUSES } from "../../../utils/constants";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const ActivityBasicInfoSection = () => {
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
      {/* Activity Title */}
      <label htmlFor="title" className="text-sm font-semibold text-gray-100">
        Activity Title <span className="text-red-400">*</span>
      </label>
      <input
        type="text"
        id="title"
        {...register("title", {
          required: VALIDATION_MESSAGES.activityTitleMinLength,
          minLength: {
            value: 3,
            message: VALIDATION_MESSAGES.activityTitleMinLength,
          },
          maxLength: {
            value: 200,
            message: "Activity title cannot exceed 200 characters",
          },
        })}
        className={inputClassName}
      />
      {errors.title && (
        <p className={errorClassName}>{errors.title.message}</p>
      )}

      {/* Activity Type */}
      <label htmlFor="activity_type" className={labelClassName}>Activity Type</label>
      <select
        name="activity_type"
        id="activity_type"
        {...register("type", {
          required: "Activity type cannot be empty",
        })}
        className={inputClassName}
      >
        {Object.values(ACTIVITY_TYPES).map((type) => (
          <option key={type} value={type} className="bg-gray-800 text-gray-100">
            {type}
          </option>
        ))}
      </select>
      {errors.type && (
        <p className={errorClassName}>{errors.type.message}</p>
      )}

      {/* Activity Status */}
      <label htmlFor="activity_status" className={labelClassName}>Activity Status</label>
      <select
        name="activity_status"
        id="activity_status"
        {...register("status", {
          required: "Activity status cannot be empty",
        })}
        className={inputClassName}
      >
        {Object.values(ACTIVITY_STATUSES).map((status) => (
          <option key={status} value={status} className="bg-gray-800 text-gray-100">
            {status}
          </option>
        ))}
      </select>
      {errors.status && (
        <p className={errorClassName}>{errors.status.message}</p>
      )}

      {/* Activity Thumbnail */}
      <label htmlFor="thumbnail" className={labelClassName}>Activity Thumbnail</label>
      <input
        type="file"
        id="thumbnail"
        accept="image/*"
        {...register("thumbnail")}
        className="mt-2 w-full cursor-pointer rounded-md border border-gray-700 bg-gray-800 p-2 text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-blue-500/15 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-blue-300 hover:file:bg-blue-500/30"
      />
    </div>
  );
};

export default ActivityBasicInfoSection;
