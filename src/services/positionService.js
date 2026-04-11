import axiosClient from "./axios.js";

export const createPosition = async (positionData) => {
  const response = await axiosClient.post("/positions", positionData);
  return response.data;
};

export const getAllPositions = async () => {
  const response = await axiosClient.get("/positions");
  return response.data;
};

export const getPositionById = async (id) => {
  const response = await axiosClient.get(`/positions/${id}`);
  return response.data;
};

export const updatePosition = async (id, positionData) => {
  const response = await axiosClient.put(`/positions/${id}`, positionData);
  return response.data;
};

export const softDeletePosition = async (id) => {
  const response = await axiosClient.put(`/positions/${id}/soft`);
  return response.data;
};

export const hardDeletePosition = async (id) => {
  const response = await axiosClient.delete(`/positions/${id}/hard`);
  return response.data;
};
