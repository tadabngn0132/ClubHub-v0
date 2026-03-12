import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import activityReducer from "./slices/activitySlice";
import taskReducer from "./slices/taskSlice";
import departmentReducer from "./slices/departmentSlice";
import positionReducer from "./slices/positionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    activity: activityReducer,
    task: taskReducer,
    department: departmentReducer,
    position: positionReducer,
  },
});

export default store;
