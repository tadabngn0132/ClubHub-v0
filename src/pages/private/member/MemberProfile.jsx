import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getUserById, resetStatus } from "../../../store/slices/userSlice";
import Loading from "../../../components/layout/internal/Loading";
import UserForm from "../../../components/main/internal/UserForm";
import ChangePasswordForm from "../../../components/main/internal/ChangePasswordForm";

const MemberProfile = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("profile");
  const { currentUser } = useSelector((state) => state.auth);
  const { user, isLoading, error } = useSelector((state) => state.user);

  const tabs = [
    { id: 1, label: "Profile" },
    { id: 2, label: "Change Password" },
  ];

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserById(currentUser.id));
    }

    return () => {
      dispatch(resetStatus());
    };
  }, [dispatch, currentUser]);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    toast.error(error);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Member Profile</h1>

      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.label)}
            className={`px-4 py-2 rounded ${
              currentTab === tab.label
                ? "bg-[var(--pink-color)] text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {currentTab === "profile" &&
          (user ? <UserForm user={user} /> : <p>User data not available.</p>)}

        {currentTab === "Change Password" && <ChangePasswordForm />}
      </div>
    </div>
  );
};

export default MemberProfile;
