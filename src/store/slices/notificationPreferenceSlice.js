import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../../services/notificationPreferenceService";

export const getAllNotificationPreferencesByUserId = createAsyncThunk(
  "notificationPreferences/getAllByUserId",
  async (userId, thunkAPI) => {
    try {
      const data = await getNotificationPreferences(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserNotificationPreferences = createAsyncThunk(
  "notificationPreferences/update",
  async ({ userId, preferenceData }, thunkAPI) => {
    try {
      const data = await updateNotificationPreferences(userId, preferenceData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const notificationPreferenceSlice = createSlice({
  name: "notificationPreferences",
  initialState: {
    preferences: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetNotificationPreferencesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get notification preferences by user ID
      .addCase(getAllNotificationPreferencesByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getAllNotificationPreferencesByUserId.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.preferences = action.payload.data;
        },
      )
      .addCase(
        getAllNotificationPreferencesByUserId.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error =
            action.payload || "Failed to fetch notification preferences.";
        },
      )

      // Update notification preferences
      .addCase(updateUserNotificationPreferences.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserNotificationPreferences.fulfilled, (state, action) => {
        state.isLoading = false;
        state.preferences = action.payload.data;
      })
      .addCase(updateUserNotificationPreferences.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Failed to update notification preferences.";
      });
  },
});

export const { resetNotificationPreferencesError } =
  notificationPreferenceSlice.actions;
export default notificationPreferenceSlice.reducer;
