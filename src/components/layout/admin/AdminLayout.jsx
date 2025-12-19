import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import AdminHeader from './AdminHeader.jsx'
import AdminFooter from './AdminFooter.jsx'

const AdminLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <AdminHeader />
        { children }
        <AdminFooter />
      </ProtectedRoute>
    </>
  )
}

export default AdminLayout