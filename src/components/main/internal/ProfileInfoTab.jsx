import React from "react";
import { useFormContext } from "react-hook-form";

const ProfileInfoTab = () => {
  const { register } = useFormContext();

  const inputClassName =
    "mt-2 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

  return (
    <div className="flex flex-col">
      <label htmlFor="avatar" className="text-sm font-semibold text-gray-100">
        Avatar
      </label>
      <input
        type="file"
        id="avatar"
        accept="image/*"
        className="mt-2 w-full cursor-pointer rounded-md border border-gray-700 bg-gray-800 p-2 text-sm text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-blue-500/15 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-blue-300 hover:file:bg-blue-500/30"
        {...register("avatar")}
      />

      <label htmlFor="bio" className="mt-3 text-sm font-semibold text-gray-100">
        Bio
      </label>
      <textarea
        id="bio"
        placeholder="A short bio about the member..."
        rows={5}
        className={inputClassName}
        {...register("bio")}
      />
    </div>
  );
};

export default ProfileInfoTab;
