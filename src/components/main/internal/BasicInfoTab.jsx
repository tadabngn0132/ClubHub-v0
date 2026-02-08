import React from "react";
import { useFormContext } from "react-hook-form";

const BasicInfoTab = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col">
      {/* Full Name field */}
      <label htmlFor="fullName">
        Full name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="fullName"
        placeholder="Nguyen Van Hai"
        className="mt-2"
        {...register("fullName", { required: "Full name cannot be empty" })}
      />
      {errors.fullName && (
        <p className="text-red-500 text-sm">{errors.fullName.message}</p>
      )}

      {/* Email field */}
      <label htmlFor="email" className="mt-3">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="email"
        placeholder="HaiNV240875@fpt.edu.vn"
        className="mt-2"
        {...register("email", {
          required: "Email cannot be empty",
          pattern: {
            value: /^[A-Za-z0-9]+@fpt\.edu\.vn$/,
            message: "Email must have @fpt.edu.vn tail",
          },
        })}
      />
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}

      {/* Phone number field */}
      <label htmlFor="phoneNumber" className="mt-3">
        Phone number <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        id="phoneNumber"
        placeholder="0387512345"
        className="mt-2"
        {...register("phoneNumber", {
          required: "Phone number cannot be empty",
          minLength: 10,
          maxLength: 10,
        })}
      />
      {errors.phoneNumber && (
        <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
      )}

      {/* Date of Birth field */}
      <label htmlFor="dateOfBirth" className="mt-3">
        Date of Birth <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="dateOfBirth"
        className="mt-2"
        {...register("dateOfBirth", {
          required: "Date of birth cannot be empty",
        })}
      />
      {errors.dateOfBirth && (
        <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
      )}

      {/* Gender field */}
      <label htmlFor="gender" className="mt-3">
        Gender <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center-safe mt-1 gap-1">
        <input
          type="radio"
          id="male"
          value="male"
          {...register("gender", { required: "Gender cannot be empty" })}
        />
        <label htmlFor="male">Male</label>
      </div>

      <div className="flex items-center-safe mt-1 gap-1">
        <input
          type="radio"
          id="female"
          value="female"
          {...register("gender", { required: "Gender cannot be empty" })}
        />
        <label htmlFor="female">Female</label>
      </div>

      <div className="flex items-center-safe mt-1 gap-1">
        <input
          type="radio"
          id="other"
          value="other"
          {...register("gender", { required: "Gender cannot be empty" })}
        />
        <label htmlFor="other">Other</label>
      </div>
      {errors.gender && (
        <p className="text-red-500 text-sm">{errors.gender.message}</p>
      )}

      {/* Major field */}
      <label htmlFor="major" className="mt-3">
        Major <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="major"
        placeholder="Computing"
        className="mt-2"
        {...register("major", { required: "Major cannot be empty" })}
      />
      {errors.major && (
        <p className="text-red-500 text-sm">{errors.major.message}</p>
      )}
    </div>
  );
};

export default BasicInfoTab;
