import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMessage,
  getMessagesByChatRoomId,
  updateMessage,
  softDeleteMessage,
  hardDeleteMessage,
} from "../../services/messageService";

export const createNewMessage = createAsyncThunk(
  "message/createNewMessage",
  async (messageData, thunkAPI) => {
    try {
      const data = await createMessage(messageData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getMessagesByRoom = createAsyncThunk(
  "message/getMessagesByRoom",
  async (roomId, thunkAPI) => {
    try {
      const data = await getMessagesByChatRoomId(roomId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateMessageById = createAsyncThunk(
  "message/updateMessageById",
  async ({ messageId, updateData }, thunkAPI) => {
    try {
      const data = await updateMessage(messageId, updateData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const softDeleteMessageById = createAsyncThunk(
  "message/softDeleteMessageById",
  async (messageId, thunkAPI) => {
    try {
      const data = await softDeleteMessage(messageId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const hardDeleteMessageById = createAsyncThunk(
  "message/hardDeleteMessageById",
  async (messageId, thunkAPI) => {
    try {
      const data = await hardDeleteMessage(messageId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    rooms: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    resetMessageError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createNewMessage
      .addCase(createNewMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages.push(action.payload.data);
      })
      .addCase(createNewMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create message";
      })

      // Handle getMessagesByRoom
      .addCase(getMessagesByRoom.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessagesByRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload.data;
      })
      .addCase(getMessagesByRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch messages";
      })

      // Handle updateMessageById
      .addCase(updateMessageById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMessageById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.messages.findIndex(
          (message) => message.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.messages[index] = action.payload.data;
        }
      })
      .addCase(updateMessageById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update message";
      })

      // Handle softDeleteMessageById
      .addCase(softDeleteMessageById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(softDeleteMessageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = state.messages.filter(
          (message) => message.id !== action.payload.data.messageId,
        );
      })
      .addCase(softDeleteMessageById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to soft delete message";
      })

      // Handle hardDeleteMessageById
      .addCase(hardDeleteMessageById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(hardDeleteMessageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = state.messages.filter(
          (message) => message.id !== action.payload.data.messageId,
        );
      })
      .addCase(hardDeleteMessageById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to hard delete message";
      });
  },
});

export const { resetMessageError } = messageSlice.actions;
export default messageSlice.reducer;
