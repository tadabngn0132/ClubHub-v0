import { jwtDecode } from "jwt-decode";
import {
  AUTH_STORAGE_MODE,
  AUTH_STORAGE_MODE_KEY,
  AUTH_LAST_ACTIVE_AT_KEY,
  AUTH_INACTIVITY_TIMEOUT_HOURS,
  AUTH_INACTIVITY_TIMEOUT_HOURS_KEY,
  AUTH_REMEMBER_DAYS_KEY,
  AUTH_REMEMBER_DAY_OPTIONS,
} from "./constants";

const ACCESS_TOKEN_KEY = "accessToken";
const CURRENT_USER_KEY = "currentUser";

const getAuthStorageMode = () => {
  return localStorage.getItem(AUTH_STORAGE_MODE_KEY) || AUTH_STORAGE_MODE.LOCAL;
};

const getInactivityTimeoutHours = () => {
  const configuredHours = Number(
    localStorage.getItem(AUTH_INACTIVITY_TIMEOUT_HOURS_KEY),
  );
  if (Number.isFinite(configuredHours) && configuredHours > 0) {
    return configuredHours;
  }

  return AUTH_INACTIVITY_TIMEOUT_HOURS;
};

const setInactivityTimeoutHours = (hours) => {
  const safeHours = Number(hours);
  if (!Number.isFinite(safeHours) || safeHours <= 0) {
    localStorage.removeItem(AUTH_INACTIVITY_TIMEOUT_HOURS_KEY);
    return;
  }

  localStorage.setItem(AUTH_INACTIVITY_TIMEOUT_HOURS_KEY, String(safeHours));
};

const setAuthStorageMode = (mode) => {
  const safeMode =
    mode === AUTH_STORAGE_MODE.SESSION
      ? AUTH_STORAGE_MODE.SESSION
      : AUTH_STORAGE_MODE.LOCAL;
  localStorage.setItem(AUTH_STORAGE_MODE_KEY, safeMode);

  if (safeMode === AUTH_STORAGE_MODE.SESSION) {
    localStorage.removeItem(AUTH_LAST_ACTIVE_AT_KEY);
    localStorage.removeItem(AUTH_INACTIVITY_TIMEOUT_HOURS_KEY);
    localStorage.removeItem(AUTH_REMEMBER_DAYS_KEY);
  }
};

const configureAuthPersistence = ({ rememberMe, rememberForDays }) => {
  if (!rememberMe) {
    setAuthStorageMode(AUTH_STORAGE_MODE.SESSION);
    return;
  }

  setAuthStorageMode(AUTH_STORAGE_MODE.LOCAL);

  const parsedDays = Number(rememberForDays);
  const safeDays = AUTH_REMEMBER_DAY_OPTIONS.includes(parsedDays)
    ? parsedDays
    : AUTH_REMEMBER_DAY_OPTIONS[1];
  localStorage.setItem(AUTH_REMEMBER_DAYS_KEY, String(safeDays));
  setInactivityTimeoutHours(safeDays * 24);
  touchSessionActivity();
};

const getAuthStorage = () => {
  return getAuthStorageMode() === AUTH_STORAGE_MODE.SESSION
    ? sessionStorage
    : localStorage;
};

const clearAuthFromStorage = (storage) => {
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(CURRENT_USER_KEY);
};

const touchSessionActivity = () => {
  if (getAuthStorageMode() === AUTH_STORAGE_MODE.LOCAL) {
    localStorage.setItem(AUTH_LAST_ACTIVE_AT_KEY, String(Date.now()));
  }
};

const clearAuthSession = () => {
  clearAuthFromStorage(localStorage);
  clearAuthFromStorage(sessionStorage);
  localStorage.removeItem(AUTH_LAST_ACTIVE_AT_KEY);
  localStorage.removeItem(AUTH_INACTIVITY_TIMEOUT_HOURS_KEY);
  localStorage.removeItem(AUTH_REMEMBER_DAYS_KEY);
};

const hasInactivityExpired = () => {
  if (getAuthStorageMode() !== AUTH_STORAGE_MODE.LOCAL) return false;

  const lastActiveAt = Number(
    localStorage.getItem(AUTH_LAST_ACTIVE_AT_KEY) || 0,
  );
  if (!lastActiveAt) return false;

  const timeoutMs = getInactivityTimeoutHours() * 60 * 60 * 1000;
  return Date.now() - lastActiveAt > timeoutMs;
};

const initializeAuthSession = () => {
  if (hasInactivityExpired()) {
    clearAuthSession();
  }
};

// Token helper functions
const getToken = () => {
  initializeAuthSession();
  return getAuthStorage().getItem(ACCESS_TOKEN_KEY);
};

const setToken = (token) => {
  const activeStorage = getAuthStorage();
  const standbyStorage =
    activeStorage === localStorage ? sessionStorage : localStorage;

  standbyStorage.removeItem(ACCESS_TOKEN_KEY);
  activeStorage.setItem(ACCESS_TOKEN_KEY, token);
  touchSessionActivity();
};

const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
};

// User helper functions
const getCurrentUser = () => {
  initializeAuthSession();
  const user = getAuthStorage().getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
};

const setCurrentUser = (user) => {
  const activeStorage = getAuthStorage();
  const standbyStorage =
    activeStorage === localStorage ? sessionStorage : localStorage;

  standbyStorage.removeItem(CURRENT_USER_KEY);
  activeStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  touchSessionActivity();
};

const removeCurrentUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
  sessionStorage.removeItem(CURRENT_USER_KEY);
};

const decodeAccessToken = (token) => {
  if (!token) return null;

  try {
    const decodedAccessToken = jwtDecode(token);
    return decodedAccessToken;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const isTokenNeedToRefresh = (decodedToken) => {
  if (!decodedToken) return false;

  const currentTime = Date.now();
  const expirationTime = decodedToken.exp * 1000;
  const remainingTime = expirationTime - currentTime;
  return remainingTime <= 180000; // 3 minutes
};

const getUserRole = (user) => {
  return user?.userPosition?.find((up) => up.isPrimary)?.position?.systemRole;
};

export {
  getToken,
  setToken,
  removeToken,
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
  getAuthStorageMode,
  setAuthStorageMode,
  configureAuthPersistence,
  getInactivityTimeoutHours,
  touchSessionActivity,
  initializeAuthSession,
  clearAuthSession,
  decodeAccessToken,
  isTokenNeedToRefresh,
  getUserRole,
};
