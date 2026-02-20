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
  const { user } = useSelector((state) => state.user);

  const methods = useForm({
    defaultValues: {
      fullName: "",
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
    if (mode === "edit") {
      dispatch(getUserById(memberId));
        
      if (user) {
        methods.reset({
          fullName: user.fullname || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          dateOfBirth: user.dateOfBirth || "",
          gender: user.gender || "",
          major: user.major || "",
          generation: user.generation || "",
          department: user.department || "",
          position: user.position || "",
          role: user.role || "",
          joinDate: user.joinDate || "",
          status: user.status || "",
          avatar: user.avatar || null,
          bio: user.bio || "",
        });
      }
    } else if (mode === "add") {
      methods.reset({
        fullName: "",
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
