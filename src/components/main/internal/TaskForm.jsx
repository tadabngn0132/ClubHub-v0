import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ASSIGNEE_SCOPE } from "../../../utils/constants";
import { getDepartmentsList } from "../../../store/slices/departmentSlice";
import { getUsersList } from "../../../store/slices/userSlice";

const TaskForm = ({ task, onSubmit }) => {
  const dispatch = useDispatch();
  const [allClub, setAllClub] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { departments } = useSelector((state) => state.department);
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getDepartmentsList());
    dispatch(getUsersList());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: task ? task.title : "",
      description: task ? task.description : "",
      dueDate: task ? new Date(task.dueDate).toISOString().split("T")[0] : "",
      status: task ? task.status : "new",
      isCheckCf: task ? task.isCheckCf : false,
      assigneeScope: task ? task.assigneeScope : "all",
      assignorId: task ? task.assignorId : currentUser.id,
      allClub: task ? task.allClub : false,
      departmentIds: task ? task.departmentIds : [],
      userIds: task ? task.userIds : [],
      excludedUserIds: task ? task.excludedUserIds : [],
    },
    mode: "onChange",
  });

  return (
    <div className="px-4">
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
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
            className="mt-2 bg-slate-800 text-white border border-slate-600"
          />
          <label htmlFor="isCheckCf" className="ml-2">
            Check Cf
            <span className="text-red-500">*</span>
          </label>
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

        {/* Due Date field */}
        <label htmlFor="dueDate">Task Due Date</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          {...register("dueDate")}
          className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dueDate && (
          <p className="text-red-500">{errors.dueDate.message}</p>
        )}

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="allClub"
            name="allClub"
            {...register("allClub")}
            className="bg-slate-800 text-white border border-slate-600"
            onChange={(e) => setAllClub(e.target.checked)}
          />
          <label htmlFor="allClub">Assign to All Club</label>
        </div>

        {!allClub && (
          <>
            <label htmlFor="departmentIds">Assign to Departments</label>
            <select
              id="departmentIds"
              name="departmentIds"
              {...register("departmentIds")}
              className="mt-2 bg-slate-800 text-white border border-slate-600"
            >
              {departments.map((department) => (
                <option
                  key={department.id}
                  value={department.id}
                  className="bg-slate-800 text-white"
                >
                  {department.name}
                </option>
              ))}
            </select>
          </>
        )}

        <label htmlFor="excludedUserIds">Exclude Specific Users</label>
        <select
          id="excludedUserIds"
          name="excludedUserIds"
          {...register("excludedUserIds")}
          className="mt-2 bg-slate-800 text-white border border-slate-600"
        >
          {users.map((user) => (
            <option
              key={user.id}
              value={user.id}
              className="bg-slate-800 text-white"
            >
              {user.fullname}
            </option>
          ))}
        </select>

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
