import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCurrentUser, getToken } from "../../utils/helper";
import Loading from "../layout/internal/Loading";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const navigate = useNavigate();
  const { token, currentUser } = useSelector((state) => state.auth);
  const accessToken = token || getToken();
  const currentUserInfo = currentUser || getCurrentUser();
  const role =
    currentUserInfo?.userPosition?.[0]?.position?.systemRole?.toLowerCase();
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    if (!accessToken || accessToken === null) {
      navigate("/sign-in");
      setIsCheckingAccess(false);
      return;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
      navigate("/sign-in");
      setIsCheckingAccess(false);
      return;
    }

    setIsCheckingAccess(false);
  }, [accessToken, role, allowedRoles, navigate]);

  if (isCheckingAccess) return <Loading />;
  if (!accessToken || accessToken === null) return <Loading />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Loading />;

  return <>{children}</>;
};

export default ProtectedRoute;
