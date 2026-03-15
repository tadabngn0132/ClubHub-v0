import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
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

export const deleteDepartmentById = createAsyncThunk(
  "department/deleteDepartmentById",
  async (id, thunkAPI) => {
    try {
      const data = await deleteDepartment(id);

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
    status: "idle",
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createNewDepartment
      .addCase(createNewDepartment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(createNewDepartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments.push(action.payload.data);
        state.status = "fulfilled";
      })
      .addCase(createNewDepartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle getDepartmentsList
      .addCase(getDepartmentsList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getDepartmentsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getDepartmentsList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle getDepartmentDetails
      .addCase(getDepartmentDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(getDepartmentDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.department = action.payload.data;
        state.status = "fulfilled";
      })
      .addCase(getDepartmentDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle updateDepartmentById
      .addCase(updateDepartmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(updateDepartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.departments.findIndex(
          (dept) => dept.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.departments[index] = action.payload.data;
        }
        state.status = "fulfilled";
      })
      .addCase(updateDepartmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      })

      // Handle deleteDepartmentById
      .addCase(deleteDepartmentById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.status = "pending";
      })
      .addCase(deleteDepartmentById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.departments = state.departments.filter(
          (dept) => dept.id !== action.payload.data.id,
        );
        state.status = "fulfilled";
      })
      .addCase(deleteDepartmentById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
        state.status = "rejected";
      });
  },
});

export const { resetStatus } = departmentSlice.actions;
export default departmentSlice.reducer;
