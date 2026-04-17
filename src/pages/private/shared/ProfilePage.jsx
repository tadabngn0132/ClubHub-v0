import { useState } from "react";
import MyProfile from "../../../components/main/internal/MyProfile";
import MyEvents from "../../../components/main/internal/MyEvents";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("my-profile");

  return (
    <div className="space-y-4 text-slate-100">
      <div className="rounded-2xl border border-white/10 bg-slate-900/75 p-2 backdrop-blur">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("my-profile")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === "my-profile"
                ? "bg-sky-500/20 text-sky-200"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            My Profile
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("my-events")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              activeTab === "my-events"
                ? "bg-violet-500/20 text-violet-200"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            My Events
          </button>
        </div>
      </div>

      {activeTab === "my-profile" ? <MyProfile /> : <MyEvents />}
    </div>
  );
};

export default ProfilePage;
