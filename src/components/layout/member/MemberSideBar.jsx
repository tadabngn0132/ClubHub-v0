import SideBar from "../internal/SideBar";

const MemberSideBar = () => {
  const memberSideBarItems = [
    { name: "Dashboard", link: "/member/dashboard" },
    { name: "Members", link: "/member/users" },
    { name: "Departments", link: "/member/departments" },
    { name: "Positions", link: "/member/positions" },
    { name: "Activities", link: "/member/activities" },
    { name: "Tasks", link: "/member/tasks" },
    { name: "AI Assistant", link: "/member/ai" },
    { name: "Profile", link: "/member/profile" },
  ];

  return <SideBar sideBarItemList={memberSideBarItems} />;
};

export default MemberSideBar;
