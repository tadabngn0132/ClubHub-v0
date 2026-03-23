import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import BasicInfoTab from "./BasicInfoTab.jsx";
import ClubInfoTab from "./ClubInfoTab.jsx";
import ProfileInfoTab from "./ProfileInfoTab.jsx";
import {
  getUserById,
  createUser,
  updateUserById,
} from "../../../store/slices/userSlice.js";
import { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { formatDateToLocal, formatNumberToString, formatUppercaseToCapitalized } from "../../../utils/formatters.js";

const UserForm = ({ mode }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const methods = useForm({
    defaultValues: {
      fullname: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      major: "",
      generation: "",
      joinedAt: "",
      status: "Active",
      studentId: "",
      avatarUrl: "",
      avatar: null,
      bio: "",
      rootDepartmentId: null,
      positionId: null,
    },
    mode: "onChange",
  });

  const { isValid } = methods.formState;

  useEffect(() => {
    const fetchUserData = async () => {
      if (mode === "edit") {
        const userData = await dispatch(getUserById(userId)).unwrap();
  
        if (userData) {
          methods.reset({
            fullname: userData.data.fullname || "",
            email: userData.data.email || "",
            phoneNumber: userData.data.phoneNumber || "",
            dateOfBirth: formatDateToLocal(userData.data.dateOfBirth) || "",
            gender: userData.data.gender || "",
            major: userData.data.major || "",
            generation: formatNumberToString(userData.data.generation) || "",
            joinedAt: formatDateToLocal(userData.data.joinedAt) || "",
            status: formatUppercaseToCapitalized(userData.data.status) || "Active",
            studentId: userData.data.studentId || "",
            avatarUrl: userData.data.avatarUrl || "",
            avatar: null,
            bio: userData.data.bio || "",
            rootDepartmentId: userData.data.rootDepartmentId || null,
            positionId: userData.data.userPosition[0]?.positionId || null,
          });
        }
      } else if (mode === "add") {
        methods.reset({
          fullname: "",
          email: "",
          phoneNumber: "",
          dateOfBirth: "",
          gender: "",
          major: "",
          generation: "",
          joinedAt: "",
          status: "Active",
          studentId: "",
          avatarUrl: "",
          avatar: null,
          bio: "",
          rootDepartmentId: null,
          positionId: null,
        });
      }
    }
    fetchUserData();
  }, [mode, userId, methods]);

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
    if (mode === "add") {
      dispatch(createUser(formData));
    } else if (mode === "edit") {
      dispatch(updateUserById({ id: userId, userData: formData }));
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">
        {mode === "add" ? "Add New User" : "Edit User"}
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
              {mode === "add" ? "Add User" : "Update User"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default UserForm;
