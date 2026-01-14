import axiosClient from "./axios"

export const createAnActivity = async (data) => {
  const res = await axiosClient.post('/activities', data)
  return res.data
}

export const getActivityById = async (id) => {
  const res = await axiosClient.get(`/activities/${id}`)
  return res.data
}

export const getAllActivities = async () => {
  const res = await axiosClient.get('/activities')
  return res.data
}

export const getActivitiesBySlug = async (slug) => {
  const res = await axiosClient.get(`/activities/${slug}`)
  return res.data
}

export const updateAnActivity = async (id, data) => {
  const res = await axiosClient.put(`/activities/${id}`, data)
  return res.data
}

export const deleteAnActivity = async (id) => {
  const res = await axiosClient.delete(`/activities/${id}`)
  return res.data
}