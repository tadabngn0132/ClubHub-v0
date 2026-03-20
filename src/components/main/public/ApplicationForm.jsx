import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitMemberApplication } from "../../../store/slices/memberApplicationSlice";
import { useEffect } from "react";
import { getDepartmentsList, resetDepartmentStatus } from "../../../store/slices/departmentSlice";

const ApplicationForm = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      major: "",
      studentId: "",
      department: [],
    },
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getDepartmentsList());
    dispatch(resetDepartmentStatus());
  }, [dispatch]);

  const handleSaveApplication = (data) => {
    dispatch(submitMemberApplication(data));
    reset();
  };

  const inputClassName =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white/80 px-4 py-2.5 text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100";

  const labelClassName = "mt-4 text-sm font-semibold text-slate-700";

  const errorClassName = "mt-1 text-sm font-medium text-red-600";

  return (
    <div className="relative mx-auto w-full my-[var(--pub-main-margin-y)] max-w-3xl overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-100 via-sky-50 to-amber-100 p-4 sm:p-8">
      <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-amber-300/30 blur-3xl" />

      <form
        onSubmit={handleSubmit(handleSaveApplication)}
        className="relative rounded-2xl border border-white/60 bg-white/85 p-5 shadow-xl backdrop-blur-sm sm:p-8"
      >
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
          Club Member Application
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Fill in your details to apply for your preferred department.
        </p>

        {/* Full Name field */}
        <label htmlFor="fullname" className={labelClassName}>
          Full name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullname"
          placeholder="Nguyen Van Hai"
          className={inputClassName}
          {...register("fullname", { required: "Full name cannot be empty" })}
        />
        {errors.fullname && (
          <p className={errorClassName}>{errors.fullname.message}</p>
        )}

        {/* Email field */}
        <label htmlFor="email" className={labelClassName}>
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          placeholder="HaiNV240875@fpt.edu.vn"
          className={inputClassName}
          {...register("email", {
            required: "Email cannot be empty",
            pattern: {
              value: /^[A-Za-z0-9]+@fpt\.edu\.vn$/,
              message: "Email must have @fpt.edu.vn tail",
            },
          })}
        />
        {errors.email && (
          <p className={errorClassName}>{errors.email.message}</p>
        )}

        {/* Phone number field */}
        <label htmlFor="phoneNumber" className={labelClassName}>
          Phone number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          placeholder="0387512345"
          className={inputClassName}
          {...register("phoneNumber", {
            required: "Phone number cannot be empty",
            minLength: {
              value: 10,
              message: "Phone number must contain exactly 10 digits",
            },
            maxLength: {
              value: 10,
              message: "Phone number must contain exactly 10 digits",
            },
          })}
        />
        {errors.phoneNumber && (
          <p className={errorClassName}>{errors.phoneNumber.message}</p>
        )}

        {/* Department field */}
        <label htmlFor="department" className={labelClassName}>
          Department <span className="text-red-500">*</span>
        </label>
        <select
          id="department"
          className={inputClassName}
          {...register("department", { required: "Department cannot be empty" })}
        >
          <option value="">Select a department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.department && (
          <p className={errorClassName}>{errors.department.message}</p>
        )}

        {/* Date of Birth field */}
        <label htmlFor="dateOfBirth" className={labelClassName}>
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dateOfBirth"
          className={inputClassName}
          {...register("dateOfBirth", {
            required: "Date of birth cannot be empty",
          })}
        />
        {errors.dateOfBirth && (
          <p className={errorClassName}>{errors.dateOfBirth.message}</p>
        )}

        {/* Gender field */}
        <label htmlFor="gender" className={labelClassName}>
          Gender <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <label
            htmlFor="male"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-pink-400 hover:bg-pink-50"
          >
            <input
              type="radio"
              id="male"
              value="male"
              className="h-4 w-4 accent-pink-600"
              {...register("gender", { required: "Gender cannot be empty" })}
            />
            Male
          </label>

          <label
            htmlFor="female"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-pink-400 hover:bg-pink-50"
          >
            <input
              type="radio"
              id="female"
              value="female"
              className="h-4 w-4 accent-pink-600"
              {...register("gender", { required: "Gender cannot be empty" })}
            />
            Female
          </label>

          <label
            htmlFor="other"
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-pink-400 hover:bg-pink-50"
          >
            <input
              type="radio"
              id="other"
              value="other"
              className="h-4 w-4 accent-pink-600"
              {...register("gender", { required: "Gender cannot be empty" })}
            />
            Other
          </label>
        </div>
        {errors.gender && (
          <p className={errorClassName}>{errors.gender.message}</p>
        )}

        {/* Major field */}
        <label htmlFor="major" className={labelClassName}>
          Major <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="major"
          placeholder="Computing"
          className={inputClassName}
          {...register("major", { required: "Major cannot be empty" })}
        />
        {errors.major && (
          <p className={errorClassName}>{errors.major.message}</p>
        )}

        {/* Student ID field */}
        <label htmlFor="studentId" className={labelClassName}>
          Student ID <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="studentId"
          placeholder="GDH234567"
          className={inputClassName}
          {...register("studentId", { required: "Student ID cannot be empty" })}
        />
        {errors.studentId && (
          <p className={errorClassName}>{errors.studentId.message}</p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-pink-200"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
