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

  const userData = useSelector((state) =>
    state.user.usersList.find((user) => user.id === memberId),
  );

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
      if (userData) {
        methods.reset({
          name: userData.name || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          role: userData.role || "",
          avatar: userData.avatar || null,
          bio: userData.bio || "",
        });
      } else {
        resData = dispatch(getUserById(memberId));
        
        if (res.payload) {
          methods.reset({
            name: res.payload.name || "",
            email: res.payload.email || "",
            phoneNumber: res.payload.phoneNumber || "",
            role: res.payload.role || "",
            avatar: res.payload.avatar || null,
            bio: res.payload.bio || "",
          });
        }
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
  }, [mode, memberId, userData, methods]);

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
          className="bg-white shadow-md rounded px-8 pt-6 pb-8"
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

          <div className="flex items-center justify-between mt-6">
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
