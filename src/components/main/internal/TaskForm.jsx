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
      taskName: "",
      taskDescription: "",
      isCompleteTask: false,
      taskDueDate: "",
    },
    mode: "onChange",
  });

  const { taskDetails } = useSelector((state) => state.task);

  useEffect(() => {
    if (mode === "edit" && taskId) {
      dispatch(getTaskDetails(taskId));

      if (taskDetails) {
        reset({
          taskName: taskDetails.title,
          taskDescription: taskDetails.description,
          isCompleteTask: taskDetails.isCompleted || false,
          taskDueDate: taskDetails.dueDate
            ? new Date(taskDetails.dueDate).toISOString().split("T")[0]
            : "",
        });
      }
    } else {
      reset({
        taskName: "",
        taskDescription: "",
        isCompleteTask: false,
        taskDueDate: "",
      });
    }
  }, [mode, taskId, reset]);

  const handleSaveData = (data) => {
    if (mode === "add") {
      dispatch(createNewTask(data));
    } else if (mode === "edit") {
      dispatch(updateTaskById({ id: taskId, ...data }));
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

        <label htmlFor="taskName">
          Task Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          {...register("taskName", { required: "Task name is required" })}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.taskName && (
          <p className="text-red-500">{errors.taskName.message}</p>
        )}

        <label htmlFor="taskDescription">
          Task Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="taskDescription"
          name="taskDescription"
          {...register("taskDescription", {
            required: "Task description is required",
          })}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.taskDescription && (
          <p className="text-red-500">{errors.taskDescription.message}</p>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isCompleteTask"
            name="isCompleteTask"
            {...register("isCompleteTask")}
          />
          <label htmlFor="isCompleteTask">Is Complete</label>
        </div>

        <label htmlFor="taskDueDate">Task Due Date</label>
        <input
          type="date"
          id="taskDueDate"
          name="taskDueDate"
          {...register("taskDueDate")}
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
