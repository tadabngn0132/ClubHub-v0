import { useForm } from "react-hook-form";

const ActivityMediaForm = ({ onImagesSubmit, onVideosSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm({
    defaultValues: {
        images: [],
        videos: [],
    },
    mode: "onChange",
});

    return (
        <>
            <form onSubmit={handleSubmit(onImagesSubmit)}>
                <label htmlFor="images">Images</label>
                <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    {...register("images")}
                />
                {errors.images && <p>{errors.images.message}</p>}

                <input type="submit" value="Submit" />
            </form>

            <form onSubmit={handleSubmit(onVideosSubmit)}>
                <label htmlFor="videos">Videos</label>
                <input
                    type="file"
                    id="videos"
                    accept="video/*"
                    multiple
                    {...register("videos")}
                />
                {errors.videos && <p>{errors.videos.message}</p>}
                <input type="submit" value="Submit" />
            </form>
        </>
    );
};

export default ActivityMediaForm;