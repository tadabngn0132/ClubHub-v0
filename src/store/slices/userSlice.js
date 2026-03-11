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
    error: null,
    status: 'idle'
  },
  reducers: {
    resetStatus: (state) => {
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      // Create User
      .addCase(createUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.users.push(action.payload.user)
        state.status = 'fulfilled'
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.status = 'rejected'
      })

      // Get User By ID
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.data
        state.status = 'fulfilled'
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.status = 'rejected'
      })

      // Get Users List
      .addCase(getUsersList.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(getUsersList.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = action.payload.data
        state.status = 'fulfilled'
      })
      .addCase(getUsersList.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.status = 'rejected'
      })
      
      // Update User By ID
      .addCase(updateUserById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.status = 'fulfilled'
        const index = state.users.findIndex(user => user.id === action.payload.data.id)
        if (index !== -1) {
          state.users[index] = action.payload.data
        }
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.status = 'rejected'
      })
      
      // Delete User By ID
      .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true
        state.error = null
        state.status = 'pending'
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.isLoading = false
        state.users = state.users.filter(user => user.id !== action.payload.user.id)
        state.status = 'fulfilled'
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.status = 'rejected'
      })
  }
})

export const { resetStatus } = userSlice.actions
export default userSlice.reducer