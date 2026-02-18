import React from "react";
import { useFormContext } from "react-hook-form";
import { ACTIVITY_TYPES, ACTIVITY_STATUSES } from "../../../utils/constants";

const ActivityBasicInfoSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label htmlFor="title">
        Activity Title <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="title"
        {...register("title", {
          required: "Activity title cannot be empty.",
          maxLength: 200,
        })}
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      <label htmlFor="activity_type">Activity Type</label>
      <select
        name="activity_type"
        id="activity_type"
        {...register("type", {
          required: "Activity type cannot be empty",
        })}
      >
        {Object.values(ACTIVITY_TYPES).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      {errors.type && (
        <p className="text-red-500 text-sm">{errors.type.message}</p>
      )}

      <label htmlFor="activity_status">Activity Status</label>
      <select
        name="activity_status"
        id="activity_status"
        {...register("status", {
          required: "Activity status cannot be empty",
        })}
      >
        {Object.values(ACTIVITY_STATUSES).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      {errors.status && (
        <p className="text-red-500 text-sm">{errors.status.message}</p>
      )}
    </div>
  );
};

export default ActivityBasicInfoSection;
