import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createAnActivity,
  getActivityById,
  getAllActivities,
  getActivitiesBySlug,
  updateAnActivity,
  deleteAnActivity
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
      const data = await getActivityById(id)
      
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
      const data = await getActivitiesBySlug(slug)

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
  }
})

export const {} = activitySlice.actions
export default activitySlice.reducer