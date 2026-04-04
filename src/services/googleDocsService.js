import axiosClient from "./axios";

export const createGoogleDocFromTemplate = async (data) => {
  const response = await axiosClient.post("/docs/create-from-template", data);
  return response.data;
};

export const createGoogleDocTemplate = async (data) => {
  const response = await axiosClient.post("/docs/create-template", data);
  return response.data;
};

export const getEmbeddableLinkForGoogleDoc = async (documentId) => {
  const response = await axiosClient.get(`/docs/${documentId}/embed-link`);
  return response.data;
};
