import { jwtDecode } from 'jwt-decode'

// Token helper functions
const getToken = () => {
  return localStorage.getItem('accessToken')
}

const setToken = (token) => {
  localStorage.setItem('accessToken', token)
}

const removeToken = () => {
  localStorage.removeItem('accessToken')
}

// User helper functions
const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser')
  return user ? JSON.parse(user) : null
}

const setCurrentUser = (user) => {
  localStorage.setItem('currentUser', JSON.stringify(user))
}

const removeCurrentUser = () => {
  localStorage.removeItem('currentUser')
}

const decodeAccessToken = (token) => {
  if (!token) return null

  try {
    const decodedAccessToken = jwtDecode(token)
    return decodedAccessToken
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

const isTokenNeedToRefresh = (decodedToken) => {
  if (!decodedToken) return false

  const currentTime = Date.now()
  const expirationTime = decodedToken.exp * 1000
  const remainingTime = expirationTime - currentTime
  return remainingTime <= 180000 // 3 minutes 
}

export { 
  getToken, 
  setToken, 
  removeToken,
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser,
  decodeAccessToken,
  isTokenNeedToRefresh
}
