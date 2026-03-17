import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMemberApplication,
  getAllMemberApplications,
  getMemberApplicationById,
  softDeleteMemberApplication,
  hardDeleteMemberApplication,
  updateMemberApplicationCVReviewDetail,
  updateMemberApplicationFinalReviewDetail,
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

export const updateMemberApplicationCVReview = createAsyncThunk(
  "memberApplication/updateMemberApplicationCVReview",
  async ({ id, cvReviewData }, thunkAPI) => {
    try {
      const data = await updateMemberApplicationCVReviewDetail(
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

export const updateMemberApplicationFinalReview = createAsyncThunk(
  "memberApplication/updateMemberApplicationFinalReview",
  async ({ id, finalReviewData }, thunkAPI) => {
    try {
      const data = await updateMemberApplicationFinalReviewDetail(
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
    memberApplications: [],
    memberApplication: null,
    isLoading: false,
    error: null,
    memberApplicationStatus: "idle",
  },
  reducers: {
    resetMemberApplicationStatus: (state) => {
      state.memberApplicationStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Submit Member Application
      .addCase(submitMemberApplication.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(submitMemberApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memberApplicationStatus = "fulfilled";
        state.memberApplications.push(action.payload.data);
      })
      .addCase(submitMemberApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle getAllMemberApplicationsList
      .addCase(getAllMemberApplicationsList.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(getAllMemberApplicationsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memberApplications = action.payload.datas;
        state.memberApplicationStatus = "fulfilled";
      })
      .addCase(getAllMemberApplicationsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle getMemberApplicationDetails
      .addCase(getMemberApplicationDetails.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(getMemberApplicationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memberApplication = action.payload.data;
        state.memberApplicationStatus = "fulfilled";
      })
      .addCase(getMemberApplicationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle softDeleteMemberApplicationById
      .addCase(softDeleteMemberApplicationById.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(softDeleteMemberApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memberApplications = state.memberApplications.filter(
          (app) => app.id !== action.payload.dataId,
        );
        state.memberApplicationStatus = "fulfilled";
      })
      .addCase(softDeleteMemberApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle hardDeleteMemberApplicationById
      .addCase(hardDeleteMemberApplicationById.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(hardDeleteMemberApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memberApplications = state.memberApplications.filter(
          (app) => app.id !== action.payload.dataId,
        );
        state.memberApplicationStatus = "fulfilled";
      })
      .addCase(hardDeleteMemberApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle updateMemberApplicationCVReview
      .addCase(updateMemberApplicationCVReview.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(updateMemberApplicationCVReview.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          state.memberApplication &&
          state.memberApplication.id === action.payload.dataId
        ) {
          state.memberApplication.cvReviewDetail = action.payload.cvReviewDetail;
        }
        state.memberApplicationStatus = "fulfilled";
      })
      .addCase(updateMemberApplicationCVReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle updateMemberApplicationFinalReview
      .addCase(updateMemberApplicationFinalReview.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(
        updateMemberApplicationFinalReview.fulfilled,
        (state, action) => {
          state.isLoading = false;
          if (
            state.memberApplication &&
            state.memberApplication.id === action.payload.dataId
          ) {
            state.memberApplication.finalReviewDetail =
              action.payload.finalReviewDetail;
          }
          state.memberApplicationStatus = "fulfilled";
        },
      )
      .addCase(updateMemberApplicationFinalReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      });
  },
});

export const { resetMemberApplicationStatus } = memberApplicationSlice.actions;
export default memberApplicationSlice.reducer;
