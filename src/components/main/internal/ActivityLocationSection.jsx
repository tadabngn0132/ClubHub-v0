import React from "react";
import { useFormContext } from "react-hook-form";
import { useState } from "react";

const ActivityLocationSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [locationType, setLocationType] = useState("");

  const handleLocationTypeChange = (e) => {
    setLocationType(e.target.id);
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="location_type">
        Location Type <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center gap-1">
        <input
          type="radio"
          value="online"
          id="online"
          {...register("locationType", {
            required: "Location type cannot be empty",
          })}
          onChange={handleLocationTypeChange}
        />
        <label htmlFor="online">Online</label>
      </div>

      <div className="flex items-center gap-1">
        <input
          type="radio"
          value="in_person"
          id="in_person"
          {...register("locationType", {
            required: "Location type cannot be empty",
          })}
          onChange={handleLocationTypeChange}
        />
        <label htmlFor="in_person">In-person</label>
      </div>

      <div className="flex items-center gap-1">
        <input
          type="radio"
          value="hybrid"
          id="hybrid"
          {...register("locationType", {
            required: "Location type cannot be empty",
          })}
          onChange={handleLocationTypeChange}
        />
        <label htmlFor="hybrid">Hybrid</label>
      </div>
      {errors.locationType && (
        <p className="text-red-500">{errors.locationType.message}</p>
      )}

      {/* Need to implement more based on condition of location type */}
      {(locationType === "online" || locationType === "hybrid") && (
        <>
          <label htmlFor="meeting_platform">
            Meeting Platform <span className="text-red-500">*</span>
          </label>
          <select
            name="meeting_platform"
            id="meeting_platform"
            {...register("meetingPlatform", {
              required: "Meeting platform cannot be empty",
            })}
          >
            <option value="Google Meet">Google Meet</option>
            <option value="Zoom">Zoom</option>
            <option value="Microsoft Teams">Microsoft Teams</option>
            <option value="Other">Other</option>
          </select>
          {errors.meetingPlatform && (
            <p className="text-red-500">{errors.meetingPlatform.message}</p>
          )}

          <label htmlFor="meeting_link">
            Meeting Link <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="meeting_link"
            id="meeting_link"
            {...register("meetingLink", {
              required: "Meeting link cannot be empty",
            })}
          />
          {errors.meetingLink && (
            <p className="text-red-500">{errors.meetingLink.message}</p>
          )}

          <label htmlFor="meeting_id">
            Meeting ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="meeting_id"
            id="meeting_id"
            {...register("meetingId")}
          />

          <label htmlFor="meeting_password">Meeting Password</label>
          <input
            type="text"
            name="meeting_password"
            id="meeting_password"
            {...register("meetingPassword")}
          />
        </>
      )}

      {(locationType === "in_person" || locationType === "hybrid") && (
        <>
          <label htmlFor="venue_name">
            Venue Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="venue_name"
            id="venue_name"
            {...register("venueName", {
              required: "Venue name cannot be empty",
            })}
          />
          {errors.venueName && (
            <p className="text-red-500">{errors.venueName.message}</p>
          )}

          <label htmlFor="venue_address">
            Venue Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="venue_address"
            id="venue_address"
            {...register("venueAddress", {
              required: "Venue address cannot be empty",
            })}
          />
          {errors.venueAddress && (
            <p className="text-red-500">{errors.venueAddress.message}</p>
          )}

          <label htmlFor="room_number">Room Number</label>
          <input
            type="text"
            name="room_number"
            id="room_number"
            {...register("roomNumber")}
          />

          {/* TODO: Implement additional field when implemented Google Maps integration */}
        </>
      )}
    </div>
  );
};

export default ActivityLocationSection;
