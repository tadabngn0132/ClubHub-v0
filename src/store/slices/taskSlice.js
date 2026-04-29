import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTask,
  getTaskById,
  getAllTasks,
  getTasksByUserId,
  updateTask,
  softDeleteTask,
  hardDeleteTask,
  confirmTaskCompletion,
  verifyTaskCompletion,
  restoreAnTask,
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

export const confirmTaskCompletionById = createAsyncThunk(
  "task/confirmTaskCompletionById",
  async ({ id, taskConfirmData }, thunkAPI) => {
    try {
      const data = await confirmTaskCompletion(id, taskConfirmData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const verifyTaskCompletionById = createAsyncThunk(
  "task/verifyTaskCompletionById",
  async ({ id, taskVerifyData }, thunkAPI) => {
    try {
      const data = await verifyTaskCompletion(id, taskVerifyData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const restoreTaskById = createAsyncThunk(
  "task/restoreTaskById",
  async (id, thunkAPI) => {
    try {
      const data = await restoreAnTask(id);

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
    taskStatus: "idle",
  },
  reducers: {
    resetTaskStatus: (state) => {
      state.taskStatus = "idle";
    },
    resetTaskError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Task
      .addCase(createNewTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload.data);
        state.taskStatus = "fulfilled";
      })
      .addCase(createNewTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      })

      // Get Task Details
      .addCase(getTaskDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(getTaskDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.task = action.payload.data;
        state.taskStatus = "fulfilled";
      })
      .addCase(getTaskDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      })

      // Get All Tasks
      .addCase(getAllTasksList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(getAllTasksList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data;
        state.taskStatus = "fulfilled";
      })
      .addCase(getAllTasksList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      })

      // Get User Tasks
      .addCase(getUserTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(getUserTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload.data;
        state.taskStatus = "fulfilled";
      })
      .addCase(getUserTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      })

      // Update Task
      .addCase(updateTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(updateTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskStatus = "fulfilled";
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
        state.taskStatus = "rejected";
      })

      // Soft Delete Task
      .addCase(softDeleteTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(softDeleteTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.meta.arg,
        );
        state.taskStatus = "fulfilled";
      })
      .addCase(softDeleteTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      })

      // Hard Delete Task
      .addCase(hardDeleteTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(hardDeleteTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.meta.arg,
        );
        state.taskStatus = "fulfilled";
      })
      .addCase(hardDeleteTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      })

      // Confirm Task Completion
      .addCase(confirmTaskCompletionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(confirmTaskCompletionById.fulfilled, (state) => {
        state.isLoading = false;
        state.taskStatus = "fulfilled";
      })
      .addCase(confirmTaskCompletionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      })

      // Verify Task Completion
      .addCase(verifyTaskCompletionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(verifyTaskCompletionById.fulfilled, (state) => {
        state.isLoading = false;
        state.taskStatus = "fulfilled";
      })
      .addCase(verifyTaskCompletionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      })

      // Restore Task
      .addCase(restoreTaskById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.taskStatus = "pending";
      })
      .addCase(restoreTaskById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload.data);
        state.taskStatus = "fulfilled";
      })
      .addCase(restoreTaskById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.taskStatus = "rejected";
      });
  },
});

export const { resetTaskStatus, resetTaskError } = taskSlice.actions;
export default taskSlice.reducer;
