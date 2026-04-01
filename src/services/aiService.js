import axiosClient from "./axios";

export const aiGenerate = async (payload) => {
  const res = await axiosClient.post("/ai/generate", payload);
  return res.data;
};

export const aiActivityRecommendation = async (payload) => {
  const res = await axiosClient.post("/ai/activity-recommendation", payload);
  return res.data;
};

export const aiEventDescription = async (payload) => {
  const res = await axiosClient.post("/ai/event-description", payload);
  return res.data;
};

export const aiDraftMessage = async (payload) => {
  const res = await axiosClient.post("/ai/draft-message", payload);
  return res.data;
};

export const aiPlanTask = async (payload) => {
  const res = await axiosClient.post("/ai/plan-task", payload);
  return res.data;
};

export const aiGenerateAdvanced = async (payload) => {
  const res = await axiosClient.post("/ai/generate-advanced", payload);
  return res.data;
};
