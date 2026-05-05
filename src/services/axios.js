import axios from "axios";
import { getToken, setToken, touchSessionActivity } from "../utils/helper";
import toast from "react-hot-toast";
import {
  PRIVATE_ROUTE_PREFIXES,
  PRIVATE_API_PREFIXES,
} from "../utils/constants";

let unauthorizedHandler = null;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

const API_BASE_URL =
  import.meta.env.VITE_NODE_ENV === "production"
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.VITE_API_BASE_URL || "http://localhost:5995/api";

// Create an axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];
let isHandlingUnauthorized = false;

const processQueue = (error, newToken = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(newToken);
    }
  });

  failedQueue = [];
};

const requestNewAccessToken = async () => {
  const response = await axios.post(
    `${API_BASE_URL}/auth/refresh-access-token`,
    {},
    {
      timeout: 5000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response?.data?.data?.newAccessToken;
};

const isAuthRequest = (requestUrl = "") => {
  return (
    requestUrl.includes("/auth/login") ||
    requestUrl.includes("/auth/register") ||
    requestUrl.includes("/auth/forgot-password") ||
    requestUrl.includes("/auth/reset-password") ||
    requestUrl.includes("/auth/logout") ||
    requestUrl.includes("/auth/refresh-access-token")
  );
};

const normalizePath = (requestUrl = "") => {
  if (!requestUrl) return "";

  try {
    const parsedUrl = new URL(requestUrl, axiosClient.defaults.baseURL);
    return parsedUrl.pathname.replace(/^\/api/, "") || "/";
  } catch {
    return requestUrl.split("?")[0];
  }
};

const isOnPrivateRoute = () => {
  const currentPath = window.location.pathname || "";
  return PRIVATE_ROUTE_PREFIXES.some((prefix) =>
    currentPath.startsWith(prefix),
  );
};

const isPrivateApiRequest = (requestUrl = "") => {
  const path = normalizePath(requestUrl);
  return PRIVATE_API_PREFIXES.some((prefix) => path.startsWith(prefix));
};

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Attach token to headers if available
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      touchSessionActivity();
    }

    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    switch (response.status) {
      case 200:
        // Handle success
        if (response.config.method !== "get") {
          toast.success(response.data.message || "Request successful");
        }
        break;
      case 201:
        // Handle resource created
        toast.success(response.data.message || "Resource created successfully");
        break;
      case 204:
        // Handle no content
        toast.success(response.data.message || "Request successful");
        break;
      default:
        break;
    }

    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    switch (error.response?.status) {
      case 400:
        // Handle bad request
        toast.error(error.response.data.message || "Bad request");
        break;
      case 401:
        const requestUrl = error.config?.url || "";
        const originalRequest = error.config || {};
        const shouldSkipAutoLogout = isAuthRequest(requestUrl);
        const shouldTryRefresh =
          isOnPrivateRoute() &&
          isPrivateApiRequest(requestUrl) &&
          !shouldSkipAutoLogout;

        if (!shouldTryRefresh || originalRequest._retry) {
          toast.error(error.response?.data?.message || "Unauthorized");
          break;
        }

        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((newToken) => {
              originalRequest.headers = originalRequest.headers || {};
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosClient(originalRequest);
            })
            .catch((queueError) => Promise.reject(queueError));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const newToken = await requestNewAccessToken();

          if (!newToken) {
            throw new Error("Failed to refresh access token");
          }

          setToken(newToken);
          axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosClient(originalRequest);
        } catch (refreshError) {
          processQueue(refreshError, null);

          if (!isHandlingUnauthorized) {
            isHandlingUnauthorized = true;
            toast.error("Session expired. Please log in again.");

            if (unauthorizedHandler) {
              await unauthorizedHandler(refreshError);
            }

            isHandlingUnauthorized = false;
          }
        } finally {
          isRefreshing = false;
        }

        break;
      case 403:
        // Handle forbidden access
        toast.error(
          error.response.data.message ||
            "You do not have permission to perform this action.",
        );
        break;
      case 404:
        // Handle resource not found
        toast.error(
          error.response.data.message || "Requested resource not found.",
        );
        break;
      case 429:
        // Handle too many requests
        toast.error(
          error.response.data.message ||
            "Too many requests. Please slow down and try again later.",
        );
        break;
      case 500:
        // Handle server error
        toast.error(
          error.response.data.message ||
            "Internal server error. Please try again later.",
        );
        break;
      case 502:
        // Handle bad gateway
        toast.error(
          error.response.data.message || "Bad gateway. Please try again later.",
        );
        break;
      case 504:
        // Handle gateway timeout
        toast.error(
          error.response.data.message ||
            "Gateway timeout. Please try again later.",
        );
        break;
      default:
        break;
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
