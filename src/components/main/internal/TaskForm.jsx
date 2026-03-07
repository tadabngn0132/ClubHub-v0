import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewTask,
  updateTaskById,
  getTaskDetails
} from "../../store/slices/taskSlice";

const TaskForm = ({ mode, taskId }) => {
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

  const dispatch = useDispatch();
  const { taskDetails } = useSelector((state) => state.task);
  useEffect(() => {
    if (mode === "edit" && taskId) {
      dispatch(getTaskDetails(taskId));

      if (taskDetails) {
        reset({
          taskName: taskDetails.name,
          taskDescription: taskDetails.description,
          isCompleteTask: taskDetails.isComplete,
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
    <div>
      <h1>{mode === "create" ? "Create Task" : "Edit Task"}</h1>

      <form action="" onSubmit={handleSubmit(handleSaveData)}>
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          id="taskName"
          name="taskName"
          {...register("taskName", { required: "Task name is required" })}
        />
        {errors.taskName && (
          <p className="text-red-500">{errors.taskName.message}</p>
        )}

        <label htmlFor="taskDescription">Task Description</label>
        <textarea
          id="taskDescription"
          name="taskDescription"
          {...register("taskDescription", {
            required: "Task description is required",
          })}
        ></textarea>
        {errors.taskDescription && (
          <p className="text-red-500">{errors.taskDescription.message}</p>
        )}

        <label htmlFor="isCompleteTask">Is Complete</label>
        <input
          type="checkbox"
          id="isCompleteTask"
          name="isCompleteTask"
          {...register("isCompleteTask")}
        />

        <label htmlFor="taskDueDate">Task Due Date</label>
        <input
          type="date"
          id="taskDueDate"
          name="taskDueDate"
          {...register("taskDueDate")}
        />

        <button type="submit">
          {mode === "create" ? "Create" : "Update"} Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
