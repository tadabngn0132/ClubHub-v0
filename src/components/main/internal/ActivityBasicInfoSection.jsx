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
      {/* Activity Title */}
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
        className="mt-2 bg-slate-800 text-white border border-slate-600"
      />
      {errors.title && (
        <p className="text-red-500 text-sm">{errors.title.message}</p>
      )}

      {/* Activity Type */}
      <label htmlFor="activity_type">Activity Type</label>
      <select
        name="activity_type"
        id="activity_type"
        {...register("type", {
          required: "Activity type cannot be empty",
        })}
        className="mt-2 bg-slate-800 text-white border border-slate-600"
      >
        {Object.values(ACTIVITY_TYPES).map((type) => (
          <option key={type} value={type} className="bg-slate-800 text-white">
            {type}
          </option>
        ))}
      </select>
      {errors.type && (
        <p className="text-red-500 text-sm">{errors.type.message}</p>
      )}

      {/* Activity Status */}
      <label htmlFor="activity_status">Activity Status</label>
      <select
        name="activity_status"
        id="activity_status"
        {...register("status", {
          required: "Activity status cannot be empty",
        })}
        className="mt-2 bg-slate-800 text-white border border-slate-600"
      >
        {Object.values(ACTIVITY_STATUSES).map((status) => (
          <option key={status} value={status} className="bg-slate-800 text-white">
            {status}
          </option>
        ))}
      </select>
      {errors.status && (
        <p className="text-red-500 text-sm">{errors.status.message}</p>
      )}

      {/* Activity Thumbnail */}
      <label htmlFor="thumbnail">Activity Thumbnail</label>
      <input
        type="file"
        id="thumbnail"
        accept="image/*"
        {...register("thumbnail")}
        className="mt-2 bg-slate-800 text-white border border-slate-600"
      />
    </div>
  );
};

export default ActivityBasicInfoSection;
