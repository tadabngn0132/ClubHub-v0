import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  aiGenerate,
  aiActivityRecommendation,
  aiEventDescription,
  aiDraftMessage,
  aiPlanTask,
} from "../../services/aiService";

export const generateAIContent = createAsyncThunk(
  "ai/generateAIContent",
  async (payload, thunkAPI) => {
    try {
      const data = await aiGenerate(payload);
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message || "AI generation failed");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getAIActivityRecommendation = createAsyncThunk(
  "ai/getAIActivityRecommendation",
  async (payload, thunkAPI) => {
    try {
      const data = await aiActivityRecommendation(payload);
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message || "AI recommendation failed");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const generateAIEventDescription = createAsyncThunk(
  "ai/generateAIEventDescription",
  async (payload, thunkAPI) => {
    try {
      const data = await aiEventDescription(payload);
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message || "AI event description failed");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const generateAIDraftMessage = createAsyncThunk(
  "ai/generateAIDraftMessage",
  async (payload, thunkAPI) => {
    try {
      const data = await aiDraftMessage(payload);
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message || "AI message drafting failed");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const generateAITaskPlan = createAsyncThunk(
  "ai/generateAITaskPlan",
  async (payload, thunkAPI) => {
    try {
      const data = await aiPlanTask(payload);
      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message || "AI task planning failed");
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    result: "",
    mode: "idle",
    isLoading: false,
    error: null,
  },
  reducers: {
    clearAIResult: (state) => {
      state.result = "";
      state.error = null;
      state.mode = "idle";
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.isLoading = true;
      state.error = null;
    };

    const setFulfilled = (state, action, mode) => {
      state.isLoading = false;
      state.mode = mode;
      state.result = action.payload.content || action.payload.data?.content || "";
    };

    const setRejected = (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "AI request failed";
    };

    builder
      .addCase(generateAIContent.pending, setPending)
      .addCase(generateAIContent.fulfilled, (state, action) => {
        setFulfilled(state, action, "generate");
      })
      .addCase(generateAIContent.rejected, setRejected)
      .addCase(getAIActivityRecommendation.pending, setPending)
      .addCase(getAIActivityRecommendation.fulfilled, (state, action) => {
        setFulfilled(state, action, "activity-recommendation");
      })
      .addCase(getAIActivityRecommendation.rejected, setRejected)
      .addCase(generateAIEventDescription.pending, setPending)
      .addCase(generateAIEventDescription.fulfilled, (state, action) => {
        setFulfilled(state, action, "event-description");
      })
      .addCase(generateAIEventDescription.rejected, setRejected)
      .addCase(generateAIDraftMessage.pending, setPending)
      .addCase(generateAIDraftMessage.fulfilled, (state, action) => {
        setFulfilled(state, action, "draft-message");
      })
      .addCase(generateAIDraftMessage.rejected, setRejected)
      .addCase(generateAITaskPlan.pending, setPending)
      .addCase(generateAITaskPlan.fulfilled, (state, action) => {
        setFulfilled(state, action, "plan-task");
      })
      .addCase(generateAITaskPlan.rejected, setRejected);
  },
});

export const { clearAIResult } = aiSlice.actions;
export default aiSlice.reducer;
