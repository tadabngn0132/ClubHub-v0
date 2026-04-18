import axiosClient from "./axios";

export const getSystemLogs = async () => {
  const response = await axiosClient.get(`/system-logs`);
  return response.data;
};
