import { formatDate } from "../../../utils/formatters";

const Profile = (user) => {

  tabs = [
    { name: "Basic Info", component: () => (
      <div className="p-4">
        <img src={user?.avatarUrl || null } alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role}</p>
        <p>Member Since: {user?.createdAt && formatDate(user.createdAt)}</p>
      </div>
    )},
    { name: "Club Info", component: () => (
      <div className="p-4">
        <p>Club Info content goes here...</p>
        </div>
    )},
    { name: "Additional Info", component: () => (
      <div className="p-4">
        <p>Additional Info content goes here...</p>
        </div>
    )},
  ]

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <div className="border-b mb-4">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`py-2 px-4 ${index === 0 ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"}`}
              type="button"
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Render active tab content */}
      {tabs.map((tab, index) => (
        <div key={index} style={{ display: index === 0 ? "block" : "none" }}>
          <tab.component />
        </div>
      ))}
    </div>
  );
};

export default Profile;
