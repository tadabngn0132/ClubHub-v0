import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import BasicInfoTab from "./BasicInfoTab.jsx";
import ClubInfoTab from "./ClubInfoTab.jsx";
import ProfileInfoTab from "./ProfileInfoTab.jsx";
import { formatDateToLocal, formatNumberToString, formatUppercaseToCapitalized } from "../../../utils/formatters.js";

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
      status: user ? formatUppercaseToCapitalized(user.status) : "Active",
      studentId: user ? user.studentId : "",
      avatarUrl: user ? user.avatarUrl : "",
      avatar: null,
      bio: user ? user.bio : "",
      rootDepartmentId: user ? user.rootDepartmentId : null,
      positionId: user ? user.userPosition[0]?.positionId : null,
    },
    mode: "onChange",
  });

  const { isValid } = methods.formState;

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
    formData.append("positionId", data.positionId || "");

    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }
    
    onSubmit(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        {user ? "Edit User" : "Add New User"}
      </h2>

      {/* Tab Navigation */}
      <div className="flex border-b mb-4">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
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
          className="shadow-md rounded px-4 py-2 mb-4"
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

          <div className="flex items-center justify-between my-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              disabled={!isValid}
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
