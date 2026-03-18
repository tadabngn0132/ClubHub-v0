import React from "react";
import { useFormContext } from "react-hook-form";

const ActivityScheduleSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      <label htmlFor="start_date_time">
        Activity Start Date/Time <span className="text-red-500">*</span>
      </label>
      <input
        type="datetime-local"
        name="start_date_time"
        id="start_date_time"
        {...register("startDate", {
          required: "Activity start date/time cannot be empty",
        })}
      />
      {errors.startDate && (
        <p className="text-red-500 text-sm">{errors.startDate.message}</p>
      )}

      <label htmlFor="end_date_time">
        Activity End Date/Time <span className="text-red-500">*</span>
      </label>
      <input
        type="datetime-local"
        name="end_date_time"
        id="end_date_time"
        {...register("endDate", {
          required: "Activity end date/time cannot be empty",
        })}
      />
      {errors.endDate && (
        <p className="text-red-500 text-sm">{errors.endDate.message}</p>
      )}
    </div>
  );
};

export default ActivityScheduleSection;
