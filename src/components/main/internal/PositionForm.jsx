import { useForm } from "react-hook-form";

const PositionForm = ({ position, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: position ? position.title : "",
      level: position ? position.level : "",
      systemRole: position ? position.systemRole : "",
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
          <label htmlFor="title" className="text-sm font-semibold text-gray-100">
            Title
            <span className="text-red-400">*</span>
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter position title"
          />
          {errors.title && (
            <p className="text-sm font-medium text-red-400">{errors.title.message}</p>
          )}
        </div>

        {/* Level */}
        <div className="flex flex-col gap-2">
          <label htmlFor="level" className="text-sm font-semibold text-gray-100">
            Level
            <span className="text-red-400">*</span>
          </label>
          <input
            id="level"
            {...register("level", { required: "Level is required" })}
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Enter position level"
          />
          {errors.level && (
            <p className="text-sm font-medium text-red-400">{errors.level.message}</p>
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
            <p className="text-sm font-medium text-red-400">{errors.systemRole.message}</p>
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
