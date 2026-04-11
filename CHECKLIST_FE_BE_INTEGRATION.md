# FE-BE Integration Checklist (ClubHub)

Muc tieu: chay duoc cac module BE da co route, da co service FE, va hoan thien man hinh su dung thuc te.

## 1) Hotfix bat buoc truoc (de tranh loi API)

- [ ] Fix endpoint Google Docs service (dang sai route)
- [ ] Fix xoa chat room theo dung route hard/soft delete
- [ ] Mount day du reducers con thieu vao Redux store

### 1.1 Fix Google Docs endpoint

File can sua: `src/services/googleDocsService.js`

```js
import axiosClient from "./axios";

export const createGoogleDocFromTemplate = async (data) => {
  // BE: POST /api/docs/from-template
  const response = await axiosClient.post("/docs/from-template", data);
  return response.data;
};

export const createGoogleDocTemplate = async (data) => {
  // BE: POST /api/docs/templates
  const response = await axiosClient.post("/docs/templates", data);
  return response.data;
};

export const getEmbeddableLinkForGoogleDoc = async (documentId) => {
  // BE: GET /api/docs/:documentId/embed-link
  const response = await axiosClient.get(`/docs/${documentId}/embed-link`);
  return response.data;
};
```

### 1.2 Fix delete chat room endpoint

File can sua: `src/services/chatRoomService.js`

```js
import axiosClient from "./axios";

// hard delete
export const hardDeleteChatRoom = async (id) => {
  const res = await axiosClient.delete(`/chat-rooms/${id}/hard`);
  return res.data;
};

// soft delete
export const softDeleteChatRoom = async (id) => {
  const res = await axiosClient.put(`/chat-rooms/${id}/soft`);
  return res.data;
};
```

Neu muon giu ten ham cu:

```js
export const deleteChatRoom = async (id, mode = "soft") => {
  if (mode === "hard") {
    const res = await axiosClient.delete(`/chat-rooms/${id}/hard`);
    return res.data;
  }

  const res = await axiosClient.put(`/chat-rooms/${id}/soft`);
  return res.data;
};
```

### 1.3 Mount reducers thieu trong store

File can sua: `src/store/index.js`

```js
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
import messageReducer from "./slices/messageSlice";
import googleDriveReducer from "./slices/googleDriveSlice";
import googleDocsReducer from "./slices/googleDocsSlice";
import googleSheetsReducer from "./slices/googleSheetsSlice";
import aiReducer from "./slices/aiSlice";
import dashboardReducer from "./slices/dashboardSlice";

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
    message: messageReducer,
    googleDrive: googleDriveReducer,
    googleDocs: googleDocsReducer,
    googleSheets: googleSheetsReducer,
    ai: aiReducer,
    dashboard: dashboardReducer,
  },
});
```

---

## 2) Hoan thien module Chat (dang placeholder)

- [ ] Sua `ChatRooms` thanh danh sach room thuc
- [ ] Sua `Chat` thanh message list + send message
- [ ] Noi socket event cho realtime room/message

### 2.1 ChatRooms mau

File goi y: `src/components/main/internal/ChatRooms.jsx`

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllChatRoomsByUserId } from "../../../store/slices/chatRoomSlice";

const ChatRooms = ({ userId, selectedRoomId, onSelectRoom }) => {
  const dispatch = useDispatch();
  const { chatRooms, isLoading } = useSelector((state) => state.chatRoom);

  useEffect(() => {
    if (userId) dispatch(getAllChatRoomsByUserId(userId));
  }, [dispatch, userId]);

  if (isLoading) return <div className="p-4">Loading rooms...</div>;

  return (
    <aside className="w-80 border-r border-slate-700">
      {chatRooms.map((room) => (
        <button
          key={room.id}
          onClick={() => onSelectRoom(room.id)}
          className={`block w-full p-3 text-left ${selectedRoomId === room.id ? "bg-slate-800" : ""}`}
        >
          <p className="font-semibold">{room.name}</p>
        </button>
      ))}
    </aside>
  );
};

export default ChatRooms;
```

### 2.2 Chat mau (list + send)

File goi y: `src/components/main/internal/Chat.jsx`

```jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMessagesByRoom,
  createNewMessage,
} from "../../../store/slices/messageSlice";

