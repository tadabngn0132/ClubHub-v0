import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import ErrorBoundary from "./components/layout/public/ErrorBoundary";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import AuthCallback from "./pages/auth/AuthCallback";

import {
  publicRoutes,
  memberRoutes,
  moderatorRoutes,
  adminRoutes,
} from "./routes";

import { useTokenRefresh } from "./hooks/useTokenRefresh";
import { useSelector } from "react-redux";
import { getToken, getCurrentUser } from "./utils/helper";
import { PRIVATE_ROUTE_PREFIXES } from "./utils/constants";

function TokenRefreshGate({ isLoggedInToWebsite }) {
  const { pathname } = useLocation();

  const isPrivateRoute = PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );

  useTokenRefresh(isLoggedInToWebsite && isPrivateRoute);

  return null;
}

function App() {
  const { isLoggedIn, token, currentUser } = useSelector((state) => state.auth);

  const isLoggedInToWebsite = isLoggedIn || (token && currentUser) || (getToken() && getCurrentUser());

  return (
    <BrowserRouter basename="/">
      <TokenRefreshGate isLoggedInToWebsite={isLoggedInToWebsite} />

      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<ErrorBoundary />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {publicRoutes.map(({ path, element }, index) => {
          return <Route key={index} path={path} element={element} />;
        })}

        {memberRoutes.map(({ path, element }, index) => {
          return <Route key={index} path={path} element={element} />;
        })}

        {moderatorRoutes.map(({ path, element }, index) => {
          return <Route key={index} path={path} element={element} />;
        })}

        {adminRoutes.map(({ path, element }, index) => {
          return <Route key={index} path={path} element={element} />;
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
