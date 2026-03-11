import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMemberApplication,
  getAllMemberApplications,
  getMemberApplicationById,
  deleteMemberApplication,
  approveMemberApplication,
  rejectMemberApplication,
} from "../../services/memberApplicationService";
import { resetStatus } from "./activitySlice";

export const submitMemberApplication = createAsyncThunk(
  "memberApplication/submitMemberApplication",
  async (applicationData, thunkAPI) => {
    try {
      const data = await createMemberApplication(applicationData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllMemberApplicationsList = createAsyncThunk(
  "memberApplication/getAllMemberApplicationsList",
  async (_, thunkAPI) => {
    try {
      const data = await getAllMemberApplications();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMemberApplicationDetails = createAsyncThunk(
  "memberApplication/getMemberApplicationDetails",
  async (id, thunkAPI) => {
    try {
      const data = await getMemberApplicationById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteMemberApplicationById = createAsyncThunk(
  "memberApplication/deleteMemberApplicationById",
  async (id, thunkAPI) => {
    try {
      const data = await deleteMemberApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const approveMemberApplicationById = createAsyncThunk(
  "memberApplication/approveMemberApplicationById",
  async (id, thunkAPI) => {
    try {
      const data = await approveMemberApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const rejectMemberApplicationById = createAsyncThunk(
  "memberApplication/rejectMemberApplicationById",
  async (id, thunkAPI) => {
    try {
      const data = await rejectMemberApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const memberApplicationSlice = createSlice({
  name: "memberApplication",
  initialState: {
    applications: [],
    applicationDetails: null,
    isLoading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      // Submit Member Application
      .addCase(submitMemberApplication.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(submitMemberApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'fulfilled';
        state.applications.push(action.payload.application);
      })
      .addCase(submitMemberApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Handle getAllMemberApplicationsList
      .addCase(getAllMemberApplicationsList.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(getAllMemberApplicationsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload.applications;
        state.status = 'fulfilled';
      })
      .addCase(getAllMemberApplicationsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Handle getMemberApplicationDetails
      .addCase(getMemberApplicationDetails.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(getMemberApplicationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applicationDetails = action.payload.application;
        state.status = 'fulfilled';
      })
      .addCase(getMemberApplicationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Handle deleteMemberApplicationById
      .addCase(deleteMemberApplicationById.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(deleteMemberApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = state.applications.filter(
          (app) => app._id !== action.payload.applicationId,
        );
        state.status = 'fulfilled';
      })
      .addCase(deleteMemberApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Handle approveMemberApplicationById
      .addCase(approveMemberApplicationById.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(approveMemberApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'fulfilled';
        const index = state.applications.findIndex(
          (app) => app._id === action.payload.applicationId,
        );
        if (index !== -1) {
          state.applications[index].status = "approved";
        }
      })
      .addCase(approveMemberApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      })

      // Handle rejectMemberApplicationById
      .addCase(rejectMemberApplicationById.pending, (state) => {
        state.isLoading = true;
        state.status = 'pending';
      })
      .addCase(rejectMemberApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = 'fulfilled';
        const index = state.applications.findIndex(
          (app) => app._id === action.payload.applicationId,
        );
        if (index !== -1) {
          state.applications[index].status = "rejected";
        }
      })
      .addCase(rejectMemberApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = 'rejected';
      });
  },
});

export const { resetStatus } = memberApplicationSlice.actions;
export default memberApplicationSlice.reducer;
