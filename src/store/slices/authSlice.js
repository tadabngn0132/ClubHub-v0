import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  login, 
  register, 
  logout,
  changePassword,
  forgotPassword,
  resetPassword,
  googleAuth,
  googleAuthCallback  
} from "../../services/authService";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      const data = await login(userData)
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

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
    registerAction: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isLoggedIn = true
        state.currentUser = action.payload.necessaryUserData
        state.token = action.payload.accessToken
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const { 
  registerAction,
  loginAction, 
  logoutAction 
} = authSlice.actions;
export default authSlice.reducer;