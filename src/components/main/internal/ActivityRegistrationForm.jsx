import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { registerPublicActivity } from "../../../services/publicActivityService";

const ActivityRegistrationForm = ({
  activityId: activityIdProp,
  onSuccess,
}) => {
  const { activityId } = useParams();
  const resolvedActivityId = activityIdProp || activityId;
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  // keep component focused on public registration; errors handled by axios interceptor

  const handleActivityRegistration = async (data) => {
    if (!resolvedActivityId) {
      toast.error("Activity ID is missing.");
      return;
    }

    try {
      // Only support public registration from this form; private creation handled elsewhere
      if (!activityIdProp) {
        toast.error("This form supports public registration only.");
        return;
      }

      setLoading(true);
      const response = await registerPublicActivity(resolvedActivityId, data);

      setLoading(false);

      if (!response?.success) {
        toast.error(response?.message || "Registration failed.");
        return;
      }

      toast.success(response.message || "Registration submitted successfully.");
      reset();
      if (onSuccess) onSuccess(response.data);
    } catch (submitError) {
      setLoading(false);
      toast.error(
        submitError?.response?.data?.message ||
          submitError?.message ||
          "Registration failed.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleActivityRegistration)}>
      <div className="mt-4 grid gap-4">
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-semibold uppercase tracking-wide text-zinc-400"
          >
            Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none transition focus:border-cyan-400"
            {...register("name", {
              required: "Name is required.",
              minLength: {
                value: 2,
                message: "Name must contain at least 2 characters.",
              },
            })}
          />
          {errors.name && (
            <p className="mt-1 text-xs text-rose-300">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-wide text-zinc-400"
          >
            Email <span className="text-rose-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none transition focus:border-cyan-400"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please provide a valid email address.",
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-rose-300">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="block text-xs font-semibold uppercase tracking-wide text-zinc-400"
          >
            Phone Number <span className="text-rose-400">*</span>
          </label>
          <input
            type="tel"
            id="phoneNumber"
            placeholder="Enter your phone number"
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none transition focus:border-cyan-400"
            {...register("phoneNumber", {
              required: "Phone number is required.",
              minLength: {
                value: 8,
                message: "Phone number must contain at least 8 digits.",
              },
              maxLength: {
                value: 15,
                message: "Phone number must not exceed 15 digits.",
              },
            })}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-rose-300">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-5 rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/35 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
};

export default ActivityRegistrationForm;
