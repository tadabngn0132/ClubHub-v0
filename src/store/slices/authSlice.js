import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { 
  login, 
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  googleAuth,
  googleAuthCallback,
  refreshAccessToken
} from "../../services/authService"
import {
  setToken,
  removeToken,
  setCurrentUser,
  removeCurrentUser
} from "../../utils/helper"

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const data = await login(userData)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, thunkAPI) => {
    try {
      const data = await logout()

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const changePasswordUser = createAsyncThunk(
  'auth/changePassword',
  async (passwordData, thunkAPI) => {
    try {
      const data = await changePassword(passwordData)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const forgotPasswordUser = createAsyncThunk(
  'auth/forgotPassword',
  async (emailData, thunkAPI) => {
    try {
      const data = await forgotPassword(emailData)
      
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }
      
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const resetPasswordUser = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, thunkAPI) => {
    try {
      const data = await resetPassword(resetData)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const refreshAccessTokenUser = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, thunkAPI) => {
    try {
      const data = await refreshAccessToken()

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    currentUser: null,
    token: null,
    isLoading: false,
    error: null
  },
  reducers: {
    logoutAction: (state) => {
      state.currentUser = null;
      state.token = null;
    },
    loginAction: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.currentUser = action.payload.data.necessaryUserData
        state.token = action.payload.data.accessToken
        setToken(action.payload.data.accessToken)
        setCurrentUser(action.payload.data.necessaryUserData)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })

      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
        state.token = null
        removeToken()
        removeCurrentUser()
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })

      // Change Password
      .addCase(changePasswordUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(changePasswordUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(changePasswordUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })

      // Forgot Password
      .addCase(forgotPasswordUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })

      // Reset Password
      .addCase(resetPasswordUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })

      // Refresh Access Token
      .addCase(refreshAccessTokenUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(refreshAccessTokenUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.data.newAccessToken
        setToken(action.payload.data.newAccessToken)
      })
      .addCase(refreshAccessTokenUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })
  }
});

export const { 
  registerAction,
  loginAction, 
  logoutAction 
} = authSlice.actions
export default authSlice.reducer