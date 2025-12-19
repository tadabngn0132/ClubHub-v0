import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import MemberHeader from './MemberHeader.jsx'
import MemberFooter from './MemberFooter.jsx'

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

export default MemberLayout