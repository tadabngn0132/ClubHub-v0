import axios from 'axios'
import { getToken } from '../utils/helper'

// Create an axios instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:5995/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

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
        break
      case 201:
        // Handle resource created
        break
      case 204:
        // Handle no content
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
        break
      case 401:
        // Handle unauthorized access, e.g., redirect to login
        alert('Error 401: Unauthorized access')
        break
      case 403:
        // Handle forbidden access
        break
      case 404:
        // Handle resource not found
        break
      case 500:
        // Handle server error
        break
      case 502:
        // Handle bad gateway
        break
      case 504:
        // Handle gateway timeout
        break
      default:
        break
    }

    return Promise.reject(error)
  }
)

export default axiosClient