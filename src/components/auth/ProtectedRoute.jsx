import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCurrentUser, getToken } from "../../utils/helper";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { token, currentUser } = useSelector((state) => state.auth);
  const accessToken = token || getToken();
  const currentUserInfo = currentUser || getCurrentUser();
  const role = currentUserInfo?.userPosition[0]?.position?.systemRole.toLowerCase();

  useEffect(() => {
    if (!accessToken || accessToken === null) {
      navigate("/sign-in");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      navigate("/sign-in");
    }
  }, [accessToken, role, allowedRoles, navigate]);

  if (!accessToken || accessToken === null) return null;
  if (allowedRoles && !allowedRoles.includes(role)) return null;

  return <>{children}</>;
};

export default ProtectedRoute;
