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
  async ({ id, userIds }, thunkAPI) => {
    try {
      const data = await addMemberToChatRoom(id, userIds);

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
    loading: {
      list: false,
      details: false,
      create: false,
      update: false,
      delete: false,
      members: false,
      memberAction: false,
    },
    error: null,
  },
  reducers: {
    resetChatRoomsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createNewChatRoom
      .addCase(createNewChatRoom.pending, (state) => {
        state.loading.create = true;
        state.error = null;
      })
      .addCase(createNewChatRoom.fulfilled, (state, action) => {
        state.loading.create = false;
        state.chatRooms.push(action.payload.data);
      })
      .addCase(createNewChatRoom.rejected, (state, action) => {
        state.loading.create = false;
        state.error = action.payload || action.error.message;
      })

      // Handle getAllChatRooms
      .addCase(getAllChatRooms.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(getAllChatRooms.fulfilled, (state, action) => {
        state.loading.list = false;
        state.chatRooms = action.payload.data;
      })
      .addCase(getAllChatRooms.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload || action.error.message;
      })

      // Handle getAChatRoomById
      .addCase(getAChatRoomById.pending, (state) => {
        state.loading.details = true;
        state.error = null;
      })
      .addCase(getAChatRoomById.fulfilled, (state, action) => {
        state.loading.details = false;
        state.chatRoom = action.payload.data;
      })
      .addCase(getAChatRoomById.rejected, (state, action) => {
        state.loading.details = false;
        state.error = action.payload || action.error.message;
      })

      // Handle getAllChatRoomsByUserId
      .addCase(getAllChatRoomsByUserId.pending, (state) => {
        state.loading.list = true;
        state.error = null;
      })
      .addCase(getAllChatRoomsByUserId.fulfilled, (state, action) => {
        state.loading.list = false;
        state.chatRooms = action.payload.data;
      })
      .addCase(getAllChatRoomsByUserId.rejected, (state, action) => {
        state.loading.list = false;
        state.error = action.payload || action.error.message;
      })

      // Handle updateChatRoomById
      .addCase(updateChatRoomById.pending, (state) => {
        state.loading.update = true;
        state.error = null;
      })
      .addCase(updateChatRoomById.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.chatRooms.findIndex(
          (chatRoom) => chatRoom.id === action.payload.data.id,
        );
        if (index !== -1) {
          state.chatRooms[index] = action.payload.data;
        }
      })
      .addCase(updateChatRoomById.rejected, (state, action) => {
        state.loading.update = false;
        state.error = action.payload || action.error.message;
      })

      // Handle deleteChatRoomById
      .addCase(deleteChatRoomById.pending, (state) => {
        state.loading.delete = true;
        state.error = null;
      })
      .addCase(deleteChatRoomById.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.chatRooms = state.chatRooms.filter(
          (chatRoom) => chatRoom.id !== action.payload.data.id,
        );
      })
      .addCase(deleteChatRoomById.rejected, (state, action) => {
        state.loading.delete = false;
        state.error = action.payload || action.error.message;
      })

      // Handle getChatRoomMembersById
      .addCase(getChatRoomMembersById.pending, (state) => {
        state.loading.members = true;
        state.error = null;
      })
      .addCase(getChatRoomMembersById.fulfilled, (state, action) => {
        state.loading.members = false;
        if (
          state.chatRoom &&
          state.chatRoom.id === action.payload.data.chatRoomId
        ) {
          state.chatRoom.members = action.payload.data.members;
        }
      })
      .addCase(getChatRoomMembersById.rejected, (state, action) => {
        state.loading.members = false;
        state.error = action.payload || action.error.message;
      })

      // Handle addMemberToChatRoomById
      .addCase(addMemberToChatRoomById.pending, (state) => {
        state.loading.memberAction = true;
        state.error = null;
      })
      .addCase(addMemberToChatRoomById.fulfilled, (state, action) => {
        state.loading.memberAction = false;
        if (state.chatRoom && Array.isArray(action.payload.data)) {
          state.chatRoom.members.push(...action.payload.data);
        }
      })
      .addCase(addMemberToChatRoomById.rejected, (state, action) => {
        state.loading.memberAction = false;
        state.error = action.payload || action.error.message;
      })

      // Handle removeMemberFromChatRoomById
      .addCase(removeMemberFromChatRoomById.pending, (state) => {
        state.loading.memberAction = true;
        state.error = null;
      })
      .addCase(removeMemberFromChatRoomById.fulfilled, (state, action) => {
        state.loading.memberAction = false;
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
        state.loading.memberAction = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetChatRoomsError } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
