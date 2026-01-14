import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import activityReducer from './slices/activitySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    activity: activityReducer
  }
})

export default store;