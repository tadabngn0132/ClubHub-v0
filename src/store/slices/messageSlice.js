import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createMessage,
  updateMessage,
  getMessagesByRoomId,
  deleteMessage,
  getAllRoomsForUser,
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
      const data = await getMessagesByRoomId(roomId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteMessageById = createAsyncThunk(
  "message/deleteMessageById",
  async (messageId, thunkAPI) => {
    try {
      const data = await deleteMessage(messageId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getAllRoomsForCurrentUser = createAsyncThunk(
  "message/getAllRoomsForCurrentUser",
  async (_, thunkAPI) => {
    try {
      const data = await getAllRoomsForUser();

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
  reducers: {},
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

      // Handle deleteMessageById
      .addCase(deleteMessageById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMessageById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = state.messages.filter(
          (message) => message.id !== action.payload.data.messageId,
        );
      })
      .addCase(deleteMessageById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to delete message";
      })

      // Handle getAllRoomsForCurrentUser
      .addCase(getAllRoomsForCurrentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRoomsForCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rooms = action.payload.data;
      })
      .addCase(getAllRoomsForCurrentUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to fetch rooms";
      });
  },
});

export const {} = messageSlice.actions;
export default messageSlice.reducer;
