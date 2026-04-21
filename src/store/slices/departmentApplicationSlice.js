import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getDepartmentApplicationsByMemberApplicationId,
  getDepartmentApplicationById,
  getDepartmentApplications,
  updateDepartmentApplication,
  softDeleteDepartmentApplication,
  hardDeleteDepartmentApplication,
} from "../../services/departmentApplicationService.js";

export const getDepartmentApplicationsByMemberApplication = createAsyncThunk(
  "departmentApplications/getByMemberApplication",
  async (memberApplicationId, thunkAPI) => {
    try {
      const data =
        await getDepartmentApplicationsByMemberApplicationId(
          memberApplicationId,
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

export const getDepartmentApplicationDetails = createAsyncThunk(
  "departmentApplications/getDetails",
  async (id, thunkAPI) => {
    try {
      const data = await getDepartmentApplicationById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getDepartmentApplicationsList = createAsyncThunk(
  "departmentApplications/getList",
  async (_, thunkAPI) => {
    try {
      const data = await getDepartmentApplications();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateDepartmentApplicationById = createAsyncThunk(
  "departmentApplications/updateById",
  async ({ id, deptApplicationData }, thunkAPI) => {
    try {
      const data = await updateDepartmentApplication(id, deptApplicationData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const softDeleteDepartmentApplicationById = createAsyncThunk(
  "departmentApplications/softDeleteById",
  async (id, thunkAPI) => {
    try {
      const data = await softDeleteDepartmentApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeleteDepartmentApplicationById = createAsyncThunk(
  "departmentApplications/hardDeleteById",
  async (id, thunkAPI) => {
    try {
      const data = await hardDeleteDepartmentApplication(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const departmentApplicationSlice = createSlice({
  name: "departmentApplication",
  initialState: {
    deptApplications: [],
    deptApplication: null,
    isLoading: false,
    error: null,
    departmentApplicationStatus: "idle",
  },
  reducers: {
    resetDepartmentApplicationStatus: (state) => {
      state.departmentApplicationStatus = "idle";
    },
    resetDepartmentApplicationError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getDepartmentApplicationsByMemberApplication
      .addCase(
        getDepartmentApplicationsByMemberApplication.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.departmentApplicationStatus = "pending";
        },
      )
      .addCase(
        getDepartmentApplicationsByMemberApplication.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.deptApplications = action.payload.data;
          state.departmentApplicationStatus = "fulfilled";
        },
      )
      .addCase(
        getDepartmentApplicationsByMemberApplication.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || action.error.message;
          state.departmentApplicationStatus = "rejected";
        },
      )

      // Handle getDepartmentApplicationDetails
      .addCase(getDepartmentApplicationDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentApplicationStatus = "pending";
      })
      .addCase(getDepartmentApplicationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deptApplication = action.payload.data;
        state.departmentApplicationStatus = "fulfilled";
      })
      .addCase(getDepartmentApplicationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentApplicationStatus = "rejected";
      })

      // Handle getDepartmentApplicationsList
      .addCase(getDepartmentApplicationsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentApplicationStatus = "pending";
      })
      .addCase(getDepartmentApplicationsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deptApplications = action.payload.data;
        state.departmentApplicationStatus = "fulfilled";
      })
      .addCase(getDepartmentApplicationsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentApplicationStatus = "rejected";
      })

      // Handle updateDepartmentApplicationById
      .addCase(updateDepartmentApplicationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentApplicationStatus = "pending";
      })
      .addCase(updateDepartmentApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.deptApplications.findIndex(
          (deptApp) => deptApp.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.deptApplications[index] = action.payload.data;
        }
        state.departmentApplicationStatus = "fulfilled";
      })
      .addCase(updateDepartmentApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentApplicationStatus = "rejected";
      })

      // Handle softDeleteDepartmentApplicationById
      .addCase(softDeleteDepartmentApplicationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentApplicationStatus = "pending";
      })
      .addCase(
        softDeleteDepartmentApplicationById.fulfilled,
        (state, action) => {
          state.isLoading = false;
          const index = state.deptApplications.findIndex(
            (deptApp) => deptApp.id === action.payload.data.id,
          );
          if (index !== -1) {
            state.deptApplications[index] = action.payload.data;
          }
          state.departmentApplicationStatus = "fulfilled";
        },
      )
      .addCase(
        softDeleteDepartmentApplicationById.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || action.error.message;
          state.departmentApplicationStatus = "rejected";
        },
      )

      // Handle hardDeleteDepartmentApplicationById
      .addCase(hardDeleteDepartmentApplicationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentApplicationStatus = "pending";
      })
      .addCase(
        hardDeleteDepartmentApplicationById.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.deptApplications = state.deptApplications.filter(
            (deptApp) => deptApp.id !== action.payload.data.id,
          );
          state.departmentApplicationStatus = "fulfilled";
        },
      )
      .addCase(
        hardDeleteDepartmentApplicationById.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || action.error.message;
          state.departmentApplicationStatus = "rejected";
        },
      );
  },
});

export const {
  resetDepartmentApplicationStatus,
  resetDepartmentApplicationError,
} = departmentApplicationSlice.actions;
export default departmentApplicationSlice.reducer;
