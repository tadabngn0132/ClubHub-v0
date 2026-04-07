import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserById, resetUserStatus } from "../../../store/slices/userSlice";
import Loading from "../../../components/layout/internal/Loading";
import UserForm from "../../../components/main/internal/UserForm";
import ChangePasswordForm from "../../../components/main/internal/ChangePasswordForm";
import { changePasswordUser } from "../../../store/slices/authSlice";

const ProfilePage = ({ roleLabel }) => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("Profile");
  const { currentUser } = useSelector((state) => state.auth);
  const { user, isLoading, error } = useSelector((state) => state.user);

  const tabs = [
    { id: 1, label: "Profile", component: (user ? (
      <UserForm user={user} />
    ) : (
      <p className="text-sm text-slate-300">User data not available.</p>
    )) },
    { id: 2, label: "Change Password", component: <ChangePasswordForm onSubmit={handleChangePassword} /> },
  ];

  const handleChangePassword = (data) => {
    dispatch(changePasswordUser(data));
  };

  useEffect(() => {
    if (currentUser) {
      dispatch(getUserById(currentUser.id));
    }

    return () => {
      dispatch(resetUserStatus());
    };
  }, [dispatch, currentUser]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen text-slate-100">
      <div className="flex w-full flex-col gap-6">
        <section>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
            {roleLabel} Profile
          </h1>
          <p className="mt-1 text-slate-300">
            Manage your profile details and security settings.
          </p>
        </section>

        {error && (
          <div className="rounded-xl border border-rose-400/50 bg-rose-500/15 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <section className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-4 md:p-5">
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.label)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  currentTab === tab.label
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700/60 bg-slate-900/65 p-5 md:p-6">
          {tabs.find((tab) => tab.label === currentTab)?.component}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
