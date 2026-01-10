import SideBar from "../internal/SideBar"

const MemberSideBar = () => {
  const memberSideBarItems = [
    { name: 'Dashboard', link: '/member/dashboard' },
    { name: 'Activities', link: '/member/activities' },
    { name: 'Schedule', link: '/member/schedule' },
    { name: 'Tasks', link: '/member/tasks' },
    { name: 'Square', link: '/member/square' },
    { name: 'Profile', link: '/member/profile' },
  ]

  return (
    <SideBar sideBarItemList={memberSideBarItems} />
  )
}

export default MemberSideBar