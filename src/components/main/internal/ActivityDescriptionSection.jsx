import React from 'react'
import { useFormContext } from 'react-hook-form'

const ActivityDescriptionSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className='flex flex-col'>
      {/* TODO: Implement rich text editor for better description input */}
      <label htmlFor="activity_description">Activity Description <span className='text-red-500'>*</span></label>
      <textarea name="activity_description" id="activity_description" rows="5" {...register("activity_description", {
        required: "Activity description cannot be empty",
        maxLength: {
          value: 500,
          message: "Activity description cannot exceed 500 characters"
        }
      })}></textarea>
      {errors.activity_description && <p className='text-red-500'>{errors.activity_description.message}</p>}

      {/* Implement event agenda input or timeline builder */}
    </div>
  )
}

export default ActivityDescriptionSection