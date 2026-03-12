import { axiosClient } from "./axios.js";

export const createDepartment = async (departmentData) => {
  const response = await axiosClient.post("/api/departments", departmentData);
  return response.data;
};

export const getAllDepartments = async () => {
  const response = await axiosClient.get("/api/departments");
  return response.data;
};

export const getDepartmentById = async (id) => {
  const response = await axiosClient.get(`/api/departments/${id}`);
  return response.data;
};

export const updateDepartment = async (id, departmentData) => {
  const response = await axiosClient.put(`/api/departments/${id}`, departmentData);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await axiosClient.delete(`/api/departments/${id}`);
  return response.data;
};
