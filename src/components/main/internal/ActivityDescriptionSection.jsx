import React from "react";
import { useFormContext } from "react-hook-form";

const ActivityDescriptionSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      {/* TODO: Implement rich text editor for better description input */}
      <label htmlFor="activity_description">
        Activity Description <span className="text-red-500">*</span>
      </label>
      <textarea
        name="activity_description"
        id="activity_description"
        rows="5"
        {...register("activity_description", {
          required: "Activity description cannot be empty",
          maxLength: {
            value: 500,
            message: "Activity description cannot exceed 500 characters",
          },
        })}
      ></textarea>
      {errors.activity_description && (
        <p className="text-red-500">{errors.activity_description.message}</p>
      )}

      {/* Is Public */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="isPublic"
          {...register("isPublic")}
          className="mr-2"
        />
        <label htmlFor="isPublic">Is Public</label>
      </div>

      {/* Is Featured */}
      <div className="flex items-center mt-2">
        <input
          type="checkbox"
          id="isFeatured"
          {...register("isFeatured")}
          className="mr-2"
        />
        <label htmlFor="isFeatured">Is Featured</label>
      </div>

      {/* Priority */}
      <label htmlFor="priority" className="mt-4">
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
        className="mt-2 bg-slate-800 text-white border border-slate-600"
      />
      {errors.priority && (
        <p className="text-red-500">{errors.priority.message}</p>
      )}
    </div>
  );
};

export default ActivityDescriptionSection;
