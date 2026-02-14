import React from 'react'
import { useFormContext } from 'react-hook-form'

const ActivityBasicInfoSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div className='flex flex-col'>
      <label htmlFor="title">Activity Title <span className="text-red-500">*</span></label>
      <input type="text" id='title' {...register("title", {
        required: "Activity title cannot be empty.",
        maxLength: 200
      })}/>
      {errors.title && (
        <p className="text-red-500 text-sm">{ errors.title.message}</p>
      )}

      <label htmlFor="activity_type">Activity Type</label>
      <select name="activity_type" id="activity_type" {...register("type", {
        required: "Activity type cannot be empty"
      })}>
        <option value="workshop">Workshop</option>
        <option value="showcase">Showcase</option>
        <option value="performance">Performance</option>
        <option value="training">Training</option>
        <option value="meeting">Meeting</option>
        <option value="other">Other</option>
      </select>
      {errors.type && (
        <p className="text-red-500 text-sm">{errors.type.message}</p>
      )}

      <label htmlFor="activity_status">Activity Status</label>
      <select name="activity_status" id="activity_status" {...register("status", {
        required: "Activity status cannot be empty"
      })}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
        <option value="cancelled">Cancelled</option>
        <option value="completed">Completed</option>
      </select>
      {errors.status && (
        <p className="text-red-500 text-sm">{errors.status.message}</p>
      )}
    </div>
  )
}

export default ActivityBasicInfoSection