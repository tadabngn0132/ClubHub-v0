import axiosClient from './axios';

export const createChatRoom = async (data) => {
    const res = await axiosClient.post('/chat-rooms', data);
    return res.data;
}

export const getChatRooms = async () => {
    const res = await axiosClient.get('/chat-rooms');
    return res.data;
}

export const getChatRoomById = async (id) => {
    const res = await axiosClient.get(`/chat-rooms/${id}`);
    return res.data;
}

export const getChatRoomsByUserId = async (userId) => {
    const res = await axiosClient.get(`/chat-rooms/user/${userId}`);
    return res.data;
}

export const updateChatRoom = async (id, data) => {
    const res = await axiosClient.put(`/chat-rooms/${id}`, data);
    return res.data;
}

export const deleteChatRoom = async (id) => {
    const res = await axiosClient.delete(`/chat-rooms/${id}`);
    return res.data;
}