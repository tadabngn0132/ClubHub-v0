import axiosClient from "./axios"

export const createAnUser = async (data) => {
  const res = await axiosClient.post('/users', data)
  return res.data
}

export const getAnUserById = async (id) => {
  const res = await axiosClient.get(`/users/${id}`)
  return res.data
}

export const getAllUsers = async () => {
  const res = await axiosClient.get('/users')
  return res.data
}

export const updateAnUser = async (id, data) => {
  const res = await axiosClient.put(`/users/${id}`, data)
  return res.data
}

export const deleteAnUser = async (id) => {
  const res = await axiosClient.delete(`/users/${id}`)
  return res.data
}