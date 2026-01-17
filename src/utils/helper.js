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

export { 
  getToken, 
  setToken, 
  removeToken,
  getCurrentUser,
  setCurrentUser,
  removeCurrentUser
}
