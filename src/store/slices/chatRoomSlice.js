import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createNewChatRoom = createAsyncThunk(
    'chatRooms/createNewChatRoom',
    async (chatRoomData, thunkAPI) => {
        try {
            const data = await chatRoomService.createChatRoom(chatRoomData);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getAllChatRooms = createAsyncThunk(
    'chatRooms/getAllChatRooms',
    async (_, thunkAPI) => {
        try {
            const data = await chatRoomService.getChatRooms();

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getChatRoomById = createAsyncThunk(
    'chatRooms/getChatRoomById',
    async (id, thunkAPI) => {
        try {
            const data = await chatRoomService.getChatRoomById(id);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }
            
            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const getChatRoomsByUserId = createAsyncThunk(
    'chatRooms/getChatRoomsByUserId',
    async (userId, thunkAPI) => {
        try {
            const data = await chatRoomService.getChatRoomsByUserId(userId);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const updateChatRoom = createAsyncThunk(
    'chatRooms/updateChatRoom',
    async ({ id, chatRoomData }, thunkAPI) => {
        try {
            const data = await chatRoomService.updateChatRoom(id, chatRoomData);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

export const deleteChatRoom = createAsyncThunk(
    'chatRooms/deleteChatRoom',
    async (id, thunkAPI) => {
        try {
            const data = await chatRoomService.deleteChatRoom(id);

            if (!data.success) {
                return thunkAPI.rejectWithValue(data.message);
            }

            return data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const chatRoomSlice = createSlice({
    name: 'chatRooms',
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

            // Handle getChatRoomById
            .addCase(getChatRoomById.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getChatRoomById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatRoom = action.payload.data;
            })
            .addCase(getChatRoomById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })

            // Handle getChatRoomsByUserId
            .addCase(getChatRoomsByUserId.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getChatRoomsByUserId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatRooms = action.payload.data;
            })
            .addCase(getChatRoomsByUserId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })

            // Handle updateChatRoom
            .addCase(updateChatRoom.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateChatRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.chatRooms.findIndex(chatRoom => chatRoom.id === action.payload.chatRoom.id);
                if (index !== -1) {
                    state.chatRooms[index] = action.payload.chatRoom;
                }
            })
            .addCase(updateChatRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })

            // Handle deleteChatRoom
            .addCase(deleteChatRoom.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteChatRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.chatRooms = state.chatRooms.filter(chatRoom => chatRoom.id !== action.payload.chatRoom.id);
            })
            .addCase(deleteChatRoom.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            });
        }
    });

export const { } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;