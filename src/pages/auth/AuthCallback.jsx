import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  refreshAccessTokenUser,
  setGoogleAuthData,
} from "../../store/slices/authSlice";
import toast from "react-hot-toast";
import { getUserRole } from "../../utils/helper";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCallback = async () => {
      const success = searchParams.get("success");
      const userData = searchParams.get("user");
      const accessToken = searchParams.get("accessToken");
      const message = searchParams.get("message");

      if (success && userData && accessToken) {
        const user = JSON.parse(decodeURIComponent(userData));

        if (
          !accessToken ||
          accessToken === "null" ||
          accessToken === "undefined"
        ) {
          // Gọi API lấy accessToken
          dispatch(refreshAccessTokenUser());
        } else {
          // Lưu accessToken và userData vào Redux store
          dispatch(
            setGoogleAuthData({ userData: user, accessToken: accessToken }),
          );
        }

        const role = getUserRole(user)?.toLowerCase();

        // Redirect dựa trên role
        switch (role) {
          case "admin":
            navigate("/admin/dashboard");
            toast.success("Login successfully");
            break;
          case "moderator":
            navigate("/moderator/dashboard");
            toast.success("Login successfully");
            break;
          case "member":
            navigate("/member/dashboard");
            toast.success("Login successfully");
            break;
          default:
            navigate("/sign-in");
            toast.error("Login failed. Please try again.");
            break;
        }
      } else {
        navigate("/sign-in");
        toast.error(message || "Login failed. Please try again.");
      }
    };

    handleCallback();
  }, [searchParams, navigate, dispatch]);

  return <div>Authenticating...</div>;
};

export default AuthCallback;
