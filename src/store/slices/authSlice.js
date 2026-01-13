import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { 
  login, 
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  googleAuth,
  googleAuthCallback  
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
      await logout()
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const handleChangePassword = createAsyncThunk(
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

export const handleForgotPassword = createAsyncThunk(
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

export const handleResetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (passwordData, thunkAPI) => {
    try {
      const data = await resetPassword(passwordData)

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
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoggedIn = false
        state.currentUser = null
        state.token = null
        removeToken()
        removeCurrentUser()
      })

      // Change Password
      .addCase(handleChangePassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(handleChangePassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(handleChangePassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })

      // Forgot Password
      .addCase(handleForgotPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(handleForgotPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(handleForgotPassword.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload.data
      })

      // Reset Password
      .addCase(handleResetPassword.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(handleResetPassword.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(handleResetPassword.rejected, (state, action) => {
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