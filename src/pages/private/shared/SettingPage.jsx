import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getUserById, resetUserStatus } from "../../../store/slices/userSlice";
import Loading from "../../../components/layout/internal/Loading";
import UserForm from "../../../components/main/internal/UserForm";
import ChangePasswordForm from "../../../components/main/internal/ChangePasswordForm";
import { changePasswordUser } from "../../../store/slices/authSlice";
import { startGoogleAccountLink } from "../../../services/authService";
import NotificationPreferences from "../../../components/main/internal/NotificationPreferences";
import toast from "react-hot-toast";

const SettingPage = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("Profile");
  const [isLinkingGoogle, setIsLinkingGoogle] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentUser } = useSelector((state) => state.auth);
  const { user, isLoading, error } = useSelector((state) => state.user);

  const isGoogleLinked = useMemo(() => {
    return Boolean(
      user?.googleCredentials && !user.googleCredentials.revokedAt,
    );
  }, [user?.googleCredentials]);

  useEffect(() => {
    const googleLinkStatus = searchParams.get("googleLink");
    const googleLinkMessage = searchParams.get("message");

    if (!googleLinkStatus) {
      return;
    }

    if (googleLinkStatus === "success") {
      toast.success(googleLinkMessage || "Google account linked successfully");
    } else {
      toast.error(googleLinkMessage || "Google account linking failed");
    }

    setSearchParams({}, { replace: true });
  }, [searchParams, setSearchParams]);

  const handleChangePassword = (data) => {
    dispatch(changePasswordUser(data));
  };

  const handleGoogleLink = async () => {
    try {
      setIsLinkingGoogle(true);
      const response = await startGoogleAccountLink({
        returnTo: window.location.pathname,
      });

      const authorizationUrl = response?.data?.authorizationUrl;

      if (!authorizationUrl) {
        toast.error("Unable to start Google linking");
        return;
      }

      window.location.href = authorizationUrl;
    } catch {
      // handled by global axios interceptor
    } finally {
      setIsLinkingGoogle(false);
    }
  };

  const tabs = [
    {
      id: 1,
      label: "Profile",
      component: user ? (
        <div className="space-y-5">
          <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-5 shadow-lg shadow-sky-950/10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-sky-100">
                  Google Workspace
                </p>
                <p className="mt-1 text-sm text-slate-300">
                  {isGoogleLinked
                    ? "Your account is connected to Google and can access Drive, Docs, Sheets, and Calendar features."
                    : "Connect your Google account to use Drive, Docs, Sheets, and Calendar features."}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
                    isGoogleLinked
                      ? "border border-emerald-500/30 bg-emerald-500/15 text-emerald-200"
                      : "border border-amber-500/30 bg-amber-500/15 text-amber-200"
                  }`}
                >
                  {isGoogleLinked ? "Linked" : "Not linked"}
                </span>

                <button
                  type="button"
                  onClick={handleGoogleLink}
                  disabled={isLinkingGoogle}
                  className="rounded-xl bg-[#db3f7a] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c8366e] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLinkingGoogle
                    ? "Preparing..."
                    : isGoogleLinked
                      ? "Reconnect Google"
                      : "Connect Google"}
                </button>
              </div>
            </div>
          </div>

          <UserForm user={user} />
        </div>
      ) : (
        <p className="text-sm text-slate-300">User data not available.</p>
      ),
    },
    {
      id: 2,
      label: "Change Password",
      component: <ChangePasswordForm onSubmit={handleChangePassword} />,
    },
    {
      id: 3,
      label: "Notification Preferences",
      component: <NotificationPreferences />,
    },
  ];

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
            Settings
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

export default SettingPage;
