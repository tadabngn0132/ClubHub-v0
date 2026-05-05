import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../../store/slices/userSlice.js";

const ActivityScheduleSection = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const [isRegistrationRequired, setIsRegistrationRequired] = useState(false);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const designatedParticipantsValue = watch("designatedParticipantIds");

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);

  useEffect(() => {
    // Update isSelectAll when designatedParticipantsValue changes
    if (users.length > 0 && designatedParticipantsValue) {
      const allSelected = users.every((user) =>
        designatedParticipantsValue.includes(user.id.toString()),
      );
      setIsSelectAll(allSelected);
    } else {
      setIsSelectAll(false);
    }
  }, [designatedParticipantsValue, users]);

  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setIsSelectAll(checked);
    if (checked) {
      // Select all users
      const allUserIds = users.map((user) => user.id.toString());
      setValue("designatedParticipantIds", allUserIds);
    } else {
      // Deselect all users
      setValue("designatedParticipantIds", []);
    }
  };

  const startDateValue = watch("startDate");

  const inputClassName =
    "mt-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelClassName = "mt-3 text-sm font-semibold text-gray-100";
  const errorClassName = "mt-1 text-sm font-medium text-red-400";

  return (
    <div className="flex w-full flex-col">
      {/* Activity Start Date/Time */}
      <label
        htmlFor="start_date_time"
        className="text-sm font-semibold text-gray-100"
      >
        Activity Start Date/Time <span className="text-red-400">*</span>
      </label>
      <input
        type="datetime-local"
        name="start_date_time"
        id="start_date_time"
        className={inputClassName}
        {...register("startDate", {
          required: VALIDATION_MESSAGES.activityStartDateRequired,
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
          required: VALIDATION_MESSAGES.activityEndDateRequired,
          validate: (value) => {
            if (!value) return VALIDATION_MESSAGES.activityEndDateRequired;
            if (!startDateValue) return true;
            return (
              new Date(value).getTime() > new Date(startDateValue).getTime() ||
              VALIDATION_MESSAGES.activityEndDateInvalid
            );
          },
        })}
      />
      {errors.endDate && (
        <p className={errorClassName}>{errors.endDate.message}</p>
      )}

      {/* Activity Registration Required */}
      <div className="mt-4 flex items-center rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-3">
        <input
          type="checkbox"
          id="requireRegistration"
          {...register("requireRegistration")}
          className="mr-2 h-4 w-4 rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
          onChange={(e) => setIsRegistrationRequired(e.target.checked)}
        />
        <label htmlFor="requireRegistration" className="text-sm text-gray-200">
          Registration Required
        </label>
      </div>

      {isRegistrationRequired ? (
        <>
          {/* Activity Registration Deadline */}
          <label
            htmlFor="registration_deadline"
            className="mt-4 text-sm font-semibold text-gray-100"
          >
            Activity Registration Deadline
          </label>
          <input
            type="datetime-local"
            id="registration_deadline"
            {...register("registrationDeadline")}
            className={inputClassName}
          />
          {errors.registrationDeadline && (
            <p className={errorClassName}>
              {errors.registrationDeadline.message}
            </p>
          )}

          {/* Activity Max Participants */}
          <label
            htmlFor="max_participants"
            className="mt-4 text-sm font-semibold text-gray-100"
          >
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
        </>
      ) : (
        <>
          {/* Nếu không yêu cầu đăng ký, vẫn cần gửi giá trị mặc định cho registrationDeadline và maxParticipants */}
          <input type="hidden" {...register("registrationDeadline")} />
          <input type="hidden" {...register("maxParticipants")} />
          <div className="mt-4 rounded-lg border border-gray-700 bg-gray-80/50 p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-200">
              Designate Participants (Optional)
            </h3>
            <p className="mb-4 text-xs text-gray-400">
              Select members who must attend this activity
            </p>

            <div className="max-h-64 space-y-2 overflow-y-auto">
              {/* Select All Checkbox */}
              <div className="sticky top-0 mb-3 border-b border-gray-600 bg-gray-800/80 p-2">
                <label className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-700/50">
                  <input
                    type="checkbox"
                    checked={isSelectAll}
                    onChange={handleSelectAll}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-100">
                    Select All
                  </span>
                </label>
              </div>

              {/* Individual User Checkboxes */}
              {users.map((user) => (
                <label
                  key={user.id}
                  className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-700/50"
                >
                  <input
                    type="checkbox"
                    value={user.id}
                    {...register("designatedParticipantIds")}
                    className="h-4 w-4 rounded border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-200">{user.fullname}</span>
                </label>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityScheduleSection;
