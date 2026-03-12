import { axiosClient } from "./axios.js";

export const createPosition = async (positionData) => {
  const response = await axiosClient.post("/api/positions", positionData);
  return response.data;
};

export const getAllPositions = async () => {
  const response = await axiosClient.get("/api/positions");
  return response.data;
};

export const getPositionById = async (id) => {
  const response = await axiosClient.get(`/api/positions/${id}`);
  return response.data;
};

export const updatePosition = async (id, positionData) => {
  const response = await axiosClient.put(`/api/positions/${id}`, positionData);
  return response.data;
};

export const deletePosition = async (id) => {
  const response = await axiosClient.delete(`/api/positions/${id}`);
  return response.data;
};
