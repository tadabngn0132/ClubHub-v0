import React from "react";
import { useFormContext } from "react-hook-form";

const ActivityScheduleSection = () => {
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
      {/* Activity Start Date/Time */}
      <label htmlFor="start_date_time" className="text-sm font-semibold text-gray-100">
        Activity Start Date/Time <span className="text-red-400">*</span>
      </label>
      <input
        type="datetime-local"
        name="start_date_time"
        id="start_date_time"
        className={inputClassName}
        {...register("startDate", {
          required: "Activity start date/time cannot be empty",
        })}
      />
      {errors.startDate && (
        <p className={errorClassName}>{errors.startDate.message}</p>
      )}

      {/* Activity End Date/Time */}
      <label htmlFor="end_date_time" className={labelClassName}>
        Activity End Date/Time <span className="text-red-400">*</span>
      </label>
      <input
        type="datetime-local"
        name="end_date_time"
        id="end_date_time"
        className={inputClassName}
        {...register("endDate", {
          required: "Activity end date/time cannot be empty",
        })}
      />
      {errors.endDate && (
        <p className={errorClassName}>{errors.endDate.message}</p>
      )}

      {/* Activity Max Participants */}
      <label htmlFor="max_participants" className="mt-4 text-sm font-semibold text-gray-100">
        Activity Max Participants
      </label>
      <input
        type="number"
        id="max_participants"
        {...register("maxParticipants", {
          min: {
            value: 1,
            message: "Max participants cannot be less than 1",
          },
        })}
        className={inputClassName}
      />
      {errors.maxParticipants && (
        <p className={errorClassName}>{errors.maxParticipants.message}</p>
      )}

      {/* Activity Registration Deadline */}
      <label htmlFor="registration_deadline" className="mt-4 text-sm font-semibold text-gray-100">
        Activity Registration Deadline
      </label>
      <input
        type="datetime-local"
        id="registration_deadline"
        {...register("registrationDeadline")}
        className={inputClassName}
      />
      {errors.registrationDeadline && (
        <p className={errorClassName}>{errors.registrationDeadline.message}</p>
      )}

      {/* Activity Registration Required */}
      <div className="mt-4 flex items-center rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-3">
        <input
          type="checkbox"
          id="requireRegistration"
          {...register("requireRegistration")}
          className="mr-2 h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="requireRegistration" className="text-sm text-gray-200">Registration Required</label>
      </div>
    </div>
  );
};

export default ActivityScheduleSection;
