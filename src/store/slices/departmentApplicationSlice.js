import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDepartmentApplication,
  getDepartmentApplicationsByMemberApplicationId,
  getDepartmentApplicationById,
  getDepartmentApplications,
  updateDepartmentApplication,
  softDeleteDepartmentApplication,
  hardDeleteDepartmentApplication,
} from "../../services/departmentApplicationService.js";

export const createNewDepartmentApplication = createAsyncThunk(
  "departmentApplications/create",
  async (deptApplicationData, thunkAPI) => {
    try {
      const data = await createDepartmentApplication(deptApplicationData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

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
    status: "idle",
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createNewDepartmentApplication
      .addCase(createNewDepartmentApplication.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(createNewDepartmentApplication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deptApplications.push(action.payload.data);
        state.status = "fulfilled";
      })
      .addCase(createNewDepartmentApplication.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle getDepartmentApplicationsByMemberApplication
      .addCase(
        getDepartmentApplicationsByMemberApplication.pending,
        (state) => {
          state.isLoading = true;
          state.error = null;
          state.status = "pending";
        },
      )
      .addCase(
        getDepartmentApplicationsByMemberApplication.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.deptApplications = action.payload.data;
          state.status = "fulfilled";
        },
      )
      .addCase(
        getDepartmentApplicationsByMemberApplication.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || action.error.message;
          state.status = "rejected";
        },
      )

      // Handle getDepartmentApplicationDetails
      .addCase(getDepartmentApplicationDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getDepartmentApplicationDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deptApplication = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getDepartmentApplicationDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle getDepartmentApplicationsList
      .addCase(getDepartmentApplicationsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getDepartmentApplicationsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.deptApplications = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getDepartmentApplicationsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle updateDepartmentApplicationById
      .addCase(updateDepartmentApplicationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(updateDepartmentApplicationById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.deptApplications.findIndex(
          (deptApp) => deptApp.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.deptApplications[index] = action.payload.data;
        }
        state.status = "fulfilled";
      })
      .addCase(updateDepartmentApplicationById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle softDeleteDepartmentApplicationById
      .addCase(softDeleteDepartmentApplicationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
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
          state.status = "fulfilled";
        },
      )
      .addCase(
        softDeleteDepartmentApplicationById.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || action.error.message;
          state.status = "rejected";
        },
      )

      // Handle hardDeleteDepartmentApplicationById
      .addCase(hardDeleteDepartmentApplicationById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(
        hardDeleteDepartmentApplicationById.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.deptApplications = state.deptApplications.filter(
            (deptApp) => deptApp.id !== action.payload.data.id,
          );
          state.status = "fulfilled";
        },
      )
      .addCase(
        hardDeleteDepartmentApplicationById.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload || action.error.message;
          state.status = "rejected";
        },
      );
  },
});

export const { resetStatus } = departmentApplicationSlice.actions;
export default departmentApplicationSlice.reducer;
