import axiosClient from './axios'

export const login = async (payload) => {
  const res = await axiosClient.post('/auth/login', payload)
  return res.data
}

export const logout = async () => {
  const res = await axiosClient.post('/auth/logout')
  return res.data
}

export const changePassword = async (payload) => {
  console.log(payload)
  const res = await axiosClient.put('/auth/change-password', payload)
  return res.data
}

export const forgotPassword = async (payload) => {
  console.log(payload)
  const res = await axiosClient.post('/auth/forgot-password', payload)
  return res.data
}

export const resetPassword = async (payload) => {
  console.log(payload)
  const res = await axiosClient.put(`/auth/reset-password?email=${payload.email}&token=${payload.resetToken}`, payload)
  return res.data
}

export const refreshAccessToken = async () => {
  const res = await axiosClient.post('/auth/refresh-access-token')
  return res.data
}