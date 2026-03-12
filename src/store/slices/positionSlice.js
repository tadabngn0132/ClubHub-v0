import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createPosition,
  getAllPositions,
  getPositionById,
  updatePosition,
  deletePosition,
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

export const deletePositionById = createAsyncThunk(
  "position/deletePositionById",
  async (id, thunkAPI) => {
    try {
      const data = await deletePosition(id);

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
    status: "idle",
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createNewPosition
      .addCase(createNewPosition.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(createNewPosition.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions.push(action.payload.data);
        state.status = "fulfilled";
      })
      .addCase(createNewPosition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle getPositionsList
      .addCase(getPositionsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getPositionsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getPositionsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle getPositionDetails
      .addCase(getPositionDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getPositionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.position = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getPositionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle updatePositionDetails
      .addCase(updatePositionDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(updatePositionDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.positions.findIndex(
          (position) => position.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.positions[index] = action.payload.data;
        }
        state.status = "fulfilled";
      })
      .addCase(updatePositionDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle deletePositionById
      .addCase(deletePositionById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(deletePositionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.positions = state.positions.filter(
          (position) => position.id !== action.payload.data.id,
        );
        state.status = "fulfilled";
      })
      .addCase(deletePositionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      });
  },
});

export const { resetStatus } = positionSlice.actions;
export default positionSlice.reducer;
