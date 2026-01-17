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
  const res = await axiosClient.put('/auth/changePassword', payload)
  return res.data
}

export const forgotPassword = async (payload) => {
  console.log(payload)
  const res = await axiosClient.post('/auth/forgotPassword', payload)
  return res.data
}

export const resetPassword = async (payload) => {
  console.log(payload)
  const res = await axiosClient.put('/auth/resetPassword', payload)
  return res.data
}

export const googleAuth = async () => {
  const res = await axiosClient.get('auth/google-auth')
  return res.data
}

export const googleAuthCallback = async () => {
  const res = await axiosClient.get('auth/google-auth/callback')
  return res.data
}

export const refreshAccessToken = async () => {
  const res = await axiosClient.post('/auth/refresh-access-token')
  return res.data
}