import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import AdminHeader from './AdminHeader.jsx'
import AdminFooter from './AdminFooter.jsx'
import AdminSideBar from './AdminSideBar.jsx'

const AdminLayout = ({ children }) => {
  return (
    <>
      <ProtectedRoute>
        <AdminHeader />
        <main className="flex mt-[61.2px]">
          <AdminSideBar />
          <div className="flex-1">
            { children }
          </div>
        </main>
        <AdminFooter />
      </ProtectedRoute>
    </>
  )
}

export default AdminLayout