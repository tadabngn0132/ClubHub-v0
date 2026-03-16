import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewTask,
  updateTaskById,
  getTaskDetails,
} from "../../../store/slices/taskSlice";
import { ASSIGNEE_SCOPE } from "../../../utils/constants";

const TaskForm = ({ mode, taskId }) => {
  const dispatch = useDispatch();
  const { task } = useSelector((state) => state.task);
  const { user } = useSelector((state) => state.auth);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      dueDate: "",
      status: "new",
      isCheckCf: false,
      assigneeScope: "all",
      assignorId: user ? user.id : null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (mode === "edit" && taskId) {
      dispatch(getTaskDetails(taskId));

      if (task) {
        reset({
          title: task.title,
          description: task.description,
          status: task.status || "new",
          dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : "",
          assigneeScope: task.assigneeScope || "all",
          assignorId: task.assignorId || user ? user.id : null,
          isCheckCf: task.isCheckCf || false,
        });
      }
    } else {
      reset({
        title: "",
        description: "",
        status: "new",
        dueDate: "",
        assigneeScope: "all",
        assignorId: user ? user.id : null,
        isCheckCf: false,
      });
    }
  }, [mode, taskId, reset, user, dispatch, task]);

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

        {/* Task Name field */}
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

        {/* Task Description field */}
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

        {/* Is Check Cf field */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isCheckCf"
            name="isCheckCf"
            {...register("isCheckCf")}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label htmlFor="isCheckCf" className="ml-2">
            Check Cf
            <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Status field */}
        <label htmlFor="status">Task Status <span className="text-red-500">*</span></label>
        <select
          id="status"
          name="status"
          {...register("status", { required: "Task status is required" })}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
          <option value="on-hold">On Hold</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}

        {/* Assignee Scope field */}
        {ASSIGNEE_SCOPE.length > 0 && (
          <>
            <label htmlFor="assigneeScope">Assignee Scope <span className="text-red-500">*</span></label>
            <select
              id="assigneeScope"
              name="assigneeScope"
              {...register("assigneeScope", { required: "Assignee scope is required" })}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ASSIGNEE_SCOPE.map((scope) => (
                <option key={scope.id} value={scope.value}>
                  {scope.name}
                </option>
              ))}
            </select>
            {errors.assigneeScope && <p className="text-red-500">{errors.assigneeScope.message}</p>}
          </>
        )}

        {/* Due Date field */}
        <label htmlFor="dueDate">Task Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          {...register("dueDate")}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dueDate && <p className="text-red-500">{errors.dueDate.message}</p>}

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
