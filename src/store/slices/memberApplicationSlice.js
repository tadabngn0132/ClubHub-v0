import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMemberApplication,
  getAllMemberApplications,
  getMemberApplicationById,
  softDeleteMemberApplication,
  hardDeleteMemberApplication,
  updateMemberApplicationCVReviewDetail,
  updateMemberApplicationDepartmentInterviewDetail,
  updateMemberApplicationFinalReviewDetail,
  withdrawMemberApplication,
  restoreMemberApplication,
} from "../../services/memberApplicationService";
import { getThunkErrorPayload } from "../../utils/thunkError";
import { getThunkErrorPayload } from "../../utils/thunkError";

// TODO(member-application): make this slice the source of truth for list and
// detail state. Rework the async thunks and reducers to handle the aggregate
// payload, refresh detail after mutations, and keep loading/error flags
// separate for submit, review, and withdraw actions.

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
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
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
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
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
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
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
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
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
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
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
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const updateMemberApplicationDepartmentInterview = createAsyncThunk(
  "memberApplication/updateMemberApplicationDepartmentInterview",
  async ({ id, departmentInterviewData }, thunkAPI) => {
    try {
      const data = await updateMemberApplicationDepartmentInterviewDetail(
        id,
        departmentInterviewData,
      );

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
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
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const withdrawMemberApplicationByUser = createAsyncThunk(
  "memberApplication/withdrawMemberApplicationByUser",
  async (id, thunkAPI) => {
    try {
      const data = await withdrawMemberApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

export const restoreMemberApplicationById = createAsyncThunk(
  "memberApplication/restoreMemberApplicationById",
  async (id, thunkAPI) => {
    try {
      const data = await restoreMemberApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
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
    resetMemberApplicationError: (state) => {
      state.error = null;
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
        state.memberApplications = action.payload.data;
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
          (app) => app.id !== action.meta.arg,
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
          (app) => app.id !== action.meta.arg,
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
          state.memberApplication.cvReview = action.payload.cvReview;
        }
        state.memberApplicationStatus = "fulfilled";
      })
      .addCase(updateMemberApplicationCVReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle updateMemberApplicationDepartmentInterview
      .addCase(updateMemberApplicationDepartmentInterview.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(
        updateMemberApplicationDepartmentInterview.fulfilled,
        (state, action) => {
          state.isLoading = false;
          if (
            state.memberApplication &&
            state.memberApplication.id === action.payload.dataId
          ) {
            state.memberApplication.departmentInterviews =
              action.payload.departmentInterviews;
          }
          state.memberApplicationStatus = "fulfilled";
        },
      )
      .addCase(
        updateMemberApplicationDepartmentInterview.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          state.memberApplicationStatus = "rejected";
        },
      )

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
            state.memberApplication.finalReview = action.payload.finalReview;
          }
          state.memberApplicationStatus = "fulfilled";
        },
      )
      .addCase(updateMemberApplicationFinalReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle withdrawMemberApplicationByUser
      .addCase(withdrawMemberApplicationByUser.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(withdrawMemberApplicationByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          state.memberApplication &&
          state.memberApplication.id === action.payload.dataId
        ) {
          state.memberApplication.state = "WITHDRAWN";
        }
        state.memberApplicationStatus = "fulfilled";
      })
      .addCase(withdrawMemberApplicationByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      })

      // Handle restoreMemberApplicationById
      .addCase(restoreMemberApplicationById.pending, (state) => {
        state.isLoading = true;
        state.memberApplicationStatus = "pending";
      })
      .addCase(restoreMemberApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.memberApplications.push(action.payload.data);
        state.memberApplicationStatus = "fulfilled";
      })
      .addCase(restoreMemberApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.memberApplicationStatus = "rejected";
      });
  },
});

export const { resetMemberApplicationStatus, resetMemberApplicationError } =
  memberApplicationSlice.actions;
export default memberApplicationSlice.reducer;
