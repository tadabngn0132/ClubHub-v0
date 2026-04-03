import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { VALIDATION_MESSAGES, VALIDATION_RULES } from "../../../utils/validationRules";

const ActivityLocationSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [locationType, setLocationType] = useState("");

  const handleLocationTypeChange = (e) => {
    setLocationType(e.target.id);
  };

  const inputClassName =
    "mt-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelClassName = "mt-3 text-sm font-semibold text-gray-100";
  const errorClassName = "mt-1 text-sm font-medium text-red-400";

  return (
    <div className="flex w-full flex-col">
      <label htmlFor="location_type" className="text-sm font-semibold text-gray-100">
        Location Type <span className="text-red-400">*</span>
      </label>
      <div className="mt-2 flex flex-wrap gap-3">
        <label htmlFor="online" className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-200">
          <input
            type="radio"
            value="online"
            id="online"
            className="h-4 w-4 border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
            {...register("locationType", {
              required: "Location type cannot be empty",
            })}
            onChange={handleLocationTypeChange}
          />
          Online
        </label>

        <label htmlFor="in_person" className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-200">
          <input
            type="radio"
            value="in_person"
            id="in_person"
            className="h-4 w-4 border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
            {...register("locationType", {
              required: "Location type cannot be empty",
            })}
            onChange={handleLocationTypeChange}
          />
          In-person
        </label>

        <label htmlFor="hybrid" className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-200">
          <input
            type="radio"
            value="hybrid"
            id="hybrid"
            className="h-4 w-4 border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
            {...register("locationType", {
              required: "Location type cannot be empty",
            })}
            onChange={handleLocationTypeChange}
          />
          Hybrid
        </label>
      </div>
      {errors.locationType && (
        <p className={errorClassName}>{errors.locationType.message}</p>
      )}

      {/* Need to implement more based on condition of location type */}
      {(locationType === "online" || locationType === "hybrid") && (
        <>
          <label htmlFor="" className={labelClassName}>
            Meet link will be automatically generated and added to the activity details after saving.
          </label>
        </>
      )}

      {(locationType === "in_person" || locationType === "hybrid") && (
        <>
          <label htmlFor="venue_name" className={labelClassName}>
            Venue Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="venue_name"
            id="venue_name"
            {...register("venueName", {
              required: VALIDATION_MESSAGES.venueNameRequired,
            })}
            className={inputClassName}
          />
          {errors.venueName && (
            <p className={errorClassName}>{errors.venueName.message}</p>
          )}

          <label htmlFor="venue_address" className={labelClassName}>
            Venue Address <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="venue_address"
            id="venue_address"
            {...register("venueAddress", {
              required: VALIDATION_MESSAGES.venueAddressRequired,
            })}
            className={inputClassName}
          />
          {errors.venueAddress && (
            <p className={errorClassName}>{errors.venueAddress.message}</p>
          )}

          <label htmlFor="room_number" className={labelClassName}>Room Number</label>
          <input
            type="text"
            name="room_number"
            id="room_number"
            className={inputClassName}
            {...register("roomNumber")}
          />

          {/* TODO: Implement additional field when implemented Google Maps integration */}
        </>
      )}
    </div>
  );
};

export default ActivityLocationSection;
