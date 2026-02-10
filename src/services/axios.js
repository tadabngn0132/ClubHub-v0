import axios from 'axios'
import { getToken } from '../utils/helper'
import { logoutUser } from '../store/slices/authSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'

// Create an axios instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:5995/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// TODO: Implement queue mechanism for handling 401 responses
// TODO: Implement global variables for queueing

// TODO: Implement queue functions

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    // Attach token to headers if available
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    switch (response.status) {
      case 200:
        // Handle success
        toast.success(response.data.message || 'Request successful')
        break
      case 201:
        // Handle resource created
        toast.success(response.data.message || 'Resource created successfully')
        break
      case 204:
        // Handle no content
        toast.success(response.data.message || 'Request successful')
        break
      default:
        break
    }

    return response
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    switch (error.response?.status) {
      case 400:
        // Handle bad request
        toast.error(error.response.data.message || 'Bad request')
        break
      case 401:
        // TODO: Handle refresh token expiration or unauthorized access in queue function
        toast.error('Session expired. Please log in again.')
        const dispatch = useDispatch()
        dispatch(logoutUser())
        break
      case 403:
        // Handle forbidden access
        toast.error('You do not have permission to perform this action.')
        break
      case 404:
        // Handle resource not found
        toast.error('Requested resource not found.')
        break
      case 500:
        // Handle server error
        toast.error('Internal server error. Please try again later.')
        break
      case 502:
        // Handle bad gateway
        toast.error('Bad gateway. Please try again later.')
        break
      case 504:
        // Handle gateway timeout
        toast.error('Gateway timeout. Please try again later.')
        break
      default:
        break
    }

    return Promise.reject(error)
  }
)

export default axiosClient