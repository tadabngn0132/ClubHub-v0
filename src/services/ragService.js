import axiosClient from "./axios";

export const queryRAG = async ({ query, sourceType = "" }) => {
  const response = await axiosClient.post("/rag/query", { query, sourceType });
  return response.data;
};

export const triggerRAGReindex = async () => {
  const response = await axiosClient.post("/rag/reindex");
  return response.data;
};

export const getRAGHealth = async () => {
  const response = await axiosClient.get("/rag/health");
  return response.data;
};
