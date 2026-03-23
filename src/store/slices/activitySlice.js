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
  createActivityImages,
} from "../../services/activityService";

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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createActivityImages = createAsyncThunk(
  "activity/createActivityImages",
  async ({ activityId, formData }, thunkAPI) => {
    try {
      const data = await createActivityImages(activityId, formData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
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
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const activitySlice = createSlice({
  name: "activity",
  initialState: {
    activities: [],
    activityImages: [],
    activity: null,
    isLoading: false,
    error: null,
    activityStatus: "idle",
  },
  reducers: {
    resetActivityStatus: (state) => {
      state.activityStatus = "idle";
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
          (activity) => activity.id !== action.payload.data.id,
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

      // Create Activity Images
      .addCase(createActivityImages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.activityStatus = "pending";
      })
      .addCase(createActivityImages.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.activityImages.findIndex(
          (image) => image.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.activityImages[index] = action.payload.data;
        }
        state.activityStatus = "fulfilled";
      })
      .addCase(createActivityImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.activityStatus = "rejected";
      });
    }
});

export const { resetActivityStatus } = activitySlice.actions;
export default activitySlice.reducer;
