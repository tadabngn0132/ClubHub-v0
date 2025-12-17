import axiosClient from './axios'

export const login = async (payload) => {
  try {
    console.log(payload)
    const res = await axiosClient.post('/auth/login', payload)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
}

export const register = async (payload) => {
  try {
    console.log(payload)
    const res = await axiosClient.post('/auth/register', payload)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
}

export const logout = async (payload) => {
  try {
    console.log(payload)
    const res = await axiosClient.post('/auth/logout', payload)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
}

export const changePassword = async (payload) => {
  try {
    console.log(payload)
    const res = await axiosClient.put('/auth/changePassword', payload)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
}

export const forgotPassword = async (payload) => {
  try {
    console.log(payload)
    const res = await axiosClient.post('/auth/forgotPassword', payload)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
}

export const resetPassword = async (payload) => {
  try {
    console.log(payload)
    const res = await axiosClient.put('/auth/resetPassword', payload)
    return res
  } catch (error) {
    console.error(error)
    return error
  }
}

export const googleAuth = async () => {
  try {    
    const res = await axiosClient.get('auth/google-auth')
    return res
  } catch (error) {
    console.error(error)    
    return error
  }
}

export const googleAuthCallback = async () => {
  try {
    const res = await axiosClient.get('auth/google-auth/callback')
    return res
  } catch (error) {
    console.error(error)
    return error
  }
}