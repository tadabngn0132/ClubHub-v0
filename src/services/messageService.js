import axiosClient from "./axios";

export const createMessage = async (messageData) => {
  const response = await axiosClient.post("/messages", messageData);
  return response.data;
};

export const getMessagesByChatRoomId = async (chatRoomId) => {
  const response = await axiosClient.get(`/messages/chatroom/${chatRoomId}`, {
    timeout: 10000,
  });
  return response.data;
};

export const updateMessage = async (id, messageData) => {
  const response = await axiosClient.put(`/messages/${id}`, messageData);
  return response.data;
};

export const softDeleteMessage = async (id) => {
  const response = await axiosClient.put(`/messages/${id}/soft`);
  return response.data;
};

export const hardDeleteMessage = async (id) => {
  const response = await axiosClient.delete(`/messages/${id}/hard`);
  return response.data;
};
