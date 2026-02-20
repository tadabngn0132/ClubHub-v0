import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  createAnUser,
  getAnUserById,
  getAllUsers,
  updateAnUser,
  deleteAnUser
} from '../../services/userService'

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, thunkAPI) => {
    try {
      const data = await createAnUser(userData)
      
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }
      
      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getUserById = createAsyncThunk(
  'user/getUserById',
  async (id, thunkAPI) => {
    try {
      const data = await getAnUserById(id)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const getUsersList = createAsyncThunk(
  'user/getUsersList',
  async (_, thunkAPI) => {
    try {
      const data = await getAllUsers()

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const updateUserById = createAsyncThunk(
  'user/updateUserById',
  async ({ id, userData }, thunkAPI) => {
    try {
      const data = await updateAnUser(id, userData)
      
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

export const deleteUserById = createAsyncThunk(
  'user/deleteUserById',
  async (id, thunkAPI) => {
    try {
      const data = await deleteAnUser(id)

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message)
      }

      return data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    user: null,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create User
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users.push(action.payload.user)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Get User By ID
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })

      // Get Users List
      .addCase(getUsersList.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.data
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Update User By ID
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.users.findIndex(user => user.id === action.payload.data.id)
        if (index !== -1) {
          state.users[index] = action.payload.data
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      
      // Delete User By ID
      .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = state.users.filter(user => user.id !== action.payload.user.id)
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const {} = userSlice.actions
export default userSlice.reducer