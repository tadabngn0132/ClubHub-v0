import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { generateAIResponse } from "../../services/aiService";
import { getThunkErrorPayload } from "../../utils/thunkError";

export const generateAIResponseThunk = createAsyncThunk(
  "ai/generateResponse",
  async (prompt, thunkAPI) => {
    try {
      const data = await generateAIResponse(prompt);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      console.error("Error in generateAIResponseThunk:", error);
      return thunkAPI.rejectWithValue(getThunkErrorPayload(error));
    }
  },
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    response: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    resetAIError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle generate AI response
      .addCase(generateAIResponseThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(generateAIResponseThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.response = action.payload.data.response;
      })
      .addCase(generateAIResponseThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to generate AI response";
      });
  },
});

export const { resetAIError } = aiSlice.actions;
export default aiSlice.reducer;
