import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMemberApplication,
  getAllMemberApplications,
  getMemberApplicationById,
  softDeleteMemberApplication,
  hardDeleteMemberApplication,
  createMemberApplicationCVReviewDetail,
  createMemberApplicationInterviewDetail,
  createMemberApplicationFinalReviewDetail,
} from "../../services/memberApplicationService";

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

export const softDeleteMemberApplicationById = createAsyncThunk(
  "memberApplication/softDeleteMemberApplicationById",
  async (id, thunkAPI) => {
    try {
      const data = await softDeleteMemberApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeleteMemberApplicationById = createAsyncThunk(
  "memberApplication/hardDeleteMemberApplicationById",
  async (id, thunkAPI) => {
    try {
      const data = await hardDeleteMemberApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createMemberApplicationCVReview = createAsyncThunk(
  "memberApplication/createMemberApplicationCVReview",
  async ({ id, cvReviewData }, thunkAPI) => {
    try {
      const data = await createMemberApplicationCVReviewDetail(
        id,
        cvReviewData,
      );

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createMemberApplicationInterview = createAsyncThunk(
  "memberApplication/createMemberApplicationInterview",
  async ({ id, interviewData }, thunkAPI) => {
    try {
      const data = await createMemberApplicationInterviewDetail(
        id,
        interviewData,
      );

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const createMemberApplicationFinalReview = createAsyncThunk(
  "memberApplication/createMemberApplicationFinalReview",
  async ({ id, finalReviewData }, thunkAPI) => {
    try {
      const data = await createMemberApplicationFinalReviewDetail(
        id,
        finalReviewData,
      );

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
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Member Application
      .addCase(submitMemberApplication.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(submitMemberApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "fulfilled";
        state.applications.push(action.payload.application);
      })
      .addCase(submitMemberApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Handle getAllMemberApplicationsList
      .addCase(getAllMemberApplicationsList.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(getAllMemberApplicationsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload.applications;
        state.status = "fulfilled";
      })
      .addCase(getAllMemberApplicationsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Handle getMemberApplicationDetails
      .addCase(getMemberApplicationDetails.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(getMemberApplicationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applicationDetails = action.payload.application;
        state.status = "fulfilled";
      })
      .addCase(getMemberApplicationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Handle softDeleteMemberApplicationById
      .addCase(softDeleteMemberApplicationById.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(softDeleteMemberApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = state.applications.filter(
          (app) => app._id !== action.payload.applicationId,
        );
        state.status = "fulfilled";
      })
      .addCase(softDeleteMemberApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Handle hardDeleteMemberApplicationById
      .addCase(hardDeleteMemberApplicationById.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(hardDeleteMemberApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = state.applications.filter(
          (app) => app._id !== action.payload.applicationId,
        );
        state.status = "fulfilled";
      })
      .addCase(hardDeleteMemberApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Handle createMemberApplicationCVReview
      .addCase(createMemberApplicationCVReview.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(createMemberApplicationCVReview.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          state.applicationDetails &&
          state.applicationDetails._id === action.payload.applicationId
        ) {
          state.applicationDetails.cvReviewDetail =
            action.payload.cvReviewDetail;
        }
        state.status = "fulfilled";
      })
      .addCase(createMemberApplicationCVReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Handle createMemberApplicationInterview
      .addCase(createMemberApplicationInterview.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(createMemberApplicationInterview.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          state.applicationDetails &&
          state.applicationDetails._id === action.payload.applicationId
        ) {
          state.applicationDetails.interviewDetail =
            action.payload.interviewDetail;
        }
        state.status = "fulfilled";
      })
      .addCase(createMemberApplicationInterview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      })

      // Handle createMemberApplicationFinalReview
      .addCase(createMemberApplicationFinalReview.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
      })
      .addCase(
        createMemberApplicationFinalReview.fulfilled,
        (state, action) => {
          state.isLoading = false;
          if (
            state.applicationDetails &&
            state.applicationDetails._id === action.payload.applicationId
          ) {
            state.applicationDetails.finalReviewDetail =
              action.payload.finalReviewDetail;
          }
          state.status = "fulfilled";
        },
      )
      .addCase(createMemberApplicationFinalReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = "rejected";
      });
  },
});

export const { resetStatus } = memberApplicationSlice.actions;
export default memberApplicationSlice.reducer;
