import axiosClient from "./axios.js";

export const getClubStructure = async () => {
  const response = await axiosClient.get("/public/club-structure");
  return response.data;
};