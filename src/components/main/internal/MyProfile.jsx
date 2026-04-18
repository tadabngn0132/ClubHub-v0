import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserById, resetUserStatus } from "../../../store/slices/userSlice";
import Loading from "../../layout/internal/Loading";
import {
  formatDate,
  formatUppercaseToCapitalized,
} from "../../../utils/formatters";
import { getUserRole } from "../../../utils/helper";

const MyProfile = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { user, isLoading, error } = useSelector((state) => state.user);

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

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-slate-100">
        <div className="max-w-md rounded-2xl border border-rose-400/30 bg-rose-500/10 px-5 py-4 text-sm text-rose-200 shadow-lg shadow-rose-950/20">
          {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4 text-slate-100">
        <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 px-6 py-5 text-sm text-slate-300 shadow-lg shadow-black/20">
          No profile data found.
        </div>
      </div>
    );
  }

  const personalInfo = [
    { label: "Email", value: user?.email || "Not provided" },
    { label: "Phone Number", value: user?.phoneNumber || "Not provided" },
    {
      label: "Date of Birth",
      value: user?.dateOfBirth ? formatDate(user.dateOfBirth) : "Not provided",
    },
    { label: "Gender", value: user?.gender || "Not provided" },
    { label: "Major", value: user?.major || "Not provided" },
  ];

  const clubInfo = [
    { label: "Student ID", value: user?.studentId || "Not provided" },
    {
      label: "Generation",
      value: `Gen ${user?.generation?.toString()}` || "Not provided",
    },
    {
      label: "Joined At",
      value: user?.createdAt ? formatDate(user.createdAt) : "Not provided",
    },
    {
      label: "Role",
      value: getUserRole(user)
        ? formatUppercaseToCapitalized(getUserRole(user))
        : "Not provided",
    },
    {
      label: "Position",
      value:
        user?.userPosition?.find((up) => up.isPrimary)?.position?.title ||
        "Not provided",
    },
  ];

  const cardClassName =
    "rounded-2xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20 backdrop-blur md:p-6";

  const completenessFields = [
    user?.avatarUrl,
    user?.bio,
    user?.email,
    user?.phoneNumber,
    user?.dateOfBirth,
    user?.gender,
    user?.major,
    user?.studentId,
    user?.generation?.toString(),
    user?.status,
    user?.createdAt,
    getUserRole(user),
    user?.userPosition?.find((up) => up.isPrimary)?.position?.title,
  ];
  const completedFields = completenessFields.filter(Boolean).length;
  const totalFields = completenessFields.length;
  const profileCompletion = Math.round((completedFields / totalFields) * 100);

  return (
    <div className="min-h-[70vh] text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl shadow-black/25 md:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.12),transparent_35%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="relative">
                <img
                  src={
                    user.avatarUrl ||
                    "https://via.placeholder.com/160?text=Profile"
                  }
                  alt="Avatar"
                  className="h-28 w-28 rounded-3xl border-2 border-sky-400/40 object-cover shadow-lg shadow-sky-950/30 md:h-32 md:w-32"
                />
              </div>

              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  {user.fullname || "Profile"}
                </h1>
                <p className="text-sm text-slate-300 md:text-base">
                  Your personal and club profile information.
                </p>
                <div className="pt-1">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
                    Status:{" "}
                    {user?.status
                      ? formatUppercaseToCapitalized(user.status)
                      : "Not provided"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.35fr]">
          <div className="space-y-6">
            <div className={`${cardClassName} overflow-hidden`}>
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">
                  Profile Completeness
                </h2>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                  Auto calculated
                </span>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Completion
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {profileCompletion}%
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Completed Fields
                    </p>
                    <p className="mt-2 font-semibold text-white">
                      {completedFields}/{totalFields}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Missing Fields
                    </p>
                    <p className="mt-2 font-semibold text-white">
                      {totalFields - completedFields}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Bio Length
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {user?.bio
                      ? `${user.bio.trim().length} characters`
                      : "Not provided"}
                  </p>
                </div>
              </div>
            </div>

            <section className={cardClassName}>
              <div className="mb-3 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">Bio</h2>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                  About me
                </span>
              </div>
              <p className="max-w-4xl text-sm leading-7 text-slate-300 md:text-base">
                {user?.bio || "Not provided"}
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <section className={cardClassName}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">
                  Personal Details
                </h2>
                <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-3 py-1 text-xs text-sky-200">
                  Contact & identity
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {personalInfo.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {field.label}
                    </p>
                    <p className="mt-2 break-words text-sm leading-6 text-white">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className={cardClassName}>
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold text-white">
                  Club Details
                </h2>
                <span className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-200">
                  Membership
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {clubInfo.map((field) => (
                  <div
                    key={field.label}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {field.label}
                    </p>
                    <p className="mt-2 break-words text-sm leading-6 text-white">
                      {field.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyProfile;
