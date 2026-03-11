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
    error: null,
    status: 'idle'
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle'
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Activity
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities.push(action.payload.data)
        state.status = 'fulfilled'
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
        state.status = 'rejected'
      })

      // Get Activity By ID
      .addCase(getActivityById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(getActivityById.fulfilled, (state, action) => {
        state.isLoading = false
        state.activity = action.payload.data
        state.status = 'fulfilled'
      })
      .addCase(getActivityById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
        state.status = 'rejected'
      })

      // Get Activities List
      .addCase(getActivitiesList.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(getActivitiesList.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = action.payload.data
        state.status = 'fulfilled'
      })
      .addCase(getActivitiesList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
        state.status = 'rejected'
      })

      // Get Activities By Slug
      .addCase(getActivitiesBySlug.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(getActivitiesBySlug.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = action.payload.data
        state.status = 'fulfilled'
      })
      .addCase(getActivitiesBySlug.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
        state.status = 'rejected'
      })

      // Update Activity By ID
      .addCase(updateActivityById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(updateActivityById.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = 'fulfilled'
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
        state.status = 'rejected'
      })

      // Delete Activity By ID
      .addCase(deleteActivityById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(deleteActivityById.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = state.activities.filter(
          (activity) => activity.id !== action.payload.data.id
        )
        state.status = 'fulfilled'
      })
      .addCase(deleteActivityById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
        state.status = 'rejected'
      })

      // Get Activities By User ID
      .addCase(getActivitiesByUserId.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(getActivitiesByUserId.fulfilled, (state, action) => {
        state.isLoading = false
        state.activities = action.payload.data
        state.status = 'fulfilled'
      })
      .addCase(getActivitiesByUserId.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload || action.error.message
        state.status = 'rejected'
      })
  }
})

export const { resetStatus } = activitySlice.actions
export default activitySlice.reducer