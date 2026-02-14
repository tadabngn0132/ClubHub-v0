import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import BasicInfoTab from "../internal/BasicInfoTab.jsx";
import ClubInfoTab from "../internal/ClubInfoTab.jsx";
import ProfileInfoTab from "../internal/ProfileInfoTab.jsx";
import { 
  getUserById,
  createUser,
  updateUserById 
} from "../../../store/slices/userSlice.js";
import { Toaster } from "react-hot-toast";

const MemberForm = ({ mode, memberId }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  const methods = useForm({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      gender: "",
      major: "",
      generation: "",
      department: "",
      position: "",
      role: "",
      joinDate: "",
      status: "",
      avatar: null,
      bio: "",
    },
    mode: "onChange",
  });

  const { isValid } = methods.formState;

  useEffect(() => {
    if (mode === "edit" && memberId) {
      const resData = dispatch(getUserById(memberId));
        
      if (resData && resData.payload) {
        methods.reset({
          name: resData.payload.name || "",
          email: resData.payload.email || "",
          phoneNumber: resData.payload.phoneNumber || "",
          role: resData.payload.role || "",
          avatar: resData.payload.avatar || null,
          bio: resData.payload.bio || "",
        });
      }
    } else if (mode === "add") {
      methods.reset({
        name: "",
        email: "",
        phoneNumber: "",
        role: "",
        avatar: null,
        bio: "",
      });
    }
  }, [mode, memberId, methods]);

  const tabs = [
    { name: "Basic Info", component: BasicInfoTab },
    { name: "Club Info", component: ClubInfoTab },
    { name: "Additional Info", component: ProfileInfoTab },
  ];

  const handleSaveData = (data) => {
    if (mode === "add") {
      dispatch(createUser(data));
    } else if (mode === "edit") {
      dispatch(updateUserById(data));
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold mb-4">
        {mode === "add" ? "Add New Member" : "Edit Member"}
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
              {mode === "add" ? "Add Member" : "Update Member"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default MemberForm;
