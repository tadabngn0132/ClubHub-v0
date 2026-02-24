import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerForActivity,
  getAllRegistrations,
  getRegistrationById,
  getRegistrationsByActivityId,
  getRegistrationsByUserId,
  updateRegistrationStatus,
  deleteRegistration,
} from "../../services/activityRegistrationService";

export const registerActivity = createAsyncThunk(
  "activityRegistration/registerActivity",
  async (registrationData, thunkAPI) => {
    try {
      const data = await registerForActivity(registrationData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllActivityRegistrations = createAsyncThunk(
  "activityRegistration/getAllActivityRegistrations",
  async (_, thunkAPI) => {
    try {
      const data = await getAllRegistrations();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getActivityRegistrationById = createAsyncThunk(
  "activityRegistration/getActivityRegistrationById",
  async (id, thunkAPI) => {
    try {
      const data = await getRegistrationById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getActivityRegistrationsByActivityId = createAsyncThunk(
  "activityRegistration/getActivityRegistrationsByActivityId",
  async (activityId, thunkAPI) => {
    try {
      const data = await getRegistrationsByActivityId(activityId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getActivityRegistrationsByUserId = createAsyncThunk(
  "activityRegistration/getActivityRegistrationsByUserId",
  async (userId, thunkAPI) => {
    try {
      const data = await getRegistrationsByUserId(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateActivityRegistrationStatus = createAsyncThunk(
  "activityRegistration/updateActivityRegistrationStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const data = await updateRegistrationStatus(id, status);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteActivityRegistration = createAsyncThunk(
  "activityRegistration/deleteActivityRegistration",
  async (id, thunkAPI) => {
    try {
      const data = await deleteRegistration(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const activityRegistrationSlice = createSlice({
  name: "activityRegistration",
  initialState: {
    registrations: [],
    registration: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle registerActivity
      .addCase(registerActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations.push(action.payload.data);
      })
      .addCase(registerActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle getAllActivityRegistrations
      .addCase(getAllActivityRegistrations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllActivityRegistrations.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload.data;
      })
      .addCase(getAllActivityRegistrations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle getActivityRegistrationById
      .addCase(getActivityRegistrationById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivityRegistrationById.fulfilled, (state, action) => {
        state.loading = false;
        state.registration = action.payload.data;
      })
      .addCase(getActivityRegistrationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle getActivityRegistrationsByActivityId
      .addCase(getActivityRegistrationsByActivityId.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getActivityRegistrationsByActivityId.fulfilled,
        (state, action) => {
          state.loading = false;
          state.registrations = action.payload.data;
        },
      )
      .addCase(
        getActivityRegistrationsByActivityId.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      // Handle getActivityRegistrationsByUserId
      .addCase(getActivityRegistrationsByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getActivityRegistrationsByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = action.payload.data;
      })
      .addCase(getActivityRegistrationsByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle updateActivityRegistrationStatus
      .addCase(updateActivityRegistrationStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateActivityRegistrationStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.registrations.findIndex(
          (reg) => reg.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.registrations[index] = action.payload.data;
        }
      })
      .addCase(updateActivityRegistrationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle deleteActivityRegistration
      .addCase(deleteActivityRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteActivityRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.registrations = state.registrations.filter(
          (reg) => reg.id !== action.payload.data.id,
        );
      })
      .addCase(deleteActivityRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {} = activityRegistrationSlice.actions;
export default activityRegistrationSlice.reducer;
