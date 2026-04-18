import axiosClient from "./axios";

export const getNotificationPreferences = async (userId) => {
  const response = await axiosClient.get(`/notification-preferences/${userId}`);
  return response.data;
};

export const updateNotificationPreferences = async (userId, preferenceData) => {
  const response = await axiosClient.put(
    `/notification-preferences/${userId}`,
    preferenceData,
  );
  return response.data;
};
