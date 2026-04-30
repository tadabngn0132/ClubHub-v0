import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createActivityParticipation,
  getAllParticipations,
  getParticipationById,
  getParticipationsByActivityId,
  getParticipationsByUserId,
  updateParticipationById,
  deleteParticipation,
  checkInParticipant,
  markParticipantNoShow,
} from "../../services/activityParticipationService";
import { getThunkErrorPayload } from "../../utils/thunkError";

export const createNewActivityParticipation = createAsyncThunk(
  "createNewActivityParticipation",
  async (participationData, thunkAPI) => {
    try {
      const data = await createActivityParticipation(participationData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getAllActivityParticipations = createAsyncThunk(
  "getAllActivityParticipations",
  async (_, thunkAPI) => {
    try {
      const data = await getAllParticipations();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getActivityParticipationById = createAsyncThunk(
  "getActivityParticipationById",
  async (id, thunkAPI) => {
    try {
      const data = await getParticipationById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getActivityParticipationsByActivityId = createAsyncThunk(
  "getActivityParticipationsByActivityId",
  async (activityId, thunkAPI) => {
    try {
      const data = await getParticipationsByActivityId(activityId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const getActivityParticipationsByUserId = createAsyncThunk(
  "getActivityParticipationsByUserId",
  async (userId, thunkAPI) => {
    try {
      const data = await getParticipationsByUserId(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const updateActivityParticipationById = createAsyncThunk(
  "updateActivityParticipationById",
  async ({ id, ...participationData }, thunkAPI) => {
    try {
      const data = await updateParticipationById(id, participationData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const deleteActivityParticipation = createAsyncThunk(
  "deleteActivityParticipation",
  async (id, thunkAPI) => {
    try {
      const data = await deleteParticipation(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const checkInActivityParticipant = createAsyncThunk(
  "checkInActivityParticipant",
  async (participationId, thunkAPI) => {
    try {
      const data = await checkInParticipant(participationId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const markActivityParticipantNoShow = createAsyncThunk(
  "markActivityParticipantNoShow",
  async ({ activityId, userId }, thunkAPI) => {
    try {
      const data = await markParticipantNoShow(activityId, userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

const activityParticipationSlice = createSlice({
  name: "activityParticipation",
  initialState: {
    registrations: [],
    registration: null,
    isLoading: false,
    error: null,
    activityParticipantStatus: "idle",
  },
  reducers: {
    resetActivityParticipantStatus: (state) => {
      state.activityParticipantStatus = "idle";
    },
    resetActivityParticipationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createActivityParticipation
      .addCase(createNewActivityParticipation.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(createNewActivityParticipation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrations.push(action.payload.data);
        state.activityParticipantStatus = "fulfilled";
      })
      .addCase(createNewActivityParticipation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activityParticipantStatus = "rejected";
      })

      // Handle getAllActivityParticipations
      .addCase(getAllActivityParticipations.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(getAllActivityParticipations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrations = action.payload.data;
        state.activityParticipantStatus = "fulfilled";
      })
      .addCase(getAllActivityParticipations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activityParticipantStatus = "rejected";
      })

      // Handle getActivityParticipationById
      .addCase(getActivityParticipationById.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(getActivityParticipationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registration = action.payload.data;
        state.activityParticipantStatus = "fulfilled";
      })
      .addCase(getActivityParticipationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activityParticipantStatus = "rejected";
      })

      // Handle getActivityParticipationsByActivityId
      .addCase(getActivityParticipationsByActivityId.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(
        getActivityParticipationsByActivityId.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.registrations = action.payload.data;
          state.activityParticipantStatus = "fulfilled";
        },
      )
      .addCase(
        getActivityParticipationsByActivityId.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.activityParticipantStatus = "rejected";
        },
      )

      // Handle getActivityParticipationsByUserId
      .addCase(getActivityParticipationsByUserId.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(getActivityParticipationsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.registrations = action.payload.data;
        state.activityParticipantStatus = "fulfilled";
      })
      .addCase(getActivityParticipationsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activityParticipantStatus = "rejected";
      })

      // Handle updateActivityParticipationById
      .addCase(updateActivityParticipationById.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(updateActivityParticipationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityParticipantStatus = "fulfilled";
        const index = state.registrations.findIndex(
          (reg) => reg.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.registrations[index] = action.payload.data;
        }
      })
      .addCase(updateActivityParticipationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activityParticipantStatus = "rejected";
      })

      // Handle deleteActivityParticipation
      .addCase(deleteActivityParticipation.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(deleteActivityParticipation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityParticipantStatus = "fulfilled";
        state.registrations = state.registrations.filter(
          (reg) => reg.id !== action.payload.data.id,
        );
      })
      .addCase(deleteActivityParticipation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activityParticipantStatus = "rejected";
      })

      // Handle checkInActivityParticipant
      .addCase(checkInActivityParticipant.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(checkInActivityParticipant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityParticipantStatus = "fulfilled";
        const index = state.registrations.findIndex(
          (reg) => reg.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.registrations[index] = action.payload.data;
        }
      })
      .addCase(checkInActivityParticipant.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activityParticipantStatus = "rejected";
      })

      // Handle markActivityParticipantNoShow
      .addCase(markActivityParticipantNoShow.pending, (state) => {
        state.isLoading = true;
        state.activityParticipantStatus = "pending";
      })
      .addCase(markActivityParticipantNoShow.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activityParticipantStatus = "fulfilled";
        const index = state.registrations.findIndex(
          (reg) => reg.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.registrations[index] = action.payload.data;
        }
      })
      .addCase(markActivityParticipantNoShow.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.activityParticipantStatus = "rejected";
      });
  },
});

export const {
  resetActivityParticipantStatus,
  resetActivityParticipationError,
} = activityParticipationSlice.actions;
export default activityParticipationSlice.reducer;
