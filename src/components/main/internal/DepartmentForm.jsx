import { useForm } from "react-hook-form";

const DepartmentForm = ({ department, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: department ? department.name : "",
      description: department ? department.description : "",
      isActive: department ? department.isActive : true,
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-white p-6 rounded shadow"
      >
        {/* Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
            <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            {...register("description", { required: "Description is required" })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Active Status */}
        <div className="mb-4">
          <label
            htmlFor="isActive"
            className="block text-sm font-medium text-gray-700"
          >
            Active
            <span className="text-red-500">*</span>
          </label>
          <input
            type="checkbox"
            id="isActive"
            {...register("isActive", { required: "Active status is required" })}
            className="mt-1 block"
          />
          {errors.isActive && (
            <p className="text-red-500 text-sm mt-1">{errors.isActive.message}</p>
          )}
        </div>
        
        <input
          type="submit"
          value={department ? "Save" : "Submit"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
};

export default DepartmentForm;
