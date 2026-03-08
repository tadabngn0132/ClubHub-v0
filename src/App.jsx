import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import ErrorBoundary from './components/layout/public/ErrorBoundary'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'

import {
  publicRoutes,
  memberRoutes,
  moderatorRoutes,
  adminRoutes
} from './routes'

import { useTokenRefresh } from './hooks/useTokenRefresh'

function App() {
  useTokenRefresh()

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<ErrorBoundary />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />  
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {publicRoutes.map(({ path, element}, index) => {
          return <Route key={index} path={path} element={element} />
        })}

        {memberRoutes.map(({ path, element}, index) => {
          return <Route key={index} path={path} element={element} />
        })}

        {moderatorRoutes.map(({ path, element}, index) => {
          return <Route key={index} path={path} element={element} />
        })}

        {adminRoutes.map(({ path, element}, index) => {
          return <Route key={index} path={path} element={element} />
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
