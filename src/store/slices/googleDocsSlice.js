import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createGoogleDocFromTemplate,
  createGoogleDocTemplate,
  getEmbeddableLinkForGoogleDoc,
} from "../../services/googleDocsService";

export const createDocFromTemplate = createAsyncThunk(
  "googleDocs/createDocFromTemplate",
  async (docsData, thunkAPI) => {
    try {
      const data = await createGoogleDocFromTemplate(docsData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const createTemplate = createAsyncThunk(
  "googleDocs/createTemplate",
  async (templateData, thunkAPI) => {
    try {
      const data = await createGoogleDocTemplate(templateData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchEmbedLink = createAsyncThunk(
  "googleDocs/fetchEmbedLink",
  async (documentId, thunkAPI) => {
    try {
      const data = await getEmbeddableLinkForGoogleDoc(documentId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const googleDocsSlice = createSlice({
  name: "googleDocs",
  initialState: {
    templates: [],
    documents: [],
    embedLinks: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    resetGoogleDocsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createDocFromTemplate
      .addCase(createDocFromTemplate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDocFromTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.documents.push(action.payload.data);
      })
      .addCase(createDocFromTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle createTemplate
      .addCase(createTemplate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates.push(action.payload.data);
      })
      .addCase(createTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle fetchEmbedLink
      .addCase(fetchEmbedLink.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmbedLink.fulfilled, (state, action) => {
        state.isLoading = false;
        const { documentId, embedLink } = action.payload.data;
        state.embedLinks[documentId] = embedLink;
      })
      .addCase(fetchEmbedLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetGoogleDocsError } = googleDocsSlice.actions;
export default googleDocsSlice.reducer;
