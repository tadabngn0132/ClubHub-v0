import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNotification,
  getNotificationById,
  getAllNotifications,
  updateNotification,
  softDeleteNotification,
  hardDeleteNotification,
  getNotificationsByUserId,
  softDeleteNotificationsByUserId,
  hardDeleteNotificationsByUserId,
} from "../../services/notificationService";

export const createNewNotification = createAsyncThunk(
  "notification/createNewNotification",
  async (notificationData, thunkAPI) => {
    try {
      const data = await createNotification(notificationData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getNotificationDetails = createAsyncThunk(
  "notification/getNotificationDetails",
  async (id, thunkAPI) => {
    try {
      const data = await getNotificationById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllNotificationsList = createAsyncThunk(
  "notification/getAllNotificationsList",
  async (_, thunkAPI) => {
    try {
      const data = await getAllNotifications();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateNotificationById = createAsyncThunk(
  "notification/updateNotificationById",
  async ({ id, notificationData }, thunkAPI) => {
    try {
      const data = await updateNotification(id, notificationData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const softDeleteNotificationById = createAsyncThunk(
  "notification/softDeleteNotificationById",
  async (id, thunkAPI) => {
    try {
      const data = await softDeleteNotification(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeleteNotificationById = createAsyncThunk(
  "notification/hardDeleteNotificationById",
  async (id, thunkAPI) => {
    try {
      const data = await hardDeleteNotification(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserNotifications = createAsyncThunk(
  "notification/getUserNotifications",
  async (userId, thunkAPI) => {
    try {
      const data = await getNotificationsByUserId(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const softDeleteUserNotifications = createAsyncThunk(
  "notification/softDeleteUserNotifications",
  async (userId, thunkAPI) => {
    try {
      const data = await softDeleteNotificationsByUserId(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeleteUserNotifications = createAsyncThunk(
  "notification/hardDeleteUserNotifications",
  async (userId, thunkAPI) => {
    try {
      const data = await hardDeleteNotificationsByUserId(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    notificationDetails: null,
    isLoading: false,
    error: null,
    notificationStatus: "idle",
  },
  reducers: {
    resetNotificationError: (state) => {
      state.error = null;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.notificationDetails = null;
    },
    resetNotificationStatus: (state) => {
      state.notificationStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Notification
      .addCase(createNewNotification.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(createNewNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications.push(action.payload.data);
        state.notificationStatus = "fulfilled";
      })
      .addCase(createNewNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      })

      // Get Notification Details
      .addCase(getNotificationDetails.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(getNotificationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationDetails = action.payload.data;
        state.notificationStatus = "fulfilled";
      })
      .addCase(getNotificationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      })

      // Get All Notifications
      .addCase(getAllNotificationsList.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(getAllNotificationsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.datas || action.payload.data || [];
        state.notificationStatus = "fulfilled";
      })
      .addCase(getAllNotificationsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      })

      // Get User Notifications
      .addCase(getUserNotifications.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(getUserNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.datas || action.payload.data || [];
        state.notificationStatus = "fulfilled";
      })
      .addCase(getUserNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      })

      // Update Notification
      .addCase(updateNotificationById.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(updateNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationStatus = "fulfilled";
        const index = state.notifications.findIndex(
          (notif) => notif.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.notifications[index] = action.payload.data;
        }
      })
      .addCase(updateNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      })

      // Soft Delete Notification
      .addCase(softDeleteNotificationById.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(softDeleteNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId =
          action.payload?.dataId ||
          action.payload?.data?.id ||
          action.payload?.id;
        state.notifications = state.notifications.filter(
          (notif) => notif.id !== deletedId,
        );
        state.notificationStatus = "fulfilled";
      })
      .addCase(softDeleteNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      })

      // Hard Delete Notification
      .addCase(hardDeleteNotificationById.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(hardDeleteNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedId =
          action.payload?.dataId ||
          action.payload?.data?.id ||
          action.payload?.id;
        state.notifications = state.notifications.filter(
          (notif) => notif.id !== deletedId,
        );
        state.notificationStatus = "fulfilled";
      })
      .addCase(hardDeleteNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      })

      // Soft Delete User Notifications
      .addCase(softDeleteUserNotifications.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(softDeleteUserNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedIds =
          action.payload?.dataIds || action.payload?.data?.ids || [];
        state.notifications = state.notifications.filter(
          (notif) => !deletedIds.includes(notif.id),
        );
        state.notificationStatus = "fulfilled";
      })
      .addCase(softDeleteUserNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      })

      // Hard Delete User Notifications
      .addCase(hardDeleteUserNotifications.pending, (state) => {
        state.isLoading = true;
        state.notificationStatus = "pending";
      })
      .addCase(hardDeleteUserNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        const deletedIds =
          action.payload?.dataIds || action.payload?.data?.ids || [];
        state.notifications = state.notifications.filter(
          (notif) => !deletedIds.includes(notif.id),
        );
        state.notificationStatus = "fulfilled";
      })
      .addCase(hardDeleteUserNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.notificationStatus = "rejected";
      });
  },
});

export const {
  resetNotificationError,
  clearNotifications,
  resetNotificationStatus,
} = notificationSlice.actions;
export default notificationSlice.reducer;
