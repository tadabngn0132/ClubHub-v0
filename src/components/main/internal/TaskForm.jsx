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
    task ? task.assigneeScope.toLowerCase() : "all",
  );

  useEffect(() => {
    dispatch(getDepartmentsList());
    dispatch(getUsersList());
  }, [dispatch]);

  const memberIds =
    task && task.assigneeScope.toLowerCase() === "members"
      ? task.assignees.map((assignee) => String(assignee.assigneeId))
      : [];
  const departmentIds =
    task && task.assigneeScope.toLowerCase() === "depts"
      ? task.assignees.map((assignee) => String(assignee.user.rootDepartmentId))
      : [];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    defaultValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      dueDate: task ? new Date(task.dueDate).toISOString().split("T")[0] : "",
      status: task ? task.status.toLowerCase() : "new",
      isCheckCf: task ? task.isCheckCf : false,
      assignorId: task ? task.assignorId : currentUser.id,
      assigneeScope: task ? task.assigneeScope.toLowerCase() : "all",
      departmentIds: departmentIds,
      userIds: memberIds,
    },
    mode: "onChange",
  });

  const handleDisableSave = () => {
    if (task) {
      return !isDirty;
    }
    return !isValid;
  };

  const shellClassName =
    "w-full rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-2xl shadow-black/30 sm:p-6 lg:p-8";

  const headerPillClassName =
    "inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300";

  const sectionCardClassName =
    "rounded-2xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5";

  const fieldLabelClassName = "text-sm font-semibold text-slate-200";

  const inputClassName =
    "mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20";

  const selectClassName =
    "mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20";

  const textareaClassName =
    "mt-2 min-h-32 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition duration-200 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20";

  const checkboxCardClassName =
    "flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 transition hover:border-cyan-500/40 hover:bg-slate-900";

  const checkboxClassName =
    "mt-1 h-4 w-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500";

  const errorClassName = "mt-1 text-sm font-medium text-rose-400";

  const buttonClassName =
    "inline-flex items-center justify-center rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition duration-200 hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400";

  return (
    <div className="relative w-full px-4 py-6 sm:px-6 lg:px-0">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className={shellClassName}
      >
        <div className="mb-6 flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className={headerPillClassName}>
              {task ? "Edit mode" : "New task"}
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {!task ? "Create Task" : "Update Task"}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Simple, readable task form for assigning work to departments or
              members.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className={sectionCardClassName}>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
              Task Details
            </h2>
            <div className="mt-4 space-y-4">
              <div>
                <label htmlFor="title" className={fieldLabelClassName}>
                  Task Name <span className="text-rose-500">*</span>
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
                  className={inputClassName}
                  placeholder="Example: Prepare club workshop agenda"
                />
                {errors.title && (
                  <p className={errorClassName}>{errors.title.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className={fieldLabelClassName}>
                  Task Description <span className="text-rose-500">*</span>
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
                  className={textareaClassName}
                  placeholder="Describe the outcome, constraints, and any extra context the assignees need."
                />
                {errors.description && (
                  <p className={errorClassName}>{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          <div className={sectionCardClassName}>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
              Scheduling
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="status" className={fieldLabelClassName}>
                  Task Status <span className="text-rose-500">*</span>
                </label>
                <select
                  id="status"
                  name="status"
                  {...register("status", {
                    required: "Task status is required",
                  })}
                  className={selectClassName}
                >
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="on-hold">On Hold</option>
                </select>
                {errors.status && (
                  <p className={errorClassName}>{errors.status.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="dueDate" className={fieldLabelClassName}>
                  Task Due Date
                </label>
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
                    },
                  })}
                  className={inputClassName}
                />
                {errors.dueDate && (
                  <p className={errorClassName}>{errors.dueDate.message}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
                  <label htmlFor="isCheckCf" className={fieldLabelClassName}>
                    Check Confirmation <span className="text-rose-500">*</span>
                  </label>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="isCheckCf"
                      name="isCheckCf"
                      {...register("isCheckCf", {
                        required:
                          "Please indicate if task needs check confirmation",
                      })}
                      className={checkboxClassName}
                    />
                    <label
                      htmlFor="isCheckCf"
                      className="text-sm text-slate-300"
                    >
                      Require check confirmation before completion
                    </label>
                  </div>
                  {errors.isCheckCf && (
                    <p className={errorClassName}>{errors.isCheckCf.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {ASSIGNEE_SCOPE.length > 0 && (
          <div className={sectionCardClassName}>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">
              Assignment
            </h2>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <div>
                <label htmlFor="assigneeScope" className={fieldLabelClassName}>
                  Assignee Scope <span className="text-rose-500">*</span>
                </label>
                <select
                  id="assigneeScope"
                  name="assigneeScope"
                  {...register("assigneeScope", {
                    required: "Assignee scope is required",
                  })}
                  className={selectClassName}
                  onChange={(e) => setSelectedAssigneeScope(e.target.value)}
                >
                  {ASSIGNEE_SCOPE.map((scope) => (
                    <option key={scope.id} value={scope.value}>
                      {scope.name}
                    </option>
                  ))}
                </select>
                {errors.assigneeScope && (
                  <p className={errorClassName}>
                    {errors.assigneeScope.message}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-400">
                Choose who should receive this task. The list below changes
                based on the selected scope.
              </div>
            </div>

            {selectedAssigneeScope === "depts" && (
              <div className="mt-5">
                <label className={fieldLabelClassName}>
                  Assign to Departments
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {departments.map((department) => (
                    <label
                      key={department.id}
                      htmlFor={`dept-${department.id}`}
                      className={checkboxCardClassName}
                    >
                      <input
                        type="checkbox"
                        id={`dept-${department.id}`}
                        name="departmentIds"
                        value={department.id}
                        {...register("departmentIds")}
                        className={checkboxClassName}
                      />
                      <span className="text-sm font-medium text-slate-200">
                        {department.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedAssigneeScope === "members" && (
              <div className="mt-5">
                <label className={fieldLabelClassName}>Assign to Members</label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {users.map((user) => (
                    <label
                      key={user.id}
                      htmlFor={`user-${user.id}`}
                      className={checkboxCardClassName}
                    >
                      <input
                        type="checkbox"
                        id={`user-${user.id}`}
                        name="userIds"
                        value={user.id}
                        {...register("userIds")}
                        className={checkboxClassName}
                      />
                      <span className="text-sm font-medium text-slate-200">
                        {user.fullname}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">
            {!task
              ? "Create a new task assignment"
              : "Update the current task assignment"}
          </p>
          <button
            type="submit"
            className={buttonClassName}
            disabled={handleDisableSave()}
          >
            {!task ? "Add" : "Update"} Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
