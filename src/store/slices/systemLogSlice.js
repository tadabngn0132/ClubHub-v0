import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSystemLogs } from "../../services/systemLogService";

export const getAllSystemLogs = createAsyncThunk(
  "systemLogs/getAll",
  async (_, thunkAPI) => {
    try {
      const data = await getSystemLogs();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const systemLogSlice = createSlice({
  name: "systemLogs",
  initialState: {
    logs: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetSystemLogsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all system logs
      .addCase(getAllSystemLogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllSystemLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logs = action.payload.data;
      })
      .addCase(getAllSystemLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch system logs.";
      });
  },
});

export const { resetSystemLogsError } = systemLogSlice.actions;
export default systemLogSlice.reducer;
