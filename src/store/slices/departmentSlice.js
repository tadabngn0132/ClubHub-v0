import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  softDeleteDepartment,
  hardDeleteDepartment,
} from "../../services/departmentService.js";

export const createNewDepartment = createAsyncThunk(
  "department/createNewDepartment",
  async (departmentData, thunkAPI) => {
    try {
      const data = await createDepartment(departmentData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getDepartmentsList = createAsyncThunk(
  "department/getDepartmentsList",
  async (_, thunkAPI) => {
    try {
      const data = await getAllDepartments();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getDepartmentDetails = createAsyncThunk(
  "department/getDepartmentDetails",
  async (id, thunkAPI) => {
    try {
      const data = await getDepartmentById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateDepartmentById = createAsyncThunk(
  "department/updateDepartmentById",
  async ({ id, departmentData }, thunkAPI) => {
    try {
      const data = await updateDepartment(id, departmentData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const softDeleteDepartmentById = createAsyncThunk(
  "department/softDeleteDepartmentById",
  async (id, thunkAPI) => {
    try {
      const data = await softDeleteDepartment(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeleteDepartmentById = createAsyncThunk(
  "department/hardDeleteDepartmentById",
  async (id, thunkAPI) => {
    try {
      const data = await hardDeleteDepartment(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const departmentSlice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    department: null,
    isLoading: false,
    error: null,
    departmentStatus: "idle",
  },
  reducers: {
    resetDepartmentStatus: (state) => {
      state.departmentStatus = "idle";
    },
    resetDepartmentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createNewDepartment
      .addCase(createNewDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentStatus = "pending";
      })
      .addCase(createNewDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments.push(action.payload.data);
        state.departmentStatus = "fulfilled";
      })
      .addCase(createNewDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentStatus = "rejected";
      })

      // Handle getDepartmentsList
      .addCase(getDepartmentsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentStatus = "pending";
      })
      .addCase(getDepartmentsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = action.payload.data;
        state.departmentStatus = "fulfilled";
      })
      .addCase(getDepartmentsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentStatus = "rejected";
      })

      // Handle getDepartmentDetails
      .addCase(getDepartmentDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentStatus = "pending";
      })
      .addCase(getDepartmentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.department = action.payload.data;
        state.departmentStatus = "fulfilled";
      })
      .addCase(getDepartmentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentStatus = "rejected";
      })

      // Handle updateDepartmentById
      .addCase(updateDepartmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentStatus = "pending";
      })
      .addCase(updateDepartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.departments.findIndex(
          (dept) => dept.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.departments[index] = action.payload.data;
        }
        state.departmentStatus = "fulfilled";
      })
      .addCase(updateDepartmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentStatus = "rejected";
      })

      // Handle softDeleteDepartmentById
      .addCase(softDeleteDepartmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentStatus = "pending";
      })
      .addCase(softDeleteDepartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload.data.id,
        );
        state.departmentStatus = "fulfilled";
      })
      .addCase(softDeleteDepartmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentStatus = "rejected";
      });

    // Handle hardDeleteDepartmentById
    builder
      .addCase(hardDeleteDepartmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.departmentStatus = "pending";
      })
      .addCase(hardDeleteDepartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload.data.id,
        );
        state.departmentStatus = "fulfilled";
      })
      .addCase(hardDeleteDepartmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.departmentStatus = "rejected";
      });
  },
});

export const { resetDepartmentStatus, resetDepartmentError } =
  departmentSlice.actions;
export default departmentSlice.reducer;
