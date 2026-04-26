import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDepartmentsList } from "../../../store/slices/departmentSlice.js";

const PositionForm = ({ position, onSubmit }) => {
  const LEVEL_OPTIONS = [
    "MEMBER",
    "MIDDLE_VICE_HEAD",
    "MIDDLE_HEAD",
    "TOP_VICE_HEAD",
    "TOP_HEAD",
  ];

  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);

  useEffect(() => {
    dispatch(getDepartmentsList());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: position ? position.title : "",
      level: position ? position.level : "",
      systemRole: position ? position.systemRole : "",
      departmentId: position ? position.departmentId : "",
    },
  });

  const fieldClassName =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/35 hover:border-white/20 focus:border-[#db3f7a] focus:bg-white/8 focus:ring-4 focus:ring-[#db3f7a]/10";

  const selectClassName = `${fieldClassName} bg-[#171717] text-white [color-scheme:dark] [&>option]:bg-[#171717] [&>option]:text-white`;

  return (
    <div className="w-full px-2 sm:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,63,122,0.08),transparent_30%)]" />

        <div className="relative mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:mb-7 sm:pb-5">
          <h2 className="font-['Monument',sans-serif] text-2xl font-black uppercase tracking-[0.06em] text-white sm:text-[2rem]">
            {position ? "Edit Position" : "Create Position"}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-white/60 sm:text-[0.95rem]">
            Nhập thông tin cơ bản của vị trí, gọn gàng và dễ theo dõi hơn.
          </p>
        </div>

        <div className="relative grid gap-5 sm:gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="title"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75"
            >
              Title <span className="text-[#ff8fb7]">*</span>
            </label>
            <input
              id="title"
              {...register("title", {
                required: VALIDATION_MESSAGES.positionTitleMinLength,
                minLength: {
                  value: 2,
                  message: VALIDATION_MESSAGES.positionTitleMinLength,
                },
              })}
              className={fieldClassName}
              placeholder="Enter position title"
            />
            {errors.title && (
              <p className="text-sm text-[#ff8fb7]">{errors.title.message}</p>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {/* Level */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="level"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75"
              >
                Level <span className="text-[#ff8fb7]">*</span>
              </label>
              <select
                id="level"
                {...register("level", { required: "Level is required" })}
                className={selectClassName}
              >
                <option value="">Select level</option>
                {LEVEL_OPTIONS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
              {errors.level && (
                <p className="text-sm text-[#ff8fb7]">{errors.level.message}</p>
              )}
            </div>

            {/* Department */}
            <div className="flex flex-col gap-2.5">
              <label
                htmlFor="departmentId"
                className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75"
              >
                Department <span className="text-[#ff8fb7]">*</span>
              </label>
              <select
                id="departmentId"
                {...register("departmentId", {
                  required: "Department is required",
                })}
                className={selectClassName}
              >
                <option value="">Select department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.departmentId && (
                <p className="text-sm text-[#ff8fb7]">
                  {errors.departmentId.message}
                </p>
              )}
            </div>
          </div>

          {/* System Role */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="systemRole"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75"
            >
              System Role <span className="text-[#ff8fb7]">*</span>
            </label>
            <input
              id="systemRole"
              {...register("systemRole", {
                required: "System Role is required",
              })}
              className={fieldClassName}
              placeholder="Enter system role"
            />
            {errors.systemRole && (
              <p className="text-sm text-[#ff8fb7]">
                {errors.systemRole.message}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="relative mt-8 inline-flex w-full items-center justify-center rounded-xl bg-[#db3f7a] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(219,63,122,0.25)] transition duration-200 hover:bg-[#c7376f] hover:shadow-[0_14px_32px_rgba(219,63,122,0.3)] active:bg-[#b93068] focus:outline-none focus:ring-4 focus:ring-[#db3f7a]/20"
        >
          {position ? "Save Position" : "Create Position"}
        </button>
      </form>
    </div>
  );
};

export default PositionForm;
