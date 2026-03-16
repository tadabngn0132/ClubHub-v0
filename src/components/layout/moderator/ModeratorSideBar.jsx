import SideBar from "../internal/SideBar";

const ModeratorSideBar = () => {
  const moderatorSideBarItems = [
    { name: "Dashboard", link: "/moderator/dashboard" },
    { name: "Members", link: "/moderator/users" },
    { name: "Departments", link: "/moderator/departments" },
    { name: "Positions", link: "/moderator/positions" },
    { name: "Member Applications", link: "/moderator/member-applications" },
    { name: "Activities", link: "/moderator/activities" },
    { name: "Schedule", link: "/moderator/schedule" },
    { name: "Tasks", link: "/moderator/tasks" },
    { name: "Profile", link: "/moderator/profile" },
  ];

  return <SideBar sideBarItemList={moderatorSideBarItems} />;
};

export default ModeratorSideBar;
