import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  VALIDATION_MESSAGES,
  VALIDATION_RULES,
} from "../../../utils/validationRules";
import {
  faEye,
  faEyeSlash,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

const ChangePasswordForm = ({ onSubmit }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      email: currentUser.email,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const inputClassName =
    "w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[var(--pink-color)] focus:bg-slate-900 focus:ring-2 focus:ring-[var(--pink-color)]/30";
  const labelClassName = "mb-1.5 text-sm font-medium text-slate-200";
  const errorClassName =
    "mt-1 text-[11px] font-medium text-rose-300 lg:text-xs";

  const handleCurrentPasswordView = () => {
    setIsCurrentPasswordVisible(!isCurrentPasswordVisible);
  };

  const handleNewPasswordView = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible);
  };

  const handleConfirmPasswordView = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleFormSubmit = (data) => {
    onSubmit({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      email: data.email,
    });
    reset();
    handleCurrentPasswordView();
    handleNewPasswordView();
    handleConfirmPasswordView();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0" />

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="relative z-10 w-full max-w-xl rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top_right,_rgba(236,72,153,0.28),_transparent_42%),radial-gradient(circle_at_bottom_left,_rgba(14,165,233,0.14),_transparent_40%)] p-6 shadow-2xl shadow-black/45 backdrop-blur-md sm:p-8"
      >
        <div className="mb-7 space-y-2 text-center sm:text-left">
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
            Change Password
          </h1>
          <p className="text-sm text-slate-300">
            Keep your account secure by setting a strong, unique password.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="current-password" className={labelClassName}>
              Current Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center relative">
              <input
                type={isCurrentPasswordVisible ? "text" : "password"}
                id="current-password"
                className={inputClassName}
                placeholder="Enter your current password"
                {...register("currentPassword", {
                  required: "Current password is required",
                  ...VALIDATION_RULES.minPassword,
                })}
              />
              <span
                onClick={handleCurrentPasswordView}
                className="flex items-center-safe justify-center-safe absolute right-5 text-[var(--pink-color)] p-1 cursor-pointer hover:opacity-70"
              >
                <FontAwesomeIcon
                  icon={isCurrentPasswordVisible ? faEyeSlash : faEye}
                />
              </span>
            </div>
            {/* Current Password error */}
            {errors.currentPassword && (
              <span className={errorClassName}>
                {errors.currentPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="new-password" className={labelClassName}>
              New Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center relative">
              <input
                type={isNewPasswordVisible ? "text" : "password"}
                id="new-password"
                className={inputClassName}
                placeholder="Enter your new password"
                {...register("newPassword", {
                  required: VALIDATION_MESSAGES.passwordRequired,
                  ...VALIDATION_RULES.minPassword,
                })}
              />
              <span
                onClick={handleNewPasswordView}
                className="flex items-center-safe justify-center-safe absolute right-5 text-[var(--pink-color)] p-1 cursor-pointer hover:opacity-70"
              >
                <FontAwesomeIcon
                  icon={isNewPasswordVisible ? faEyeSlash : faEye}
                />
              </span>
            </div>
            {/* New Password error */}
            {errors.newPassword && (
              <span className={errorClassName}>
                {errors.newPassword.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="confirm-new-password" className={labelClassName}>
              Confirm New Password <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center relative">
              <input
                type={isConfirmPasswordVisible ? "text" : "password"}
                id="confirm-new-password"
                className={inputClassName}
                placeholder="Confirm your new password"
                {...register("confirmNewPassword", {
                  required: VALIDATION_MESSAGES.passwordRequired,
                  ...VALIDATION_RULES.minPassword,
                  validate: (value) =>
                    value === watch("newPassword") ||
                    VALIDATION_MESSAGES.passwordMismatch,
                })}
              />
              <span
                onClick={handleConfirmPasswordView}
                className="flex items-center-safe justify-center-safe absolute right-5 text-[var(--pink-color)] p-1 cursor-pointer hover:opacity-70"
              >
                <FontAwesomeIcon
                  icon={isConfirmPasswordVisible ? faEyeSlash : faEye}
                />
              </span>
            </div>
            {/* Confirm New Password error */}
            {errors.confirmNewPassword && (
              <span className={errorClassName}>
                {errors.confirmNewPassword.message}
              </span>
            )}
          </div>
        </div>

        <input
          type="submit"
          className="mt-7 w-full cursor-pointer rounded-xl bg-[var(--pink-color)] px-4 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-[var(--pink-color)]/30 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--dark-pink-color)] hover:shadow-xl hover:shadow-[var(--pink-color)]/35 active:translate-y-0"
          value="Update Password"
        />

        <p className="mt-3 text-center text-xs text-slate-400">
          Make sure your new password is at least 8 characters long.
        </p>
      </form>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.45),transparent_45%)]" />
    </div>
  );
};

export default ChangePasswordForm;
