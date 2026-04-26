import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsList } from "../../../store/slices/departmentSlice.js";

const PositionForm = ({ position, onSubmit }) => {
  const LEVEL_OPTIONS = [
    "MEMBER",
    "MIDDLE_VICE_HEAD",
    "MIDDLE_HEAD",
    "TOP_VICE_HEAD",
    "TOP_HEAD",
  ];

  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);

  useEffect(() => {
    dispatch(getDepartmentsList());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: position ? position.title : "",
      level: position ? position.level : "",
      systemRole: position ? position.systemRole : "",
      departmentId: position ? position.departmentId : "",
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-xl"
      >
        {/* Title */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="title"
            className="text-sm font-semibold text-gray-100"
          >
            Title
            <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            {...register("title", {
              required: VALIDATION_MESSAGES.positionTitleMinLength,
              minLength: {
                value: 2,
                message: VALIDATION_MESSAGES.positionTitleMinLength,
              },
            })}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter position title"
          />
          {errors.title && (
            <p className="text-sm font-medium text-red-400">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Level */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="level"
            className="text-sm font-semibold text-gray-100"
          >
            Level
            <span className="text-red-400">*</span>
          </label>
          <select
            id="level"
            {...register("level", { required: "Level is required" })}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select level</option>
            {LEVEL_OPTIONS.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
          {errors.level && (
            <p className="text-sm font-medium text-red-400">
              {errors.level.message}
            </p>
          )}
        </div>

        {/* System Role */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="systemRole"
            className="text-sm font-semibold text-gray-100"
          >
            System Role
            <span className="text-red-400">*</span>
          </label>
          <input
            id="systemRole"
            {...register("systemRole", { required: "System Role is required" })}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter system role"
          />
          {errors.systemRole && (
            <p className="text-sm font-medium text-red-400">
              {errors.systemRole.message}
            </p>
          )}
        </div>

        {/* Department */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="departmentId"
            className="text-sm font-semibold text-gray-100"
          >
            Department
            <span className="text-red-400">*</span>
          </label>
          <select
            id="departmentId"
            {...register("departmentId", { required: "Department is required" })}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">Select department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
          {errors.departmentId && (
            <p className="text-sm font-medium text-red-400">
              {errors.departmentId.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {position ? "Save" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PositionForm;
