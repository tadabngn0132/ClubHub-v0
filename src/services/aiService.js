import axiosClient from "./axios";

export const generateAIResponse = async (prompt) => {
  const response = await axiosClient.post(
    "/ai/generate-response",
    { prompt },
    { timeout: 45000 },
  );
  return response.data;
};
