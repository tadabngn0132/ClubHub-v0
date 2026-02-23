import axiosClient from "./axios";

export const createTask = async (data) => {
  const res = await axiosClient.post("/tasks", data);
  return res.data;
};

export const getTaskById = async (id) => {
  const res = await axiosClient.get(`/tasks/${id}`);
  return res.data;
};

export const getAllTasks = async () => {
  const res = await axiosClient.get("/tasks");
  return res.data;
};

export const getTasksByUserId = async (userId) => {
  const res = await axiosClient.get(`/tasks/user/${userId}`);
  return res.data;
};

export const updateTask = async (id, data) => {
  const res = await axiosClient.put(`/tasks/${id}`, data);
  return res.data;
};

export const deleteTask = async (id) => {
  const res = await axiosClient.delete(`/tasks/${id}`);
  return res.data;
};
