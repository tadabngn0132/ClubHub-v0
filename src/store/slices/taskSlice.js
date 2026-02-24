import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  getTaskById,
  getAllTasks,
  getTasksByUserId,
  updateTask,
  deleteTask,
} from "../../services/taskService";

export const createNewTask = createAsyncThunk(
  "task/createNewTask",
  async (taskData, thunkAPI) => {
    try {
      const data = await createTask(taskData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getTaskDetails = createAsyncThunk(
  "task/getTaskDetails",
  async (id, thunkAPI) => {
    try {
      const data = await getTaskById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllTasksList = createAsyncThunk(
  "task/getAllTasksList",
  async (_, thunkAPI) => {
    try {
      const data = await getAllTasks();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getUserTasks = createAsyncThunk(
  "task/getUserTasks",
  async (userId, thunkAPI) => {
    try {
      const data = await getTasksByUserId(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateTaskById = createAsyncThunk(
  "task/updateTaskById",
  async ({ id, taskData }, thunkAPI) => {
    try {
      const data = await updateTask(id, taskData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteTaskById = createAsyncThunk(
  "task/deleteTaskById",
  async (id, thunkAPI) => {
    try {
      const data = await deleteTask(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    taskDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createNewTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload.data);
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Task Details
      .addCase(getTaskDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.taskDetails = action.payload.data;
      })
      .addCase(getTaskDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All Tasks
      .addCase(getAllTasksList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTasksList.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
      })
      .addCase(getAllTasksList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get User Tasks
      .addCase(getUserTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.data;
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Task
      .addCase(updateTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTaskById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload.data;
        }
      })
      .addCase(updateTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Task
      .addCase(deleteTaskById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.data.id,
        );
      })
      .addCase(deleteTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = taskSlice.actions;
export default taskSlice.reducer;
