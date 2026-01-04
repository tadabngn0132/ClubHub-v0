import axios from 'axios'
import { getToken } from '../utils/helper'

// Create an axios instance
const axiosClient = axios.create({
  baseURL: 'http://localhost:5995/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
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
        alert('Request successful!')
        break
      case 201:
        // Handle resource created
        alert('Resource created successfully!')
        break
      case 204:
        // Handle no content
        alert('No content available.')
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
        alert('Error 400: Bad Request')
        break
      case 401:
        // Handle unauthorized access, e.g., redirect to login
        alert('Error 401: Unauthorized access')
        break
      case 403:
        // Handle forbidden access
        alert('Error 403: Forbidden access')
        break
      case 404:
        // Handle resource not found
        alert('Error 404: Resource not found')
        break
      case 500:
        // Handle server error
        alert('Error 500: Server error')
        break
      case 502:
        // Handle bad gateway
        alert('Error 502: Bad Gateway')
        break
      case 504:
        // Handle gateway timeout
        alert('Error 504: Gateway Timeout')
        break
      default:
        break
    }

    return Promise.reject(error)
  }
)

export default axiosClient