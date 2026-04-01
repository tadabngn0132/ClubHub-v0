import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { VALIDATION_MESSAGES } from "../../../utils/validationRules";

const ContactForm = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitContactMsg = (data) => {
    // TODO: Implement contact message submission logic here
    console.log("Contact message submitted:", data);
  };

  return (
    <div>
      <form
        action=""
        onSubmit={handleSubmit(handleSubmitContactMsg)}
        className="flex flex-col gap-4 max-w-lg mx-auto p-4"
      >
        <label htmlFor="subject">
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          {...register("subject", {
            required: "Subject is required",
            minLength: {
              value: 3,
              message: VALIDATION_MESSAGES.subjectMinLength,
            },
          })}
        />
        {errors.subject && (
          <p className="text-red-500">{errors.subject.message}</p>
        )}

        <label htmlFor="message">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          rows="5"
          {...register("message", {
            required: "Message is required",
            minLength: {
              value: 10,
              message: VALIDATION_MESSAGES.messageMinLength,
            },
          })}
        />
        {errors.message && (
          <p className="text-red-500">{errors.message.message}</p>
        )}

        <input type="submit" value="Send Message" />
      </form>
    </div>
  );
};

export default ContactForm;
