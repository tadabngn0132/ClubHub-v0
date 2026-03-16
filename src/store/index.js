import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import activityReducer from "./slices/activitySlice";
import taskReducer from "./slices/taskSlice";
import departmentReducer from "./slices/departmentSlice";
import positionReducer from "./slices/positionSlice";
import memberApplicationReducer from "./slices/memberApplicationSlice";
import notificationReducer from "./slices/notificationSlice";
import departmentApplicationReducer from "./slices/departmentApplicationSlice";
import activityParticipationReducer from "./slices/activityParticipationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    activity: activityReducer,
    task: taskReducer,
    department: departmentReducer,
    position: positionReducer,
    memberApplication: memberApplicationReducer,
    notification: notificationReducer,
    departmentApplication: departmentApplicationReducer,
    activityParticipation: activityParticipationReducer,
  },
});

export default store;
