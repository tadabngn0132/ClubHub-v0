import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASSIGNEE_SCOPE } from "../../../utils/constants";
import { getDepartmentsList } from "../../../store/slices/departmentSlice";
import { getUsersList } from "../../../store/slices/userSlice";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const TaskForm = ({ task, onSubmit }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { departments } = useSelector((state) => state.department);
  const { users } = useSelector((state) => state.user);
  const [selectedAssigneeScope, setSelectedAssigneeScope] = useState(
    task ? task.assigneeScope : "all",
  );

  useEffect(() => {
    dispatch(getDepartmentsList());
    dispatch(getUsersList());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      dueDate: task ? new Date(task.dueDate).toISOString().split("T")[0] : "",
      status: task ? task.status : "new",
      isCheckCf: task ? task.isCheckCf : false,
      assignorId: task ? task.assignorId : currentUser.id,
      assigneeScope: task ? task.assigneeScope : "all",
      departmentIds: task ? task.departmentIds : [],
      userIds: task ? task.userIds : [],
    },
    mode: "onChange",
  });

  const handleDisableSave = () => {
    if (task) {
      return !isDirty;
    }
    return !isValid;
  };

  return (
    <div className="px-4">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold mb-4">
          {!task ? "Add New Task" : "Edit Task"}
        </h1>

        {/* Task Name field */}
        <label htmlFor="title">
          Task Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          {...register("title", {
            required: VALIDATION_MESSAGES.taskTitleMinLength,
            minLength: {
              value: 3,
              message: VALIDATION_MESSAGES.taskTitleMinLength,
            },
          })}
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
            required: VALIDATION_MESSAGES.taskDescriptionMinLength,
            minLength: {
              value: 10,
              message: VALIDATION_MESSAGES.taskDescriptionMinLength,
            },
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
            {...register("isCheckCf", { required: "Please indicate if task needs check confirmation" })}
            className="mt-2 bg-slate-800 text-white border border-slate-600"
          />
          <label htmlFor="isCheckCf" className="ml-2">
            Check Cf
            <span className="text-red-500">*</span>
          </label>
          {errors.isCheckCf && (
            <p className="text-red-500">{errors.isCheckCf.message}</p>
          )}
        </div>

        {/* Status field */}
        <label htmlFor="status">
          Task Status <span className="text-red-500">*</span>
        </label>
        <select
          id="status"
          name="status"
          {...register("status", { required: "Task status is required" })}
          className="mt-2 bg-slate-800 text-white border border-slate-600"
        >
          <option value="new" className="bg-slate-800 text-white">
            New
          </option>
          <option value="in-progress" className="bg-slate-800 text-white">
            In Progress
          </option>
          <option value="done" className="bg-slate-800 text-white">
            Done
          </option>
          <option value="cancelled" className="bg-slate-800 text-white">
            Cancelled
          </option>
          <option value="on-hold" className="bg-slate-800 text-white">
            On Hold
          </option>
        </select>
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}

        {/* Due Date field */}
        <label htmlFor="dueDate">Task Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          {...register("dueDate", {
            validate: (value) => {
              if (value) {
                const selectedDate = new Date(value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                if (selectedDate < today) {
                  return "Due date cannot be in the past";
                }
              }
              return true;
            }
          })}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dueDate && (
          <p className="text-red-500">{errors.dueDate.message}</p>
        )}

        {/* Assignee Scope field */}
        {ASSIGNEE_SCOPE.length > 0 && (
          <>
            <label htmlFor="assigneeScope">
              Assignee Scope <span className="text-red-500">*</span>
            </label>
            <select
              id="assigneeScope"
              name="assigneeScope"
              {...register("assigneeScope", {
                required: "Assignee scope is required",
              })}
              className="mt-2 bg-slate-800 text-white border border-slate-600"
              onChange={(e) => setSelectedAssigneeScope(e.target.value)}
            >
              {ASSIGNEE_SCOPE.map((scope) => (
                <option
                  key={scope.id}
                  value={scope.value}
                  className="bg-slate-800 text-white"
                >
                  {scope.name}
                </option>
              ))}
            </select>
            {errors.assigneeScope && (
              <p className="text-red-500">{errors.assigneeScope.message}</p>
            )}
          </>
        )}

        {selectedAssigneeScope === "depts" && (
          <>
            <label htmlFor="departmentIds">Assign to Departments</label>
            {departments.map((department) => (
              <div key={department.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`dept-${department.id}`}
                  name="departmentIds"
                  value={department.id}
                  {...register("departmentIds")}
                  className="bg-slate-800 text-white border border-slate-600"
                />
                <label htmlFor={`dept-${department.id}`}>{department.name}</label>
              </div>
            ))}
          </>
        )}

        {selectedAssigneeScope === "members" && (
          <>
            <label htmlFor="userIds">Assign to Members</label>
            {users.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`user-${user.id}`}
                  name="userIds"
                  value={user.id}
                  {...register("userIds")}
                  className="bg-slate-800 text-white border border-slate-600"
                />
                <label htmlFor={`user-${user.id}`}>{user.fullname}</label>
              </div>
            ))}
          </>
        )}

        <button
          type="submit"
          className="inline-block border-1 border-[var(--pink-color)] rounded-lg p-2 py-1 text-[var(--pink-color)] text-sm/tight hover:bg-[var(--pink-color)] hover:text-white disabled:cursor-not-allowed disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-transparent disabled:hover:text-gray-500"
          disabled={handleDisableSave()}
        >
          {!task ? "Add" : "Update"} Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
