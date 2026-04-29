import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAnUser,
  getAnUserById,
  getAllUsers,
  updateAnUser,
  updateAnUserProfile,
  softDeleteAnUser,
  hardDeleteAnUser,
  unlockAnUserAccount,
  getUserDashboardStats,
  restoreAnUser,
} from "../../services/userService";

export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, thunkAPI) => {
    try {
      const data = await createAnUser(userData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserById = createAsyncThunk(
  "user/getUserById",
  async (id, thunkAPI) => {
    try {
      const data = await getAnUserById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUsersList = createAsyncThunk(
  "user/getUsersList",
  async (_, thunkAPI) => {
    try {
      const data = await getAllUsers();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateUserById = createAsyncThunk(
  "user/updateUserById",
  async ({ id, userData }, thunkAPI) => {
    try {
      const data = await updateAnUser(id, userData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateUserProfileById = createAsyncThunk(
  "user/updateUserProfileById",
  async ({ id, userData }, thunkAPI) => {
    try {
      const data = await updateAnUserProfile(id, userData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const softDeleteUserById = createAsyncThunk(
  "user/softDeleteUserById",
  async (id, thunkAPI) => {
    try {
      const data = await softDeleteAnUser(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeleteUserById = createAsyncThunk(
  "user/hardDeleteUserById",
  async (id, thunkAPI) => {
    try {
      const data = await hardDeleteAnUser(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const unlockUserAccount = createAsyncThunk(
  "user/unlockUserAccount",
  async (id, thunkAPI) => {
    try {
      const data = await unlockAnUserAccount(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllUserDashboardStats = createAsyncThunk(
  "user/getAllUserDashboardStats",
  async (userId, thunkAPI) => {
    try {
      const data = await getUserDashboardStats(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const restoreUserById = createAsyncThunk(
  "user/restoreUserById",
  async (id, thunkAPI) => {
    try {
      const data = await restoreAnUser(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    user: null,
    isLoading: false,
    error: null,
    userStatus: "idle",
    dashboardStats: null,
  },
  reducers: {
    resetUserStatus: (state) => {
      state.userStatus = "idle";
    },
    resetUserError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create User
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload.data);
        state.userStatus = "fulfilled";
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      })

      // Get User By ID
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
        state.userStatus = "fulfilled";
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      })

      // Get Users List
      .addCase(getUsersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.userStatus = "fulfilled";
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      })

      // Update User By ID
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStatus = "fulfilled";
        const index = state.users.findIndex(
          (user) => user.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.users[index] = action.payload.data;
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      })

      // Update User Profile By ID
      .addCase(updateUserProfileById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(updateUserProfileById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStatus = "fulfilled";
        const index = state.users.findIndex(
          (user) => user.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.users[index] = action.payload.data;
        }
      })
      .addCase(updateUserProfileById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      })

      // Soft Delete User By ID
      .addCase(softDeleteUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(softDeleteUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
        state.userStatus = "fulfilled";
      })
      .addCase(softDeleteUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      })

      // Hard Delete User By ID
      .addCase(hardDeleteUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(hardDeleteUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
        state.userStatus = "fulfilled";
      })
      .addCase(hardDeleteUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      })

      // Unlock User Account
      .addCase(unlockUserAccount.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(unlockUserAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userStatus = "fulfilled";
      })
      .addCase(unlockUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      })

      // Get User Dashboard Stats
      .addCase(getAllUserDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUserDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardStats = action.payload.data;
      })
      .addCase(getAllUserDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Restore User By ID
      .addCase(restoreUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userStatus = "pending";
      })
      .addCase(restoreUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload.data);
        state.userStatus = "fulfilled";
      })
      .addCase(restoreUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userStatus = "rejected";
      });
  },
});

export const { resetUserStatus, resetUserError } = userSlice.actions;
export default userSlice.reducer;
