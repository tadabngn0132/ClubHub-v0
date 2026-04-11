import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPosition,
  getAllPositions,
  getPositionById,
  updatePosition,
  softDeletePosition,
  hardDeletePosition,
} from "../../services/positionService.js";

export const createNewPosition = createAsyncThunk(
  "position/createNewPosition",
  async (positionData, thunkAPI) => {
    try {
      const data = await createPosition(positionData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getPositionsList = createAsyncThunk(
  "position/getPositionsList",
  async (_, thunkAPI) => {
    try {
      const data = await getAllPositions();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getPositionDetails = createAsyncThunk(
  "position/getPositionDetails",
  async (id, thunkAPI) => {
    try {
      const data = await getPositionById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updatePositionDetails = createAsyncThunk(
  "position/updatePositionDetails",
  async ({ id, positionData }, thunkAPI) => {
    try {
      const data = await updatePosition(id, positionData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const softDeletePositionById = createAsyncThunk(
  "position/softDeletePositionById",
  async (id, thunkAPI) => {
    try {
      const data = await softDeletePosition(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeletePositionById = createAsyncThunk(
  "position/hardDeletePositionById",
  async (id, thunkAPI) => {
    try {
      const data = await hardDeletePosition(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const positionSlice = createSlice({
  name: "position",
  initialState: {
    positions: [],
    position: null,
    isLoading: false,
    error: null,
    positionStatus: "idle",
  },
  reducers: {
    resetPositionStatus: (state) => {
      state.positionStatus = "idle";
    },
    resetPositionError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createNewPosition
      .addCase(createNewPosition.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.positionStatus = "pending";
      })
      .addCase(createNewPosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions.push(action.payload.data);
        state.positionStatus = "fulfilled";
      })
      .addCase(createNewPosition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.positionStatus = "rejected";
      })

      // Handle getPositionsList
      .addCase(getPositionsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.positionStatus = "pending";
      })
      .addCase(getPositionsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = action.payload.data;
        state.positionStatus = "fulfilled";
      })
      .addCase(getPositionsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.positionStatus = "rejected";
      })

      // Handle getPositionDetails
      .addCase(getPositionDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.positionStatus = "pending";
      })
      .addCase(getPositionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.position = action.payload.data;
        state.positionStatus = "fulfilled";
      })
      .addCase(getPositionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.positionStatus = "rejected";
      })

      // Handle updatePositionDetails
      .addCase(updatePositionDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.positionStatus = "pending";
      })
      .addCase(updatePositionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.positions.findIndex(
          (position) => position.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.positions[index] = action.payload.data;
        }
        state.positionStatus = "fulfilled";
      })
      .addCase(updatePositionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.positionStatus = "rejected";
      })

      // Handle softDeletePositionById
      .addCase(softDeletePositionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.positionStatus = "pending";
      })
      .addCase(softDeletePositionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = state.positions.filter(
          (position) => position.id !== action.payload.data.id,
        );
        state.positionStatus = "fulfilled";
      })
      .addCase(softDeletePositionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.positionStatus = "rejected";
      })

      // Handle hardDeletePositionById
      .addCase(hardDeletePositionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.positionStatus = "pending";
      })
      .addCase(hardDeletePositionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = state.positions.filter(
          (position) => position.id !== action.payload.data.id,
        );
        state.positionStatus = "fulfilled";
      })
      .addCase(hardDeletePositionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.positionStatus = "rejected";
      });
  },
});

export const { resetPositionStatus, resetPositionError } =
  positionSlice.actions;
export default positionSlice.reducer;
