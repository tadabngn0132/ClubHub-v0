import axiosClient from "./axios";

export const createChatRoom = async (data) => {
  const res = await axiosClient.post("/chat-rooms", data);
  return res.data;
};

export const getChatRooms = async () => {
  const res = await axiosClient.get("/chat-rooms");
  return res.data;
};

export const getChatRoomById = async (id) => {
  const res = await axiosClient.get(`/chat-rooms/${id}`);
  return res.data;
};

export const getChatRoomsByUserId = async (userId) => {
  const res = await axiosClient.get(`/chat-rooms/user/${userId}`);
  return res.data;
};

export const updateChatRoom = async (id, data) => {
  const res = await axiosClient.put(`/chat-rooms/${id}`, data);
  return res.data;
};

export const deleteChatRoom = async (id) => {
  const res = await axiosClient.delete(`/chat-rooms/${id}`);
  return res.data;
};

export const getChatRoomMembers = async (id) => {
  const res = await axiosClient.get(`/chat-rooms/${id}/members`);
  return res.data;
};

export const addMemberToChatRoom = async (id, userIds) => {
  const res = await axiosClient.post(`/chat-rooms/${id}/members`, { userIds });
  return res.data;
};

export const removeMemberFromChatRoom = async (id, userId) => {
  const res = await axiosClient.delete(`/chat-rooms/${id}/members/${userId}`);
  return res.data;
};
