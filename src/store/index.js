import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import activityReducer from "./slices/activitySlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    activity: activityReducer,
    task: taskReducer,
  },
});

export default store;
