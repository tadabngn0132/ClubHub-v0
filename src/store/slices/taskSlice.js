import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  getTaskById,
  getAllTasks,
  getTasksByUserId,
  updateTask,
  softDeleteTask,
  hardDeleteTask,
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
      console.log("Updating task with ID:", id, "and data:", taskData);
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

export const softDeleteTaskById = createAsyncThunk(
  "task/softDeleteTaskById",
  async (id, thunkAPI) => {
    try {
      const data = await softDeleteTask(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeleteTaskById = createAsyncThunk(
  "task/hardDeleteTaskById",
  async (id, thunkAPI) => {
    try {
      const data = await hardDeleteTask(id);

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
    task: null,
    isLoading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createNewTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload.data);
        state.status = "fulfilled";
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Get Task Details
      .addCase(getTaskDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getTaskDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskDetails = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getTaskDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Get All Tasks
      .addCase(getAllTasksList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getAllTasksList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getAllTasksList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Get User Tasks
      .addCase(getUserTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Update Task
      .addCase(updateTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(updateTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload.data;
        }
      })
      .addCase(updateTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Soft Delete Task
      .addCase(softDeleteTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(softDeleteTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.data.id,
        );
        state.status = "fulfilled";
      })
      .addCase(softDeleteTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Hard Delete Task
      .addCase(hardDeleteTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(hardDeleteTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.data.id,
        );
        state.status = "fulfilled";
      })
      .addCase(hardDeleteTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

export const { resetStatus } = taskSlice.actions;
export default taskSlice.reducer;
