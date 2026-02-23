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

export const deleteNotification = async (id) => {
  const res = await axiosClient.delete(`/notifications/${id}`);
  return res.data;
};

export const getNotificationsByUserId = async (userId) => {
  const res = await axiosClient.get(`/notifications/user/${userId}`);
  return res.data;
};

export const updateNotification = async (id, msg) => {
  const res = await axiosClient.put(`/notifications/${id}`, { message: msg });
  return res.data;
};

export const deleteNotificationsByUserId = async (userId) => {
  const res = await axiosClient.delete(`/notifications/user/${userId}`);
  return res.data;
};