const Chat = ({ selectedRoomId }) => {
  const dispatch = useDispatch();
  const { messages, isLoading } = useSelector((state) => state.message);
  const { currentUser } = useSelector((state) => state.auth);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (selectedRoomId) {
      dispatch(getMessagesByRoom(selectedRoomId));
    }
  }, [dispatch, selectedRoomId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!content.trim() || !selectedRoomId) return;

    await dispatch(
      createNewMessage({
        chatRoomId: selectedRoomId,
        senderId: currentUser.id,
        content: content.trim(),
      }),
    );

    setContent("");
  };

  if (!selectedRoomId) return <div className="flex-1 p-6">Select a room</div>;

  return (
    <section className="flex flex-1 flex-col">
      <div className="flex-1 overflow-auto p-4">
        {isLoading
          ? "Loading..."
          : messages.map((m) => <p key={m.id}>{m.content}</p>)}
      </div>

      <form onSubmit={handleSend} className="border-t border-slate-700 p-3">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="w-full rounded border px-3 py-2"
        />
      </form>
    </section>
  );
};

export default Chat;
```

---

## 3) Hoan thien module Documents (dang mock data)

- [ ] Bo seed data trong DocumentMainContent
- [ ] Goi API Drive de lay folder/file that
- [ ] Goi API Docs/Sheets de tao file tu template
- [ ] Hien thi embed link that thay vi URL mau

### 3.1 Luong load du lieu toi thieu (mau)

File goi y: `src/components/main/internal/DocumentMainContent.jsx`

```jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listFolders,
  listFilesInFolder,
} from "../../../store/slices/googleDriveSlice";

useEffect(() => {
  dispatch(listFolders());
}, [dispatch]);

const { folders, files, loading } = useSelector((state) => state.googleDrive);

const handleOpenFolder = (folderId) => {
  dispatch(listFilesInFolder(folderId));
};
```

### 3.2 Tao doc/sheet tu template (mau)

```jsx
import { createDocFromTemplate } from "../../../store/slices/googleDocsSlice";
import { createSheetFromTemplateAsync } from "../../../store/slices/googleSheetsSlice";

const onCreateFromTemplate = async ({
  kind,
  templateId,
  destinationFolderId,
  title,
}) => {
  if (kind === "docs") {
    await dispatch(
      createDocFromTemplate({ templateId, destinationFolderId, title }),
    );
    return;
  }

  await dispatch(
    createSheetFromTemplateAsync({ templateId, destinationFolderId, title }),
  );
};
```

---

## 4) Hoan thien module Activity Participation

- [ ] Tao page danh sach participant theo activity
- [ ] Them action check-in/no-show
- [ ] Them thong ke attendance co ban theo activity

### 4.1 Them thunk check-in/no-show trong slice (mau)

File goi y: `src/store/slices/activityParticipationSlice.js`

```js
import {
  checkInParticipant as checkInParticipantApi,
  markParticipantNoShow as markParticipantNoShowApi,
} from "../../services/activityParticipationService";

export const checkInParticipantById = createAsyncThunk(
  "activityParticipation/checkIn",
  async (participationId, thunkAPI) => {
    try {
      const data = await checkInParticipantApi(participationId);
      if (!data.success) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const markNoShowByActivityAndUser = createAsyncThunk(
  "activityParticipation/noShow",
  async ({ activityId, userId }, thunkAPI) => {
    try {
      const data = await markParticipantNoShowApi(activityId, userId);
      if (!data.success) return thunkAPI.rejectWithValue(data.message);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
```

---

## 5) Module Department Application (mo rong cho day du CRUD)

- [ ] Them page list tong Department Applications (admin/moderator)
- [ ] Them page detail tung department application
- [ ] Them action soft delete/hard delete theo role

Code mau dispatch:

```jsx
import {
  getDepartmentApplicationsList,
  getDepartmentApplicationDetails,
  softDeleteDepartmentApplicationById,
} from "../../../store/slices/departmentApplicationSlice";

useEffect(() => {
  dispatch(getDepartmentApplicationsList());
}, [dispatch]);

const handleOpen = (id) => dispatch(getDepartmentApplicationDetails(id));
const handleSoftDelete = (id) =>
  dispatch(softDeleteDepartmentApplicationById(id));
```

---

## 6) Verification checklist (truoc khi merge)

- [ ] Dang nhap duoc theo role member/moderator/admin
- [ ] Chat room list + message list + send message chay duoc
- [ ] Document page khong con mock seed, hien thi du lieu API
- [ ] Tao docs/sheets tu template tra ve ket qua that
- [ ] Activity participation co check-in/no-show
- [ ] Khong con endpoint 404 trong Network tab
- [ ] Redux state co day du keys: `message`, `googleDrive`, `googleDocs`, `googleSheets`

Lenh chay nhanh:

```bash
npm run dev
npm run lint
```

Neu muon toi uu quy trinh dev:

- Lam xong muc 1 truoc (hotfix endpoint + store)
- Sau do lam muc 2 (Chat)
- Tiep theo muc 3 (Documents)
- Cuoi cung muc 4 va muc 5
