import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  promptAIChat,
  getAIChatHistory,
  clearAIChatHistory,
} from "../../services/aiChatService";

export const sendAIChatQuery = createAsyncThunk(
  "aiChat/sendQuery",
  async ({ query, sourceType }, thunkAPI) => {
    try {
      const data = await promptAIChat({ query, sourceType });

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message || "AI Chat query failed");
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "AI Chat query error",
      );
    }
  },
);

export const fetchAIChatHistory = createAsyncThunk(
  "aiChat/fetchHistory",
  async (_, thunkAPI) => {
    try {
      const data = await getAIChatHistory();

      if (!data.success) {
        return thunkAPI.rejectWithValue(
          data.message || "Fetch AI Chat history failed",
        );
      }

      return data.data; // chỉ trả về phần history array
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Fetch AI Chat history error",
      );
    }
  },
);

export const clearAIChatHistoryAction = createAsyncThunk(
  "aiChat/clearHistory",
  async (_, thunkAPI) => {
    try {
      const data = await clearAIChatHistory();

      if (!data.success) {
        return thunkAPI.rejectWithValue(
          data.message || "Clear AI Chat history failed",
        );
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Clear AI Chat history error",
      );
    }
  },
);

const aiChatSlice = createSlice({
  name: "aiChat",
  initialState: {
    history: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle sendAIChatQuery
      .addCase(sendAIChatQuery.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendAIChatQuery.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history.push({
          query: action.meta.arg.query,
          answer: action.payload.data.answer,
          sources: action.payload.data.sources || null,
        });
      })
      .addCase(sendAIChatQuery.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to send AI Chat query";
      })

      // Handle fetchAIChatHistory
      .addCase(fetchAIChatHistory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAIChatHistory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.history = action.payload; // payload là array history
      })
      .addCase(fetchAIChatHistory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch AI Chat history";
      })

      // Handle clearAIChatHistoryAction
      .addCase(clearAIChatHistoryAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearAIChatHistoryAction.fulfilled, (state) => {
        state.isLoading = false;
        state.history = [];
      })
      .addCase(clearAIChatHistoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to clear AI Chat history";
      });
  },
});

export const {} = aiChatSlice.actions;
export default aiChatSlice.reducer;
