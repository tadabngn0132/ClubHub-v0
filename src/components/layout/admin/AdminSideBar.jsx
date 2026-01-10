import SideBar from "../internal/SideBar"

const AdminSideBar = () => {
  const adminSideBarItems = [
    { name: 'Dashboard', link: '/admin/dashboard' },
    { name: 'Activities', link: '/admin/activities' },
    { name: 'Members', link: '/admin/members' },
    { name: 'Schedule', link: '/admin/schedule' },
    { name: 'Tasks', link: '/admin/tasks' },
    { name: 'Square', link: '/admin/square' },
    { name: 'Profile', link: '/admin/profile' },
  ]

  return (
    <SideBar sideBarItemList={adminSideBarItems} />
  )
}

export default AdminSideBar