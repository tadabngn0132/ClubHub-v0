import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewActivityParticipation } from "../../../store/slices/activityParticipationSlice";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const ActivityRegistrationForm = () => {
  const { activityId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(
    (state) => state.activityParticipation,
  );
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleActivityRegistration = (data) => {
    dispatch(createNewActivityParticipation(activityId, data));
  };

  return (
    <form onSubmit={handleSubmit(handleActivityRegistration)}>
      <h2>Register for Activity</h2>
      <div>
        <label htmlFor="name">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: true })}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div>
        <label htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div>
        <label htmlFor="phoneNumber">
          Phone Number <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="phoneNumber"
          {...register("phoneNumber", { required: true })}
        />
        {error && <p className="error">{error}</p>}
      </div>

      <input type="submit" value={isLoading ? "Submitting..." : "Submit"} />
    </form>
  );
};

export default ActivityRegistrationForm;
