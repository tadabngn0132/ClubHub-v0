import React from "react";
import { useFormContext } from "react-hook-form";

const BasicInfoTab = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label htmlFor="fullName">
        Full name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="fullName"
        placeholder="Nguyen Van Hai"
        {...register("fullName", { required: "Full name cannot be empty" })}
      />
      {errors.fullName && (
        <p className="text-red-500 text-sm">{errors.fullName.message}</p>
      )}

      <label htmlFor="email">
        Email <span className="text-red-500">*</span>
      </label>
      <input
        type="email"
        id="email"
        placeholder="HaiNV240875@fpt.edu.vn"
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

      <label htmlFor="phoneNumber">
        Phone number <span className="text-red-500">*</span>
      </label>
      <input
        type="tel"
        id="phoneNumber"
        placeholder="0387512345"
        {...register("phoneNumber", {
          required: "Phone number cannot be empty",
          minLength: 10,
          maxLength: 10,
        })}
      />
      {errors.phoneNumber && (
        <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
      )}

      <label htmlFor="dateOfBirth">
        Date of Birth <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        id="dateOfBirth"
        {...register("dateOfBirth", {
          required: "Date of birth cannot be empty",
        })}
      />
      {errors.dateOfBirth && (
        <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
      )}

      <label htmlFor="gender">
        Gender <span className="text-red-500">*</span>
      </label>
      <input
        type="radio"
        id="male"
        value="male"
        {...register("gender", { required: "Gender cannot be empty" })}
      />
      <input
        type="radio"
        id="female"
        value="female"
        {...register("gender", { required: "Gender cannot be empty" })}
      />
      <input
        type="radio"
        id="other"
        value="other"
        {...register("gender", { required: "Gender cannot be empty" })}
      />
      {errors.gender && (
        <p className="text-red-500 text-sm">{errors.gender.message}</p>
      )}

      <label htmlFor="major">
        Major <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="major"
        placeholder="Computing"
        {...register("major", { required: "Major cannot be empty" })}
      />
      {errors.major && (
        <p className="text-red-500 text-sm">{errors.major.message}</p>
      )}
    </div>
  );
};

export default BasicInfoTab;
