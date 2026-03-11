import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNotification,
  getNotificationById,
  getAllNotifications,
  getNotificationsByUserId,
  updateNotification,
  deleteNotification,
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

export const deleteNotificationById = createAsyncThunk(
  "notification/deleteNotificationById",
  async (id, thunkAPI) => {
    try {
      const data = await deleteNotification(id);

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
    status: "idle",
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.notificationDetails = null;
    },
    resetStatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Notification
      .addCase(createNewNotification.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(createNewNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications.push(action.payload.notification);
        state.status = 'fulfilled';
      })
      .addCase(createNewNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Get Notification Details
      .addCase(getNotificationDetails.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(getNotificationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notificationDetails = action.payload.notification;
        state.status = 'fulfilled';
      })
      .addCase(getNotificationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Get All Notifications
      .addCase(getAllNotificationsList.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(getAllNotificationsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
        state.status = 'fulfilled';
      })
      .addCase(getAllNotificationsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Get User Notifications
      .addCase(getUserNotifications.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(getUserNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload.notifications;
        state.status = 'fulfilled';
      })
      .addCase(getUserNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Update Notification
      .addCase(updateNotificationById.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(updateNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'fulfilled';
        const index = state.notifications.findIndex(
          (notif) => notif._id === action.payload.notification._id,
        );
        if (index !== -1) {
          state.notifications[index] = action.payload.notification;
        }
      })
      .addCase(updateNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Delete Notification
      .addCase(deleteNotificationById.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(deleteNotificationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = state.notifications.filter(
          (notif) => notif._id !== action.payload.notificationId,
        );
        state.status = 'fulfilled';
      })
      .addCase(deleteNotificationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      });
  },
});

export const { clearError, clearNotifications, resetStatus } = notificationSlice.actions;
export default notificationSlice.reducer;
