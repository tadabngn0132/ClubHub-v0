import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useState } from 'react'

const ActivityLocationSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  const [locationType, setLocationType] = useState("");

  const handleLocationTypeChange = (e) => {
    setLocationType(e.target.id);
  }

  return (
    <div>
      <label htmlFor="location_type">Location Type <span className='text-red-500'>*</span></label>
      <input type="radio" name="location_type" id="online" {...register("location_type", {
        required: "Location type cannot be empty"
      })} onChange={handleLocationTypeChange} />
      <label htmlFor="online">Online</label>
      <input type="radio" name="location_type" id="in_person" {...register("location_type", {
        required: "Location type cannot be empty"
      })} onChange={handleLocationTypeChange} />
      <label htmlFor="in_person">In-person</label>
      <input type="radio" name="location_type" id="hybrid" {...register("location_type", {
        required: "Location type cannot be empty"
      })} onChange={handleLocationTypeChange} />
      <label htmlFor="hybrid">Hybrid</label>
      {errors.location_type && <p className='text-red-500'>{errors.location_type.message}</p>}

      {/* Need to implement more based on condition of location type */}
      {(locationType === "online" || locationType === "hybrid") && (
        <>
          <label htmlFor='meeting_platform'>Meeting Platform <span className='text-red-500'>*</span></label>
          <select name="meeting_platform" id="meeting_platform" {...register("meeting_platform", {
            required: "Meeting platform cannot be empty"
          })}>
            <option value="Google Meet">Google Meet</option>
            <option value="Zoom">Zoom</option>
            <option value="Microsoft Teams">Microsoft Teams</option>
            <option value="Other">Other</option>
          </select>
          {errors.meeting_platform && <p className='text-red-500'>{errors.meeting_platform.message}</p>}

          <label htmlFor='meeting_link'>Meeting Link <span className='text-red-500'>*</span></label>
          <input type="text" name="meeting_link" id="meeting_link" {...register("meeting_link", {
            required: "Meeting link cannot be empty"
          })} />
          {errors.meeting_link && <p className='text-red-500'>{errors.meeting_link.message}</p>}

          <label htmlFor="meeting_id">Meeting ID <span className='text-red-500'>*</span></label>
          <input type="text" name="meeting_id" id="meeting_id" {...register("meeting_id")} />

          <label htmlFor="meeting_passcode">Meeting Password</label>
          <input type="text" name="meeting_passcode" id="meeting_passcode" {...register("meeting_passcode")} />
        </>
      )}

      {(locationType === "in-person" || locationType === "hybrid") && (
        <>
          <label htmlFor='venue_name'>Venue Name <span className='text-red-500'>*</span></label>
          <input type="text" name="venue_name" id="venue_name" {...register("venue_name", {
            required: "Venue name cannot be empty"
          })} />
          {errors.venue_name && <p className='text-red-500'>{errors.venue_name.message}</p>}
          
          <label htmlFor='venue_address'>Venue Address <span className='text-red-500'>*</span></label>
          <input type="text" name="venue_address" id="venue_address" {...register("venue_address", {
            required: "Venue address cannot be empty"
          })} />
          {errors.venue_address && <p className='text-red-500'>{errors.venue_address.message}</p>}

          <label htmlFor='room_number'>Room Number</label>
          <input type="text" name="room_number" id="room_number" {...register("room_number")} />

          {/* TODO: Implement additional field when implemented Google Maps integration */}
        </>
      )}
    </div>
  )
}

export default ActivityLocationSection