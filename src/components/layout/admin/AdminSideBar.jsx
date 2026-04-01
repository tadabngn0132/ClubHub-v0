import SideBar from "../internal/SideBar";

const AdminSideBar = () => {
  const adminSideBarItems = [
    { name: "Dashboard", link: "/admin/dashboard" },
    { name: "Members", link: "/admin/users" },
    { name: "Departments", link: "/admin/departments" },
    { name: "Positions", link: "/admin/positions" },
    { name: "Activities", link: "/admin/activities" },
    { name: "Tasks", link: "/admin/tasks" },
    { name: "AI Assistant", link: "/admin/ai" },
    { name: "Member Applications", link: "/admin/member-applications" },
    { name: "Profile", link: "/admin/profile" },
  ];

  return <SideBar sideBarItemList={adminSideBarItems} />;
};

export default AdminSideBar;
