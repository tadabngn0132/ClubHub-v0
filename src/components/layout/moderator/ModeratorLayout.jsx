import ProtectedRoute from '../../auth/ProtectedRoute.jsx'
import ModeratorHeader from './ModeratorHeader.jsx'
import ModeratorFooter from './ModeratorFooter.jsx'

const ModeratorLayout = ({ children }) => {
  return (
    <>
    <ProtectedRoute>
      <ModeratorHeader />
      { children }
      <ModeratorFooter />
    </ProtectedRoute>
    </>
  )
}

export default ModeratorLayout