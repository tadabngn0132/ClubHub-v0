import React from "react";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import Loading from "../../../components/layout/internal/Loading.jsx";

const BasicInfoTab = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { isLoading } = useSelector((state) => state.user);

  if (isLoading) {
    return <Loading />;
  }

  const inputClassName =
    "mt-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
  const labelClassName = "mt-3 text-sm font-semibold text-gray-100";
  const errorClassName = "mt-1 text-sm font-medium text-red-400";

  return (
    <div className="flex flex-col">
      {/* Full Name field */}
      <label htmlFor="fullname" className="text-sm font-semibold text-gray-100">
        Full name <span className="text-red-400">*</span>
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
        Email <span className="text-red-400">*</span>
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
        Phone number <span className="text-red-400">*</span>
      </label>
      <input
        type="tel"
        id="phoneNumber"
        placeholder="0387512345"
        className={inputClassName}
        {...register("phoneNumber", {
          required: "Phone number cannot be empty",
          minLength: 10,
          maxLength: 10,
        })}
      />
      {errors.phoneNumber && (
        <p className={errorClassName}>{errors.phoneNumber.message}</p>
      )}

      {/* Date of Birth field */}
      <label htmlFor="dateOfBirth" className={labelClassName}>
        Date of Birth <span className="text-red-400">*</span>
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
        Gender <span className="text-red-400">*</span>
      </label>
      <div className="mt-2 flex flex-wrap gap-3">
        <label htmlFor="male" className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-200">
          <input
            type="radio"
            id="male"
            value="male"
            className="h-4 w-4 border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
            {...register("gender", { required: "Gender cannot be empty" })}
          />
          Male
        </label>

        <label htmlFor="female" className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-200">
          <input
            type="radio"
            id="female"
            value="female"
            className="h-4 w-4 border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
            {...register("gender", { required: "Gender cannot be empty" })}
          />
          Female
        </label>

        <label htmlFor="other" className="inline-flex cursor-pointer items-center gap-2 text-sm text-gray-200">
          <input
            type="radio"
            id="other"
            value="other"
            className="h-4 w-4 border-gray-600 bg-gray-900 text-blue-500 focus:ring-blue-500"
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
        Major <span className="text-red-400">*</span>
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
        Student ID <span className="text-red-400">*</span>
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
    </div>
  );
};

export default BasicInfoTab;
