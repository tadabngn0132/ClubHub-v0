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
import chatRoomReducer from "./slices/chatRoomSlice";
import aiReducer from "./slices/aiSlice";
import dashboardReducer from "./slices/dashboardSlice";
import googleDocsReducer from "./slices/googleDocsSlice";
import googleSheetsReducer from "./slices/googleSheetsSlice";
import googleDriveReducer from "./slices/googleDriveSlice";
import messageReducer from "./slices/messageSlice";
import notificationPreferenceReducer from "./slices/notificationPreferenceSlice";
import systemLogReducer from "./slices/systemLogSlice";
import aiChatReducer from "./slices/aiChatSlice";

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
    chatRoom: chatRoomReducer,
    ai: aiReducer,
    dashboard: dashboardReducer,
    googleDocs: googleDocsReducer,
    googleSheets: googleSheetsReducer,
    googleDrive: googleDriveReducer,
    message: messageReducer,
    notificationPreference: notificationPreferenceReducer,
    systemLog: systemLogReducer,
    aiChat: aiChatReducer,
  },
});

export default store;
