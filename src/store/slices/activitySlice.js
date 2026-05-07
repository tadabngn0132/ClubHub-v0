import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAnActivity,
  getAnActivityById,
  getAllActivities,
  getAllActivitiesBySlug,
  updateAnActivity,
  softDeleteAnActivity,
  hardDeleteAnActivity,
  getAllActivitiesByUserId,
  createActivityImage,
  createActivityVideo,
  deleteActivityImage,
  deleteActivityVideo,
  getICSFile,
  restoreAnActivity,
} from "../../services/activityService";
import { getThunkErrorPayload } from "../../utils/thunkError";

export const createActivity = createAsyncThunk(
  "activity/createActivity",
  async (activityData, thunkAPI) => {
    try {
      const data = await createAnActivity(activityData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getActivityById = createAsyncThunk(
  "activity/getActivityById",
  async (id, thunkAPI) => {
    try {
      const data = await getAnActivityById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getActivitiesList = createAsyncThunk(
  "activity/getActivitiesList",
  async (_, thunkAPI) => {
    try {
      const data = await getAllActivities();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getActivitiesBySlug = createAsyncThunk(
  "activity/getActivitiesBySlug",
  async (slug, thunkAPI) => {
    try {
      const data = await getAllActivitiesBySlug(slug);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const updateActivityById = createAsyncThunk(
  "activity/updateActivityById",
  async ({ id, activityData }, thunkAPI) => {
    try {
      const data = await updateAnActivity(id, activityData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const softDeleteActivityById = createAsyncThunk(
  "activity/softDeleteActivityById",
  async (id, thunkAPI) => {
    try {
      const data = await softDeleteAnActivity(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const hardDeleteActivityById = createAsyncThunk(
  "activity/hardDeleteActivityById",
  async (id, thunkAPI) => {
    try {
      const data = await hardDeleteAnActivity(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const createNewActivityImage = createAsyncThunk(
  "activity/createNewActivityImage",
  async ({ activityId, imageData }, thunkAPI) => {
    try {
      const data = await createActivityImage(activityId, imageData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getActivitiesByUserId = createAsyncThunk(
  "activity/getActivitiesByUserId",
  async (userId, thunkAPI) => {
    try {
      const data = await getAllActivitiesByUserId(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const createNewActivityVideo = createAsyncThunk(
  "activity/createNewActivityVideo",
  async ({ activityId, videoData }, thunkAPI) => {
    try {
      const data = await createActivityVideo(activityId, videoData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const deleteActivityImageById = createAsyncThunk(
  "activity/deleteActivityImageById",
  async (imageId, thunkAPI) => {
    try {
      const data = await deleteActivityImage(imageId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const deleteActivityVideoById = createAsyncThunk(
  "activity/deleteActivityVideoById",
  async (videoId, thunkAPI) => {
    try {
      const data = await deleteActivityVideo(videoId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getICSFileByActivityId = createAsyncThunk(
  "activity/getICSFileByActivityId",
  async (activityId, thunkAPI) => {
    try {
      const data = await getICSFile(activityId);
      // ICS endpoint returns raw text content, not JSON
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const restoreAnActivityById = createAsyncThunk(
  "activity/restoreAnActivityById",
  async (id, thunkAPI) => {
    try {
      const data = await restoreAnActivity(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activities: [],
    activity: null,
    isLoading: false,
    error: null,
    activityStatus: "idle",
  },
  reducers: {
    resetActivityStatus: (state) => {
      state.activityStatus = "idle";
    },
    resetActivityError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Activity
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities.push(action.payload.data);
        state.activityStatus = "fulfilled";
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Get Activity By ID
      .addCase(getActivityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(getActivityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activity = action.payload.data;
        state.activityStatus = "fulfilled";
      })
      .addCase(getActivityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Get Activities List
      .addCase(getActivitiesList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(getActivitiesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload.data;
        state.activityStatus = "fulfilled";
      })
      .addCase(getActivitiesList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Get Activities By Slug
      .addCase(getActivitiesBySlug.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(getActivitiesBySlug.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload.data;
        state.activityStatus = "fulfilled";
      })
      .addCase(getActivitiesBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Update Activity By ID
      .addCase(updateActivityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(updateActivityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityStatus = "fulfilled";
        const index = state.activities.findIndex(
          (activity) => activity.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.activities[index] = action.payload.data;
        }
      })
      .addCase(updateActivityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Soft Delete Activity By ID
      .addCase(softDeleteActivityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(softDeleteActivityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = state.activities.filter(
          (activity) => activity.id !== action.meta.arg,
        );
        state.activityStatus = "fulfilled";
      })
      .addCase(softDeleteActivityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Hard Delete Activity By ID
      .addCase(hardDeleteActivityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(hardDeleteActivityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = state.activities.filter(
          (activity) => activity.id !== action.payload.data.id,
        );
        state.activityStatus = "fulfilled";
      })
      .addCase(hardDeleteActivityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Get Activities By User ID
      .addCase(getActivitiesByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(getActivitiesByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activities = action.payload.data;
        state.activityStatus = "fulfilled";
      })
      .addCase(getActivitiesByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Create Activity Image
      .addCase(createNewActivityImage.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(createNewActivityImage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityStatus = "fulfilled";
      })
      .addCase(createNewActivityImage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Create Activity Video
      .addCase(createNewActivityVideo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(createNewActivityVideo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityStatus = "fulfilled";
      })
      .addCase(createNewActivityVideo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Delete Activity Image
      .addCase(deleteActivityImageById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(deleteActivityImageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityStatus = "fulfilled";
      })
      .addCase(deleteActivityImageById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Delete Activity Video
      .addCase(deleteActivityVideoById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(deleteActivityVideoById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityStatus = "fulfilled";
      })
      .addCase(deleteActivityVideoById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Get ICS File By Activity ID
      .addCase(getICSFileByActivityId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(getICSFileByActivityId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityStatus = "fulfilled";
      })
      .addCase(getICSFileByActivityId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      })

      // Restore An Activity By ID
      .addCase(restoreAnActivityById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(restoreAnActivityById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityStatus = "fulfilled";
      })
      .addCase(restoreAnActivityById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      });
  },
});

export const { resetActivityStatus, resetActivityError } =
  activitySlice.actions;
export default activitySlice.reducer;
