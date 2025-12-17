import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from './pages/auth/SignIn'
import ErrorBoundary from './components/layout/public/ErrorBoundary'

import {
  publicRoutes,
  memberRoutes,
  moderatorRoutes,
  adminRoutes
} from './routes'

function App() {

  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="*" element={<ErrorBoundary />} />

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
