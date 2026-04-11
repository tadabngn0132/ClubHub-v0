import axiosClient from "./axios";

export const createNotification = async (data) => {
  const res = await axiosClient.post("/notifications", data);
  return res.data;
};

export const getAllNotifications = async () => {
  const res = await axiosClient.get("/notifications");
  return res.data;
};

export const getNotificationById = async (id) => {
  const res = await axiosClient.get(`/notifications/${id}`);
  return res.data;
};

export const updateNotification = async (id, msg) => {
  const res = await axiosClient.put(`/notifications/${id}`, { message: msg });
  return res.data;
};

export const softDeleteNotification = async (id) => {
  const res = await axiosClient.put(`/notifications/${id}/soft`);
  return res.data;
};

export const hardDeleteNotification = async (id) => {
  const res = await axiosClient.delete(`/notifications/${id}/hard`);
  return res.data;
};

export const getNotificationsByUserId = async (userId) => {
  const res = await axiosClient.get(`/notifications/user/${userId}`);
  return res.data;
};

export const softDeleteNotificationsByUserId = async (userId) => {
  const res = await axiosClient.put(`/notifications/user/${userId}/soft`);
  return res.data;
};

export const hardDeleteNotificationsByUserId = async (userId) => {
  const res = await axiosClient.delete(`/notifications/user/${userId}/hard`);
  return res.data;
};
