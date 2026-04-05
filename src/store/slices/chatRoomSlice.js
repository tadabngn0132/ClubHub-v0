import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createChatRoom,
  getChatRooms,
  getChatRoomById,
  getChatRoomsByUserId,
  updateChatRoom,
  deleteChatRoom,
  addMemberToChatRoom,
  removeMemberFromChatRoom,
  getChatRoomMembers,
} from "../../services/chatRoomService";

export const createNewChatRoom = createAsyncThunk(
  "chatRooms/createNewChatRoom",
  async (chatRoomData, thunkAPI) => {
    try {
      const data = await createChatRoom(chatRoomData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const getAllChatRooms = createAsyncThunk(
  "chatRooms/getAllChatRooms",
  async (_, thunkAPI) => {
    try {
      const data = await getChatRooms();

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const getAChatRoomById = createAsyncThunk(
  "chatRooms/getChatRoomById",
  async (id, thunkAPI) => {
    try {
      const data = await getChatRoomById(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const getAllChatRoomsByUserId = createAsyncThunk(
  "chatRooms/getAllChatRoomsByUserId",
  async (userId, thunkAPI) => {
    try {
      const data = await getChatRoomsByUserId(userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const updateChatRoomById = createAsyncThunk(
  "chatRooms/updateChatRoom",
  async ({ id, chatRoomData }, thunkAPI) => {
    try {
      const data = await updateChatRoom(id, chatRoomData);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const deleteChatRoomById = createAsyncThunk(
  "chatRooms/deleteChatRoom",
  async (id, thunkAPI) => {
    try {
      const data = await deleteChatRoom(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const getChatRoomMembersById = createAsyncThunk(
  "chatRooms/getChatRoomMembers",
  async (id, thunkAPI) => {
    try {
      const data = await getChatRoomMembers(id);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const addMemberToChatRoomById = createAsyncThunk(
  "chatRooms/addMemberToChatRoom",
  async ({ id, userId }, thunkAPI) => {
    try {
      const data = await addMemberToChatRoom(id, userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

export const removeMemberFromChatRoomById = createAsyncThunk(
  "chatRooms/removeMemberFromChatRoom",
  async ({ id, userId }, thunkAPI) => {
    try {
      const data = await removeMemberFromChatRoom(id, userId);

      if (!data.success) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

const chatRoomSlice = createSlice({
  name: "chatRooms",
  initialState: {
    chatRooms: [],
    chatRoom: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle createNewChatRoom
      .addCase(createNewChatRoom.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewChatRoom.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatRooms.push(action.payload.chatRoom);
      })
      .addCase(createNewChatRoom.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle getAllChatRooms
      .addCase(getAllChatRooms.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllChatRooms.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatRooms = action.payload.data;
      })
      .addCase(getAllChatRooms.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle getAChatRoomById
      .addCase(getAChatRoomById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAChatRoomById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatRoom = action.payload.data;
      })
      .addCase(getAChatRoomById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle getAllChatRoomsByUserId
      .addCase(getAllChatRoomsByUserId.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllChatRoomsByUserId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatRooms = action.payload.data;
      })
      .addCase(getAllChatRoomsByUserId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle updateChatRoomById
      .addCase(updateChatRoomById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateChatRoomById.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.chatRooms.findIndex(
          (chatRoom) => chatRoom.id === action.payload.chatRoom.id,
        );
        if (index !== -1) {
          state.chatRooms[index] = action.payload.chatRoom;
        }
      })
      .addCase(updateChatRoomById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle deleteChatRoomById
      .addCase(deleteChatRoomById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteChatRoomById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chatRooms = state.chatRooms.filter(
          (chatRoom) => chatRoom.id !== action.payload.chatRoom.id,
        );
      })
      .addCase(deleteChatRoomById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle getChatRoomMembersById
      .addCase(getChatRoomMembersById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getChatRoomMembersById.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          state.chatRoom &&
          state.chatRoom.id === action.payload.data.chatRoomId
        ) {
          state.chatRoom.members = action.payload.data.members;
        }
      })
      .addCase(getChatRoomMembersById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle addMemberToChatRoomById
      .addCase(addMemberToChatRoomById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addMemberToChatRoomById.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          state.chatRoom &&
          state.chatRoom.id === action.payload.data.chatRoomId
        ) {
          state.chatRoom.members.push(action.payload.data);
        }
      })
      .addCase(addMemberToChatRoomById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      })

      // Handle removeMemberFromChatRoomById
      .addCase(removeMemberFromChatRoomById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeMemberFromChatRoomById.fulfilled, (state, action) => {
        state.isLoading = false;
        if (
          state.chatRoom &&
          state.chatRoom.id === action.payload.data.chatRoomId
        ) {
          state.chatRoom.members = state.chatRoom.members.filter(
            (member) => member.userId !== action.payload.data.userId,
          );
        }
      })
      .addCase(removeMemberFromChatRoomById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const {} = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
