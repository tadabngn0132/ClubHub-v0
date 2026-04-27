import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitMemberApplication } from "../../../store/slices/memberApplicationSlice";
import { useEffect, useState } from "react";
import {
  getDepartmentsList,
  resetDepartmentStatus,
} from "../../../store/slices/departmentSlice";
import {
  VALIDATION_MESSAGES,
  VALIDATION_RULES,
} from "../../../utils/validationRules";

// TODO(member-application): finish the public application flow here.
// Rebuild the full form, include all fields needed by the backend, validate
// the selected departments, support avatar upload if required, submit through
// the memberApplication slice, and show success/error feedback without losing
// the draft state too early.

const ApplicationForm = () => {
  const dispatch = useDispatch();
  const { departments } = useSelector((state) => state.department);
  const [selectedMainDeptId, setSelectedMainDeptId] = useState("");
  const [otherDeptIds, setOtherDeptIds] = useState([]);
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
      rootDepartmentId: "",
      departmentIds: [],
      avatar: null,
    },
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getDepartmentsList());
    dispatch(resetDepartmentStatus());
  }, [dispatch]);

  // Filter other departments when main department is selected
  useEffect(() => {
    if (!selectedMainDeptId) {
      setOtherDeptIds(departments);
    } else {
      const filtered = departments.filter(
        (dept) => dept.id !== parseInt(selectedMainDeptId),
      );
      setOtherDeptIds(filtered);
    }
  }, [selectedMainDeptId, departments]);

  const handleSaveApplication = (data) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("gender", data.gender);
    formData.append("major", data.major);
    formData.append("studentId", data.studentId);
    formData.append("rootDepartmentId", data.rootDepartmentId);

    if (data.departmentIds) {
      data.departmentIds.forEach((deptId) =>
        formData.append("departmentIds", deptId),
      );
    }

    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    dispatch(submitMemberApplication(formData));
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
          {...register("fullname", {
            required: VALIDATION_MESSAGES.fullNameRequired,
            minLength: {
              value: 2,
              message: VALIDATION_MESSAGES.fullNameRequired,
            },
          })}
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
          placeholder="hainvgdh240875@fpt.edu.vn"
          className={inputClassName}
          {...register("email", {
            ...VALIDATION_RULES.applicationEmail,
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
            ...VALIDATION_RULES.phoneNumber,
          })}
        />
        {errors.phoneNumber && (
          <p className={errorClassName}>{errors.phoneNumber.message}</p>
        )}

        {/* Main department field */}
        <label htmlFor="mainDepartment" className={labelClassName}>
          Main Department <span className="text-red-500">*</span>
        </label>
        <select
          id="mainDepartment"
          className={inputClassName}
          {...register("rootDepartmentId", {
            required: "Please select your main department",
          })}
          onChange={(e) => setSelectedMainDeptId(e.target.value)}
        >
          <option value="">Select your main department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>
              {dept.name}
            </option>
          ))}
        </select>
        {errors.rootDepartmentId && (
          <p className={errorClassName}>{errors.rootDepartmentId.message}</p>
        )}

        {/* Other department field */}
        <label htmlFor="department" className={labelClassName}>
          Other Departments
        </label>
        {/* Department checkbox */}
        <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {otherDeptIds.map((dept) => (
            <label
              key={dept.id}
              htmlFor={`dept-${dept.id}`}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-slate-700 transition hover:border-pink-400 hover:bg-pink-50"
            >
              <input
                type="checkbox"
                id={`dept-${dept.id}`}
                value={dept.id}
                className="h-4 w-4 accent-pink-600"
                {...register("departmentIds")}
              />
              {dept.name}
            </label>
          ))}
        </div>

        {/* Date of Birth field */}
        <label htmlFor="dateOfBirth" className={labelClassName}>
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="dateOfBirth"
          className={inputClassName}
          {...register("dateOfBirth", {
            required: VALIDATION_MESSAGES.dateOfBirthRequired,
            validate: (value) => {
              if (!value) return VALIDATION_MESSAGES.dateOfBirthRequired;
              return (
                new Date(value).getTime() <= Date.now() ||
                VALIDATION_MESSAGES.dateOfBirthFuture
              );
            },
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
              {...register("gender", {
                required: VALIDATION_MESSAGES.genderRequired,
              })}
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
              {...register("gender", {
                required: VALIDATION_MESSAGES.genderRequired,
              })}
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
              {...register("gender", {
                required: VALIDATION_MESSAGES.genderRequired,
              })}
            />
            Other
          </label>
        </div>
        {errors.gender && (
          <p className={errorClassName}>{errors.gender.message}</p>
        )}

        {/* Major field */}
        <label htmlFor="major" className={labelClassName}>
          Major <span className="text-red-400">*</span>
        </label>
        <select
          name="major"
          id="major"
          className={inputClassName}
          {...register("major", {
            required: VALIDATION_MESSAGES.majorRequired,
          })}
        >
          <option value="">Select your major</option>
          <option value="Computing">Computing</option>
          <option value="Graphic and Digital Design">
            Graphic and Digital Design
          </option>
          <option value="Media and Communications">
            Media and Communications
          </option>
          <option value="Business Management">Business Management</option>
        </select>
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
          {...register("studentId", VALIDATION_RULES.studentId)}
        />
        {errors.studentId && (
          <p className={errorClassName}>{errors.studentId.message}</p>
        )}

        {/* Avatar field */}
        <label htmlFor="avatar" className={labelClassName}>
          Avatar
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          className="mt-2 w-full text-sm text-slate-500 file:mr-4 file:rounded-xl file:border-0 file:bg-black file:px-4 file:py-2.5 file:text-white hover:file:bg-pink-800"
          {...register("avatar")}
        />

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
