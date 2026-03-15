import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  createNewDepartment,
  getDepartmentDetails,
  updateDepartmentById,
} from "../../../store/slices/departmentSlice";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import Loading from "../../../components/layout/internal/Loading";

const DepartmentForm = ({ mode, departmentId }) => {
  const dispatch = useDispatch();
  const { department, isLoading, error } = useSelector(
    (state) => state.department,
  );

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (mode === "edit" && departmentId) {
      dispatch(getDepartmentDetails(departmentId));

      if (department) {
        reset({
          name: department.name,
          description: department.description,
          isActive: department.isActive,
        });
      }
    } else if (mode === "add") {
      reset({
        name: "",
        description: "",
        isActive: true,
      });
    }
  }, [dispatch, mode, departmentId, reset, department]);

  const handleSaveData = (data) => {
    if (mode === "add") {
      dispatch(createNewDepartment(data));
    } else if (mode === "edit") {
      dispatch(
        updateDepartmentById({ id: departmentId, departmentData: data }),
      );
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSaveData)}
        className="max-w-md mx-auto bg-white p-6 rounded shadow"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="isActive"
            className="block text-sm font-medium text-gray-700"
          >
            Active
          </label>
          <input
            type="checkbox"
            id="isActive"
            {...register("isActive")}
            className="mt-1 block"
          />
        </div>
        <input
          type="submit"
          value={mode === "add" ? "Submit" : "Save"}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        />
      </form>
    </div>
  );
};

export default DepartmentForm;
