import axiosClient from "./axios";

export const getPublicActivities = async () => {
  const res = await axiosClient.get("/public/activities");
  return res.data;
};

export const getPublicActivityBySlug = async (slug) => {
  const res = await axiosClient.get(`/public/activities/slug/${slug}`);
  return res.data;
};

export const registerPublicActivity = async (activityId, payload) => {
  const res = await axiosClient.post(
    `/public/activities/${activityId}/register`,
    payload,
  );
  return res.data;
};