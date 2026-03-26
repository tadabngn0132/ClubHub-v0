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
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-6 rounded shadow"
      >
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
            Title
            <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            {...register("title", { required: "Title is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Level */}
        <div className="mb-4">
          <label htmlFor="level" className="block text-gray-700 font-bold mb-2">
            Level
            <span className="text-red-500">*</span>
          </label>
          <input
            id="level"
            {...register("level", { required: "Level is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.level && (
            <p className="text-red-500 text-sm mt-1">{errors.level.message}</p>
          )}
        </div>

        {/* System Role */}
        <div className="mb-4">
          <label
            htmlFor="systemRole"
            className="block text-gray-700 font-bold mb-2"
          >
            System Role
            <span className="text-red-500">*</span>
          </label>
          <input
            id="systemRole"
            {...register("systemRole", { required: "System Role is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.systemRole && (
            <p className="text-red-500 text-sm mt-1">{errors.systemRole.message}</p>
          )}
        </div>
        
        <input
          type="submit"
          value={position ? "Save" : "Submit"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form>
    </div>
  );
};

export default PositionForm;
