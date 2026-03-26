import { useForm } from "react-hook-form";

const TaskConfirmationForm = ({ taskCfData, onSubmit }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            evidence: null,
            evidenceUrl: taskCfData?.evidenceUrl || "",
            additionalComments: taskCfData?.additionalComments || "",
        },
        mode: "onChange",
    });

    const handleFormSubmit = (data) => {
        const formData = new FormData();
        formData.append("evidenceUrl", data.evidenceUrl);
        formData.append("additionalComments", data.additionalComments);

        if (data.evidence && data.evidence[0]) {
            formData.append("evidence", data.evidence[0]);
        }

        onSubmit(formData);
    };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
        <label htmlFor="evidence">Evidence</label>
        <input
            type="file"
            id="evidence"
            accept="image/*"
            {...register("evidence", { required: "Evidence is required" })}
        />
        {errors.evidence && <p>{errors.evidence.message}</p>}

        <label htmlFor="additional_comments">Comments</label>
        <textarea
            id="additional_comments"
            {...register("additionalComments", { required: "Comments are required" })}
        />
        {errors.additionalComments && <p>{errors.additionalComments.message}</p>}

        <input type="submit" value="Submit" />
    </form>
  );
};

export default TaskConfirmationForm;