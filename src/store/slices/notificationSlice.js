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
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.notificationDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Notification
      .addCase(createNewNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications.push(action.payload.notification);
      })
      .addCase(createNewNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Notification Details
      .addCase(getNotificationDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNotificationDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.notificationDetails = action.payload.notification;
      })
      .addCase(getNotificationDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Notifications
      .addCase(getAllNotificationsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllNotificationsList.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
      })
      .addCase(getAllNotificationsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User Notifications
      .addCase(getUserNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload.notifications;
      })
      .addCase(getUserNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Notification
      .addCase(updateNotificationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNotificationById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notifications.findIndex(
          (notif) => notif._id === action.payload.notification._id,
        );
        if (index !== -1) {
          state.notifications[index] = action.payload.notification;
        }
      })
      .addCase(updateNotificationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Notification
      .addCase(deleteNotificationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNotificationById.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = state.notifications.filter(
          (notif) => notif._id !== action.payload.notificationId,
        );
      })
      .addCase(deleteNotificationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
