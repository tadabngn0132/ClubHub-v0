import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import MemberHeader from './MemberHeader.jsx'
import MemberFooter from './MemberFooter.jsx'
import MemberSideBar from './MemberSideBar.jsx'

const MemberLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <MemberHeader />
        <MemberSideBar />
        { children }
        <MemberFooter />
      </ProtectedRoute>
    </>
  )
}

export default MemberLayout