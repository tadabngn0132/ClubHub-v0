import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import AdminHeader from './AdminHeader.jsx'
import AdminFooter from './AdminFooter.jsx'
import AdminSideBar from './AdminSideBar.jsx'

const AdminLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <AdminHeader />
        <main className="flex">
          <AdminSideBar />
          { children }
        </main>
        <AdminFooter />
      </ProtectedRoute>
    </>
  )
}

export default AdminLayout