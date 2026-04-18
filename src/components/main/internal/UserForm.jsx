import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import BasicInfoTab from "./BasicInfoTab.jsx";
import ClubInfoTab from "./ClubInfoTab.jsx";
import ProfileInfoTab from "./ProfileInfoTab.jsx";
import {
  formatDateToLocal,
  formatNumberToString,
} from "../../../utils/formatters.js";

const UserForm = ({ user, onSubmit }) => {
  const [activeTab, setActiveTab] = useState(0);

  const methods = useForm({
    defaultValues: {
      fullname: user ? user.fullname : "",
      email: user ? user.email : "",
      phoneNumber: user ? user.phoneNumber : "",
      dateOfBirth: user ? formatDateToLocal(user.dateOfBirth) : "",
      gender: user ? user.gender : "",
      major: user ? user.major : "",
      generation: user ? formatNumberToString(user.generation) : "",
      joinedAt: user ? formatDateToLocal(user.joinedAt) : "",
      status: user ? user.status : "ACTIVE",
      studentId: user ? user.studentId : "",
      avatarUrl: user ? user.avatarUrl : "",
      avatar: null,
      bio: user ? user.bio : "",
      rootDepartmentId: user ? user.rootDepartmentId : null,
      positionIds: user
        ? user.userPosition.map((up) => String(up.position.id))
        : [],
    },
    mode: "onChange",
  });

  const tabs = [
    { name: "Basic Info", component: BasicInfoTab },
    { name: "Club Info", component: ClubInfoTab },
    { name: "Additional Info", component: ProfileInfoTab },
  ];

  const handleSaveData = (data) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("dateOfBirth", data.dateOfBirth);
    formData.append("gender", data.gender);
    formData.append("major", data.major);
    formData.append("generation", data.generation);
    formData.append("joinedAt", data.joinedAt);
    formData.append("status", data.status);
    formData.append("studentId", data.studentId);
    formData.append("bio", data.bio);
    formData.append("rootDepartmentId", data.rootDepartmentId || "");
    formData.append("positionIds", JSON.stringify(data.positionIds || []));

    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    onSubmit(formData);
  };

  const handleDisableSave = () => {
    if (user) {
      return !methods.formState.isDirty;
    }
    return !methods.formState.isValid;
  };

  return (
    <div className="w-full">
      <h2 className="mb-5 text-2xl font-bold tracking-tight text-gray-100 md:text-3xl">
        {user ? "Edit User" : "Add New User"}
      </h2>

      {/* Tab Navigation */}
      <div className="mb-5 flex flex-wrap gap-2 rounded-xl border border-gray-800 bg-gray-900 p-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              activeTab === index
                ? "bg-blue-500/20 text-blue-300"
                : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
            }`}
            onClick={() => setActiveTab(index)}
            type="button"
          >
            {tab.name}
          </button>
        ))}
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSaveData)}
          className="mb-4 rounded-xl border border-gray-800 bg-gray-900 p-5 shadow-xl md:p-6"
          encType="multipart/form-data"
        >
          {/* Render active tab */}
          {tabs.map((tab, index) => (
            <div
              key={index}
              style={{ display: activeTab === index ? "block" : "none" }}
            >
              <tab.component />
            </div>
          ))}

          <div className="mt-6 flex items-center justify-between border-t border-gray-800 pt-5">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:text-gray-400"
              disabled={handleDisableSave()}
            >
              {user ? "Update User" : "Add User"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserForm;
