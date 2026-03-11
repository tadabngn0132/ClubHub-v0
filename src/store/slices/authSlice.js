import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { 
  login, 
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  refreshAccessToken
} from "../../services/authService"
import {
  setToken,
  removeToken,
  setCurrentUser,
  removeCurrentUser
} from "../../utils/helper"
import { resetStatus } from "./activitySlice"

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
    error: null,
    status: "idle",
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = 'fulfilled'
        state.isLoggedIn = true
        state.currentUser = action.payload.data.necessaryUserData
        state.token = action.payload.data.accessToken
        setToken(action.payload.data.accessToken)
        setCurrentUser(action.payload.data.necessaryUserData)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
        state.status = 'rejected'
      })

      // Logout User
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.isLoggedIn = false
        state.currentUser = null
        state.token = null
        state.status = 'fulfilled'
        removeToken()
        removeCurrentUser()
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
        state.status = 'rejected'
      })

      // Change Password
      .addCase(changePasswordUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(changePasswordUser.fulfilled, (state) => {
        state.isLoading = false
        state.status = 'fulfilled'
      })
      .addCase(changePasswordUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
        state.status = 'rejected'
      })

      // Forgot Password
      .addCase(forgotPasswordUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(forgotPasswordUser.fulfilled, (state) => {
        state.isLoading = false
        state.status = 'fulfilled'
      })
      .addCase(forgotPasswordUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
        state.status = 'rejected'
      })

      // Reset Password
      .addCase(resetPasswordUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(resetPasswordUser.fulfilled, (state) => {
        state.isLoading = false
        state.status = 'fulfilled'
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
        state.status = 'rejected'
      })

      // Refresh Access Token
      .addCase(refreshAccessTokenUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(refreshAccessTokenUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.data.newAccessToken
        setToken(action.payload.data.newAccessToken)
        state.status = 'fulfilled'
      })
      .addCase(refreshAccessTokenUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
        state.status = 'rejected'
      })
  }
});

export const { resetStatus } = authSlice.actions
export default authSlice.reducer