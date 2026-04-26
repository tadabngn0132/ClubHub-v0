import { useForm } from "react-hook-form";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const DepartmentForm = ({ department, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: department ? department.name : "",
      description: department ? department.description : "",
      isActive: department ? department.isActive : true,
    },
  });

  const fieldClassName =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition duration-200 placeholder:text-white/35 hover:border-white/20 focus:border-[#db3f7a] focus:bg-white/8 focus:ring-4 focus:ring-[#db3f7a]/10";

  return (
    <div className="w-full px-2 sm:px-0">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111111] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.35)] sm:p-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(219,63,122,0.08),transparent_30%)]" />

        <div className="relative mb-6 flex flex-col gap-2 border-b border-white/10 pb-5 sm:mb-7 sm:pb-5">
          <h2 className="font-['Monument',sans-serif] text-2xl font-black uppercase tracking-[0.06em] text-white sm:text-[2rem]">
            {department ? "Edit Department" : "Create Department"}
          </h2>
          <p className="max-w-2xl text-sm leading-6 text-white/60 sm:text-[0.95rem]">
            Nhập thông tin cơ bản của ban để quản lý rõ ràng và nhất quán hơn.
          </p>
        </div>

        <div className="relative grid gap-5 sm:gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="name"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75"
            >
              Name <span className="text-[#ff8fb7]">*</span>
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: VALIDATION_MESSAGES.departmentNameMinLength,
                minLength: {
                  value: 2,
                  message: VALIDATION_MESSAGES.departmentNameMinLength,
                },
              })}
              className={fieldClassName}
              placeholder="Enter department name"
            />
            {errors.name && (
              <p className="text-sm text-[#ff8fb7]">{errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2.5">
            <label
              htmlFor="description"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75"
            >
              Description <span className="text-[#ff8fb7]">*</span>
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: VALIDATION_MESSAGES.departmentDescriptionMinLength,
                minLength: {
                  value: 10,
                  message: VALIDATION_MESSAGES.departmentDescriptionMinLength,
                },
              })}
              rows={4}
              className={`${fieldClassName} min-h-28 resize-y`}
              placeholder="Enter department description"
            />
            {errors.description && (
              <p className="text-sm text-[#ff8fb7]">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3.5">
            <label
              htmlFor="isActive"
              className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75"
            >
              Active
            </label>
            <label
              htmlFor="isActive"
              className="relative inline-flex cursor-pointer"
            >
              <input
                type="checkbox"
                id="isActive"
                {...register("isActive")}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-white/15 transition-colors duration-200 after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:duration-200 peer-checked:bg-[#db3f7a] peer-checked:after:translate-x-5 peer-focus:ring-4 peer-focus:ring-[#db3f7a]/20" />
            </label>
          </div>

          <button
            type="submit"
            className="relative mt-2 inline-flex w-full items-center justify-center rounded-xl bg-[#db3f7a] px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(219,63,122,0.25)] transition duration-200 hover:bg-[#c7376f] hover:shadow-[0_14px_32px_rgba(219,63,122,0.3)] active:bg-[#b93068] focus:outline-none focus:ring-4 focus:ring-[#db3f7a]/20"
          >
            {department ? "Save Department" : "Create Department"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
