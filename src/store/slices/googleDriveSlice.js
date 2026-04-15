import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGoogleDriveFolder,
  listGoogleDriveFolders,
  listGoogleDriveFilesInFolder,
  getGoogleDriveFileMetadata,
  uploadFileToGoogleDriveFolder,
  getGoogleDocsTemplatesInDrive,
  getGoogleSheetsTemplatesInDrive,
} from "../../services/googleDriveService";

export const createFolder = createAsyncThunk(
  "googleDrive/createFolder",
  async (folderName, thunkAPI) => {
    try {
      const data = await createGoogleDriveFolder(folderName);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const listFolders = createAsyncThunk(
  "googleDrive/listFolders",
  async (_, thunkAPI) => {
    try {
      const data = await listGoogleDriveFolders();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const listFilesInFolder = createAsyncThunk(
  "googleDrive/listFilesInFolder",
  async (folderId, thunkAPI) => {
    try {
      const data = await listGoogleDriveFilesInFolder(folderId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getFileMetadata = createAsyncThunk(
  "googleDrive/getFileMetadata",
  async (fileId, thunkAPI) => {
    try {
      const data = await getGoogleDriveFileMetadata(fileId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const uploadFileToFolder = createAsyncThunk(
  "googleDrive/uploadFileToFolder",
  async ({ folderId, fileName, fileContent }, thunkAPI) => {
    try {
      const data = await uploadFileToGoogleDriveFolder(
        folderId,
        fileName,
        fileContent,
      );

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchGoogleDocTemplates = createAsyncThunk(
  "googleDrive/fetchGoogleDocTemplates",
  async (_, thunkAPI) => {
    try {
      const data = await getGoogleDocsTemplatesInDrive();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchGoogleSheetTemplates = createAsyncThunk(
  "googleDrive/fetchGoogleSheetTemplates",
  async (_, thunkAPI) => {
    try {
      const data = await getGoogleSheetsTemplatesInDrive();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const googleDriveSlice = createSlice({
  name: "googleDrive",
  initialState: {
    folders: [],
    files: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetGoogleDriveError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createFolder
      .addCase(createFolder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.folders.push(action.payload.data);
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle listFolders
      .addCase(listFolders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listFolders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.folders = action.payload.data;
      })
      .addCase(listFolders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle listFilesInFolder
      .addCase(listFilesInFolder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(listFilesInFolder.fulfilled, (state, action) => {
        state.isLoading = false;
        const { folderId, files } = action.payload.data;
        state.files[folderId] = files;
      })
      .addCase(listFilesInFolder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle getFileMetadata
      .addCase(getFileMetadata.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFileMetadata.fulfilled, (state, action) => {
        state.isLoading = false;
        const { fileId, metadata } = action.payload.data;
        state.files.push({ id: fileId, ...metadata });
      })
      .addCase(getFileMetadata.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle uploadFileToFolder
      .addCase(uploadFileToFolder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadFileToFolder.fulfilled, (state, action) => {
        state.isLoading = false;
        const { folderId, file } = action.payload.data;
        state.files.push(file);
      })
      .addCase(uploadFileToFolder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle fetchGoogleDocTemplates
      .addCase(fetchGoogleDocTemplates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGoogleDocTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.googleDocTemplates = action.payload.data;
      })
      .addCase(fetchGoogleDocTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Handle fetchGoogleSheetTemplates
      .addCase(fetchGoogleSheetTemplates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGoogleSheetTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.googleSheetTemplates = action.payload.data;
      })
      .addCase(fetchGoogleSheetTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { resetGoogleDriveError } = googleDriveSlice.actions;
export default googleDriveSlice.reducer;
