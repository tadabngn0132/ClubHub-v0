import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import ModeratorHeader from './ModeratorHeader.jsx'
import ModeratorFooter from './ModeratorFooter.jsx'
import ModeratorSideBar from './ModeratorSideBar.jsx'

const ModeratorLayout = ({ children }) => {
  return (
    <>
    <ProtectedRoute>
      <ModeratorHeader />
      <main className="flex">
        <ModeratorSideBar />
        { children }
      </main>
      <ModeratorFooter />
    </ProtectedRoute>
    </>
  )
}

export default ModeratorLayout