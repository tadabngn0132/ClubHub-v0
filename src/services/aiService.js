import axiosClient from "./axios";

export const generateAIResponse = async (prompt) => {
    const response = await axiosClient.post("/ai/generate-response", { prompt });
    return response.data;
}