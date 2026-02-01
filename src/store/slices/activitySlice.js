import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createAnActivity,
  getAnActivityById,
  getAllActivities,
  getAllActivitiesBySlug,
  updateAnActivity,
  deleteAnActivity,
  getAllActivitiesByUserId
} from '../../services/activityService'

export const createActivity = createAsyncThunk(
  'activity/createActivity',
  async (activityData, thunkAPI) => {
    try {
      const data = await createAnActivity(activityData)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getActivityById = createAsyncThunk(
  'activity/getActivityById',
  async (id, thunkAPI) => {
    try {
      const data = await getAnActivityById(id)
      
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getActivitiesList = createAsyncThunk(
  'activity/getActivitiesList',
  async (_, thunkAPI) => {
    try {
      const data = await getAllActivities()

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getActivitiesBySlug = createAsyncThunk(
  'activity/getActivitiesBySlug',
  async (slug, thunkAPI) => {
    try {
      const data = await getAllActivitiesBySlug(slug)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateActivityById = createAsyncThunk(
  'activity/updateActivityById',
  async ({ id, activityData }, thunkAPI) => {
    try {
      const data = await updateAnActivity(id, activityData)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const deleteActivityById = createAsyncThunk(
  'activity/deleteActivityById',
  async (id, thunkAPI) => {
    try {
      const data = await deleteAnActivity(id)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getActivitiesByUserId = createAsyncThunk(
  'activity/getActivitiesByUserId',
  async (userId, thunkAPI) => {
    try {
      const data = await getAllActivitiesByUserId(userId)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activities: [],
    activity: null,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Activity
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities.push(action.payload.data)
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })

      // Get Activity By ID
      .addCase(getActivityById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getActivityById.fulfilled, (state, action) => {
        state.isLoading = false
        state.activity = action.payload.data
      })
      .addCase(getActivityById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })

      // Get Activities List
      .addCase(getActivitiesList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getActivitiesList.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = action.payload.data
      })
      .addCase(getActivitiesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })

      // Get Activities By Slug
      .addCase(getActivitiesBySlug.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getActivitiesBySlug.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = action.payload.data
      })
      .addCase(getActivitiesBySlug.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })

      // Update Activity By ID
      .addCase(updateActivityById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateActivityById.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.activities.findIndex(
          (activity) => activity.id === action.payload.data.id
        )
        if (index !== -1) {
          state.activities[index] = action.payload.data
        }
      })
      .addCase(updateActivityById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })

      // Delete Activity By ID
      .addCase(deleteActivityById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteActivityById.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = state.activities.filter(
          (activity) => activity.id !== action.payload.data.id
        )
      })
      .addCase(deleteActivityById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })

      // Get Activities By User ID
      .addCase(getActivitiesByUserId.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getActivitiesByUserId.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = action.payload.data
      })
      .addCase(getActivitiesByUserId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
      })
  }
})

export const {} = activitySlice.actions
export default activitySlice.reducer