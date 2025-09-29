import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, thunkAPI) => {
    try {
      // TODO: Implement login logic here
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
});

export const { 
  registerAction,
  loginAction, 
  logoutAction 
} = authSlice.actions;
export default authSlice.reducer;