import React from "react";
import { useFormContext } from "react-hook-form";

const ActivityScheduleSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      {/* Activity Start Date/Time */}
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

      {/* Activity End Date/Time */}
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

      {/* Activity Max Participants */}
      <label htmlFor="max_participants" className="mt-4">
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
        className="mt-2 bg-slate-800 text-white border border-slate-600"
      />
      {errors.maxParticipants && (
        <p className="text-red-500">{errors.maxParticipants.message}</p>
      )}

      {/* Activity Registration Deadline */}
      <label htmlFor="registration_deadline" className="mt-4">
        Activity Registration Deadline
      </label>
      <input
        type="datetime-local"
        id="registration_deadline"
        {...register("registrationDeadline")}
        className="mt-2 bg-slate-800 text-white border border-slate-600"
      />
      {errors.registrationDeadline && (
        <p className="text-red-500">{errors.registrationDeadline.message}</p>
      )}

      {/* Activity Registration Required */}
      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          id="requireRegistration"
          {...register("requireRegistration")}
          className="mr-2"
        />
        <label htmlFor="requireRegistration">Registration Required</label>
      </div>
    </div>
  );
};

export default ActivityScheduleSection;
