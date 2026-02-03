import React from 'react'
import { useFormContext } from 'react-hook-form'

const ActivityLocationSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <div>
      <label htmlFor="location_type">Location Type <span className='text-red-500'>*</span></label>
      <input type="radio" name="location_type" id="online" {...register("location_type", {
        required: "Location type cannot be empty"
      })} />
      <label htmlFor="">Online</label>
      <input type="radio" name="location_type" id="in_person" {...register("location_type", {
        required: "Location type cannot be empty"
      })} />
      <label htmlFor="">In-person</label>
      <input type="radio" name="location_type" id="hybrid" {...register("location_type", {
        required: "Location type cannot be empty"
      })} />
      <label htmlFor="">Hybrid</label>

      {/* Need to implement more based on condition of location type */}
    </div>
  )
}

export default ActivityLocationSection