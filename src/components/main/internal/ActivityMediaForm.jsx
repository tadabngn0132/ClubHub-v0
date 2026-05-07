import { useState } from "react";
import { useForm } from "react-hook-form";

const ActivityMediaForm = ({ onImagesSubmit, onVideosSubmit }) => {
    const [isImagesUploading, setIsImagesUploading] = useState(false);
    const [isVideosUploading, setIsVideosUploading] = useState(false);

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

    const handleImagesFormSubmit = async (formData) => {
        const imageFiles = Array.from(formData?.images || []);

        setIsImagesUploading(true);
        try {
            await onImagesSubmit(imageFiles);
        } finally {
            setIsImagesUploading(false);
        }
    };

    const handleVideosFormSubmit = async (formData) => {
        const videoFiles = Array.from(formData?.videos || []);

        setIsVideosUploading(true);
        try {
            await onVideosSubmit(videoFiles);
        } finally {
            setIsVideosUploading(false);
        }
    };

    return (
        <div className="grid gap-4 lg:grid-cols-2">
            <form
                onSubmit={handleSubmit(handleImagesFormSubmit)}
                className="rounded-xl border border-zinc-700 bg-zinc-950/60 p-4"
            >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                    Upload Images
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                    Accepted format: image/*. Max size per file: 5MB.
                </p>

                <label
                    htmlFor="images"
                    className="mt-4 block text-xs font-medium uppercase tracking-wide text-zinc-400"
                >
                    Choose image files
                </label>
                <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    disabled={isImagesUploading}
                    className="mt-2 block w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-cyan-500/20 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-cyan-200 hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
                    {...register("images")}
                />
                {errors.images && (
                    <p className="mt-2 text-xs text-rose-300">{errors.images.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isImagesUploading}
                    aria-busy={isImagesUploading}
                    className="mt-4 rounded-lg bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/35 disabled:cursor-not-allowed disabled:bg-cyan-500/10 disabled:text-cyan-200/60"
                >
                    {isImagesUploading ? "Uploading Images..." : "Upload Images"}
                </button>
            </form>

            <form
                onSubmit={handleSubmit(handleVideosFormSubmit)}
                className="rounded-xl border border-zinc-700 bg-zinc-950/60 p-4"
            >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-300">
                    Upload Videos
                </h3>
                <p className="mt-1 text-xs text-zinc-400">
                    Accepted format: video/*. Max size per file: 100MB.
                </p>

                <label
                    htmlFor="videos"
                    className="mt-4 block text-xs font-medium uppercase tracking-wide text-zinc-400"
                >
                    Choose video files
                </label>
                <input
                    type="file"
                    id="videos"
                    accept="video/*"
                    multiple
                    disabled={isVideosUploading}
                    className="mt-2 block w-full cursor-pointer rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-amber-500/20 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-amber-200 hover:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-60"
                    {...register("videos")}
                />
                {errors.videos && (
                    <p className="mt-2 text-xs text-rose-300">{errors.videos.message}</p>
                )}

                <button
                    type="submit"
                    disabled={isVideosUploading}
                    aria-busy={isVideosUploading}
                    className="mt-4 rounded-lg bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/35 disabled:cursor-not-allowed disabled:bg-amber-500/10 disabled:text-amber-200/60"
                >
                    {isVideosUploading ? "Uploading Videos..." : "Upload Videos"}
                </button>
            </form>
        </div>
    );
};

export default ActivityMediaForm;