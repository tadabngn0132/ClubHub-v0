import axiosClient from "./axios";

export const createMessage = async (messageData) => {
  const response = await axiosClient.post("/messages", messageData);
  return response.data;
};

export const updateMessage = async (messageId, updatedData) => {
  const response = await axiosClient.put(`/messages/${messageId}`, updatedData);
  return response.data;
}

export const getMessagesByRoomId = async (roomId) => {
  const response = await axiosClient.get(`/messages/room/${roomId}`);
  return response.data;
}

export const deleteMessage = async (messageId) => {
  const response = await axiosClient.delete(`/messages/${messageId}`);
  return response.data;
}

export const getAllRoomsForUser = async () => {
  const response = await axiosClient.get("/rooms");
  return response.data;
}

