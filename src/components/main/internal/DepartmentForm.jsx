import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const DepartmentForm = ({ department, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: department ? department.name : "",
      description: department ? department.description : "",
      isActive: department ? department.isActive : true,
    },
  });

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto flex w-full max-w-xl flex-col gap-5 rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-xl"
      >
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-gray-100"
          >
            Name
            <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: VALIDATION_MESSAGES.departmentNameMinLength,
              minLength: {
                value: 2,
                message: VALIDATION_MESSAGES.departmentNameMinLength,
              },
            })}
            className="block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter department name"
          />
          {errors.name && (
            <p className="text-sm font-medium text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-100"
          >
            Description
            <span className="text-red-400">*</span>
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: VALIDATION_MESSAGES.departmentDescriptionMinLength,
              minLength: {
                value: 10,
                message: VALIDATION_MESSAGES.departmentDescriptionMinLength,
              },
            })}
            rows={4}
            className="block w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter department description"
          />
          {errors.description && (
            <p className="text-sm font-medium text-red-400">{errors.description.message}</p>
          )}
        </div>

        {/* Active Status */}
        <div className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-950/60 px-4 py-3">
          <label
            htmlFor="isActive"
            className="text-sm font-semibold text-gray-100"
          >
            Active
            <span className="text-red-400">*</span>
          </label>
          <input
            type="checkbox"
            id="isActive"
            {...register("isActive")}
            className="h-5 w-5 cursor-pointer rounded border-gray-600 bg-gray-800 text-blue-500 focus:ring-blue-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          {department ? "Save" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default DepartmentForm;
