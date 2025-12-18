import ProtectedRoute from '../../components/auth/ProtectedRoute'

const MemberLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <MemberHeader />
        { children }
        <MemberFooter />
      </ProtectedRoute>
    </>
  )
}
export const memberRoutes = [
  {
    path: '/member/dashboard',
    element: (
      <MemberLayout>
        <MemberDashboard />
      </MemberLayout>
    )
  },
  {
    path: '/member/activities',
    element: (
      <MemberLayout>
        <MemberActivities />
      </MemberLayout>
    )
  },
  {
    path: '/member/schedule',
    element: (
      <MemberLayout>
        <MemberSchedule />
      </MemberLayout>
    )
  },
  {
    path: '/member/tasks',
    element: (
      <MemberLayout>
        <MemberTasks />
      </MemberLayout>
    )
  },
  {
    path: '/member/square',
    element: (
      <MemberLayout>
        <MemberSquare />
      </MemberLayout>
    )
  },
  {
    path: '/member/profile',
    element: (
      <MemberLayout>
        <MemberProfile />
      </MemberLayout>
    )
  },
]
