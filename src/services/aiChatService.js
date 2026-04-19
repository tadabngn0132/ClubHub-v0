import axiosClient from "./axios";

export const promptAIChat = async ({ query, sourceType = "" }) => {
  const response = await axiosClient.post("/ai-chat", { query, sourceType });
  return response.data;
};

export const getAIChatHistory = async () => {
  const response = await axiosClient.get("/ai-chat/history");
  return response.data;
};

export const clearAIChatHistory = async () => {
  const response = await axiosClient.delete("/ai-chat/history");
  return response.data;
};
