import React from 'react'
import { useFormContext } from 'react-hook-form'

const ActivityScheduleSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <label htmlFor="start_date_time">Activity Start Date/Time <span className='text-red-500'>*</span></label>
      <input type="datetime" name="start_date_time" id="start_date_time" {...register("start_date", {
        required: "Activity start date/time cannot be empty"
      })} />
      {errors.start_date && (
        <p className="text-red-500 text-sm">{errors.start_date.message}</p>
      )}

      <label htmlFor="end_date_time">Activity End Date/Time <span className='text-red-500'>*</span></label>
      <input type="datetime" name="end_date_time" id="end_date_time" {...register("end_date", {
        required: "Activity end date/time cannot be empty"
      })} />
      {errors.end_date && (
        <p className="text-red-500 text-sm">{errors.end_date.message}</p>
      )}

      {/* Future implement */}
      <label htmlFor="recurring_activity">Recurring Activity</label>
      <input type="checkbox" name="recurring_activity" id="recurring_activity" />
      <input type="checkbox" name="recurring_activity" id="recurring_activity" />
      <input type="checkbox" name="recurring_activity" id="recurring_activity" />
      <input type="checkbox" name="recurring_activity" id="recurring_activity" />
    </div>
  )
}

export default ActivityScheduleSection