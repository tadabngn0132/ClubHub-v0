import SideBar from "../internal/SideBar"

const ModeratorSideBar = () => {
  const moderatorSideBarItems = [
    { name: 'Dashboard', link: '/moderator/dashboard' },
    { name: 'Activities', link: '/moderator/activities' },
    { name: 'Schedule', link: '/moderator/schedule' },
    { name: 'Tasks', link: '/moderator/tasks' },
    { name: 'Square', link: '/moderator/square' },
    { name: 'Profile', link: '/moderator/profile' },
  ]

  return (
    <SideBar sideBarItemList={moderatorSideBarItems} />
  )
}

export default ModeratorSideBar