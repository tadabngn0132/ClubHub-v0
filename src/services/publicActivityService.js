import axiosClient from "./axios";

export const getPublicActivities = async () => {
  const res = await axiosClient.get("/public/activities");
  return res.data;
};