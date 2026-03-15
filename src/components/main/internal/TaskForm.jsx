import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewTask,
  updateTaskById,
  getTaskDetails,
} from "../../../store/slices/taskSlice";

const TaskForm = ({ mode, taskId }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      isCompleted: false,
      dueDate: "",
    },
    mode: "onChange",
  });

  const { taskDetails } = useSelector((state) => state.task);

  useEffect(() => {
    if (mode === "edit" && taskId) {
      dispatch(getTaskDetails(taskId));

      if (taskDetails) {
        reset({
          title: taskDetails.title,
          description: taskDetails.description,
          isCompleted: taskDetails.isCompleted || false,
          dueDate: taskDetails.dueDate
            ? new Date(taskDetails.dueDate).toISOString().split("T")[0]
            : "",
        });
      }
    } else {
      reset({
        title: "",
        description: "",
        isCompleted: false,
        dueDate: "",
      });
    }
  }, [mode, taskId, reset]);

  const handleSaveData = (data) => {
    if (mode === "add") {
      dispatch(createNewTask(data));
    } else if (mode === "edit") {
      dispatch(updateTaskById({ id: taskId, taskData: data }));
    }
  };

  return (
    <div className="px-4">
      <form
        action=""
        onSubmit={handleSubmit(handleSaveData)}
        className="flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold mb-4">
          {mode === "add" ? "Add New Task" : "Edit Task"}
        </h1>

        <label htmlFor="title">
          Task Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          {...register("title", { required: "Task name is required" })}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <label htmlFor="description">
          Task Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          {...register("description", {
            required: "Task description is required",
          })}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCompleted"
            name="isCompleted"
            {...register("isCompleted")}
          />
          <label htmlFor="isCompleted">Is Complete</label>
        </div>

        <label htmlFor="dueDate">Task Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          {...register("dueDate")}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white"
        >
          {mode === "add" ? "Add" : "Update"} Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
