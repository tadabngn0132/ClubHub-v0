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
    "relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-10";

  const headerPillClassName =
    "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-white/70";

  const sectionCardClassName =
    "mt-5 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6";

  const fieldLabelClassName =
    "text-xs font-semibold uppercase tracking-[0.16em] text-white/75";

  const fieldGroupClassName = "flex flex-col gap-2.5";

  const inputClassName =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/35 hover:border-white/20 focus:border-[#db3f7a] focus:bg-white/8 focus:ring-4 focus:ring-[#db3f7a]/10";

  const selectClassName = `${inputClassName} bg-[#171717] [color-scheme:dark] [&>option]:bg-[#171717] [&>option]:text-white`;

  const textareaClassName = `${inputClassName} min-h-28 resize-y`;

  const checkboxCardClassName =
    "flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:border-white/20 hover:bg-white/8";

  const checkboxClassName =
    "h-4 w-4 rounded border-white/20 text-[#db3f7a] focus:ring-[#db3f7a]/20";

  const errorClassName = "text-sm text-[#ff8fb7]";

  const buttonClassName =
    "relative mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#db3f7a] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(219,63,122,0.25)] transition duration-200 hover:bg-[#c7376f] hover:shadow-[0_14px_32px_rgba(219,63,122,0.3)] active:bg-[#b93068] focus:outline-none focus:ring-4 focus:ring-[#db3f7a]/20 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/45 disabled:shadow-none disabled:hover:bg-white/10 disabled:hover:shadow-none disabled:focus:ring-0";

  return (
    <div className="w-full px-4 py-6 sm:px-6 lg:px-0">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className={shellClassName}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,63,122,0.08),transparent_30%)]" />

        <div className="relative mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:mb-7 sm:pb-5">
          <h1 className="font-['Monument',sans-serif] text-2xl font-black uppercase tracking-[0.06em] text-white sm:text-[2rem]">
            {!task ? "Create Task" : "Edit Task"}
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-white/60 sm:text-[0.95rem]">
            Enter task information in a clean, readable, and consistent way with
            the other admin forms.
          </p>
        </div>

        <div className="relative grid gap-6 sm:gap-7">
          <div className={sectionCardClassName}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
              Task Details
            </h2>
            <div className="mt-5 space-y-5">
              <div className={fieldGroupClassName}>
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
                  <p className={`${errorClassName} mt-1`}>
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className={fieldGroupClassName}>
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
                  <p className={`${errorClassName} mt-1`}>
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className={sectionCardClassName}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
              Scheduling
            </h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2 sm:gap-6">
              <div className={fieldGroupClassName}>
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
                  <p className={`${errorClassName} mt-1`}>
                    {errors.status.message}
                  </p>
                )}
              </div>

              <div className={fieldGroupClassName}>
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
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                  <label htmlFor="isCheckCf" className={fieldLabelClassName}>
                    Check Confirmation <span className="text-rose-500">*</span>
                  </label>
                  <div className="mt-4 flex items-center gap-3">
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
                      className="text-sm text-white/75"
                    >
                      Require check confirmation before completion
                    </label>
                  </div>
                  {errors.isCheckCf && (
                    <p className={`${errorClassName} mt-1`}>
                      {errors.isCheckCf.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {ASSIGNEE_SCOPE.length > 0 && (
          <div className={sectionCardClassName}>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
              Assignment
            </h2>

            <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-6">
              <div className={fieldGroupClassName}>
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
                  <p className={`${errorClassName} mt-1`}>
                    {errors.assigneeScope.message}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/60">
                Choose the assignees for this task. The list below changes based
                on the selected scope.
              </div>
            </div>

            {selectedAssigneeScope === "depts" && (
              <div className="mt-6">
                <label className={`${fieldLabelClassName} block`}>
                  Assign to Departments
                </label>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
                      <span className="text-sm font-medium text-white/80">
                        {department.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedAssigneeScope === "members" && (
              <div className="mt-6">
                <label className={`${fieldLabelClassName} block`}>
                  Assign to Members
                </label>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
                      <span className="text-sm font-medium text-white/80">
                        {user.fullname}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 border-t border-white/10 pt-5">
          <p className="mb-4 text-sm text-white/55">
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
