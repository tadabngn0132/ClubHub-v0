import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  login,
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshAccessToken,
} from "../../services/authService";
import {
  getToken,
  setToken,
  removeToken,
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
  setAuthStorageMode,
  configureAuthPersistence,
} from "../../utils/helper";
import { AUTH_STORAGE_MODE } from "../../utils/constants";
import { getThunkErrorPayload } from "../../utils/thunkError";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    try {
      const loginPayload = {
        email: userData.email,
        password: userData.password,
        rememberMe: Boolean(userData.rememberMe),
        rememberForDays: Number(userData.rememberForDays),
      };
      const data = await login(loginPayload);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return {
        ...data,
        rememberMe: Boolean(userData.rememberMe),
        rememberForDays: Number(userData.rememberForDays),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const data = await logout();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const changePasswordUser = createAsyncThunk(
  "auth/changePassword",
  async (passwordData, thunkAPI) => {
    try {
      const data = await changePassword(passwordData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const forgotPasswordUser = createAsyncThunk(
  "auth/forgotPassword",
  async (emailData, thunkAPI) => {
    try {
      const data = await forgotPassword(emailData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const resetPasswordUser = createAsyncThunk(
  "auth/resetPassword",
  async (resetData, thunkAPI) => {
    try {
      const data = await resetPassword(resetData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const refreshAccessTokenUser = createAsyncThunk(
  "auth/refreshAccessToken",
  async (_, thunkAPI) => {
    try {
      const data = await refreshAccessToken();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    currentUser: null || getCurrentUser(),
    token: null || getToken(),
    isLoading: false,
    error: null,
    authStatus: "idle",
  },
  reducers: {
    resetAuthStatus: (state) => {
      state.authStatus = "idle";
    },
    setGoogleAuthData: (state, action) => {
      state.isLoggedIn = true;
      state.currentUser = action.payload.userData;
      state.token = action.payload.accessToken;
      setAuthStorageMode(AUTH_STORAGE_MODE.LOCAL);
      setToken(action.payload.accessToken);
      setCurrentUser(action.payload.userData);
    },
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.authStatus = "pending";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.authStatus = "fulfilled";
        state.isLoggedIn = true;
        state.currentUser = action.payload.data.necessaryUserData;
        state.token = action.payload.data.accessToken;

        configureAuthPersistence({
          rememberMe: action.payload.rememberMe,
          rememberForDays: action.payload.rememberForDays,
        });
        setToken(action.payload.data.accessToken);
        setCurrentUser(action.payload.data.necessaryUserData);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.authStatus = "rejected";
      })

      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.authStatus = "pending";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
        state.token = null;
        state.authStatus = "fulfilled";
        setAuthStorageMode(AUTH_STORAGE_MODE.LOCAL);
        removeToken();
        removeCurrentUser();
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.authStatus = "rejected";
      })

      // Change Password
      .addCase(changePasswordUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.authStatus = "pending";
      })
      .addCase(changePasswordUser.fulfilled, (state) => {
        state.isLoading = false;
        state.authStatus = "fulfilled";
      })
      .addCase(changePasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.authStatus = "rejected";
      })

      // Forgot Password
      .addCase(forgotPasswordUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.authStatus = "pending";
      })
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.isLoading = false;
        state.authStatus = "fulfilled";
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.authStatus = "rejected";
      })

      // Reset Password
      .addCase(resetPasswordUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.authStatus = "pending";
      })
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.isLoading = false;
        state.authStatus = "fulfilled";
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.authStatus = "rejected";
      })

      // Refresh Access Token
      .addCase(refreshAccessTokenUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.authStatus = "pending";
      })
      .addCase(refreshAccessTokenUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.newAccessToken;
        setToken(action.payload.data.newAccessToken);
        state.authStatus = "fulfilled";
      })
      .addCase(refreshAccessTokenUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.authStatus = "rejected";
      });
  },
});

export const { resetAuthStatus, resetAuthError, setGoogleAuthData } =
  authSlice.actions;
export default authSlice.reducer;
