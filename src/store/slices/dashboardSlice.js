import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDashboardStats } from "../../services/dashboardService";
import { getThunkErrorPayload } from "../../utils/thunkError";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, thunkAPI) => {
    try {
      const data = await getDashboardStats();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: {
      userCount: 0,
      taskCount: 0,
      eventCount: 0,
      memberApplicationCount: 0,
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    resetDashboardError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchDashboardStats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload.data;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch dashboard stats";
      });
  },
});

export const { resetDashboardError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
