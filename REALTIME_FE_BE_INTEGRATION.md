# Realtime FE Integration Guide (ClubHub)

Tai lieu nay mo ta cac buoc tich hop realtime o frontend de khop voi backend Socket.IO hien tai.

## 1) Tong quan backend hien tai

Backend da co:

- Socket auth middleware: bat buoc access token hop le khi connect socket.
- User room theo format: `user:{userId}` (tu dong join khi connect).
- Chat room realtime theo format: `room:{roomId}`.
- Event realtime cho:
  - message
  - notification
  - typing
- HTTP controllers (message/notification) cung da emit realtime, nen goi API REST van realtime duoc.

## 2) Yeu cau token khi connect socket

Socket khong cho connect anonymous nua. FE can gui access token trong `auth.token`.

Vi du update `src/hooks/useSocket.js`:

```js
import { useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_API_URL || "http://localhost:5995";

export const useSocket = (accessToken) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!accessToken) return;

    socketRef.current = io(SOCKET_URL, {
      auth: {
        token: `Bearer ${accessToken}`,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
      transports: ["websocket", "polling"],
      withCredentials: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected:", socketRef.current.id);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connect error:", error.message);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [accessToken]);

  const emitEvent = useCallback((event, data) => {
    if (!socketRef.current?.connected) return;
    socketRef.current.emit(event, data);
  }, []);

  const emitEventWithAck = useCallback((event, data) => {
    return new Promise((resolve) => {
      if (!socketRef.current?.connected) {
        resolve({ success: false, message: "Socket not connected" });
        return;
      }

      socketRef.current.emit(event, data, (ack) => {
        resolve(ack || { success: false, message: "No ack response" });
      });
    });
  }, []);

  const onEvent = useCallback((event, callback) => {
    socketRef.current?.on(event, callback);
    return () => socketRef.current?.off(event, callback);
  }, []);

  return {
    socket: socketRef.current,
    emitEvent,
    emitEventWithAck,
    onEvent,
  };
};
```

## 3) Event contract FE can theo

## 3.1 Message events

### Send message

- Event gui: `message:send`
- Payload FE nen gui:

```json
{
  "receiverId": 2,
  "roomId": "1-2",
  "content": "hello"
}
```

Luu y:

- Khong can gui `senderId` (server lay tu token).
- Co the dung ack de biet ket qua:

```js
const ack = await emitEventWithAck("message:send", {
  receiverId,
  roomId,
  content,
});

if (!ack.success) {
  // hien thi loi
}
```

### Receive message

- Event nghe: `message:receive`
- Data la object message tu DB.

### Message sent confirm (cho sender)

- Event nghe: `message:sent`
- Data:

```json
{
  "success": true,
  "messageId": 123,
  "createdAt": "..."
}
```

### Delete message

- Event gui: `message:delete`
- Payload: `messageId`
- Event nghe: `message:deleted`

## 3.2 Typing events

### Start typing

- Event gui: `user:typing`
- Payload FE nen gui:

```json
{
  "receiverId": 2
}
```

### Stop typing

- Event gui: `user:stop-typing`
- Payload FE nen gui:

```json
{
  "receiverId": 2
}
```

### Listen typing

- Event nghe: `user:typing`
- Event nghe: `user:stop-typing`
- Server tra ve:

```json
{
  "senderId": 1
}
```

## 3.3 Notification events

### Send notification

- Event gui: `notification:send`
- Payload:

```json
{
  "recipientId": 2,
  "message": "Ban co thong bao moi"
}
```

- Co the dung ack giong message.

### Receive notification

- Event nghe: `notification:receive`
- Data la notification object tu DB.

### Mark as read

- Event gui: `notification:read`
- Payload: `notificationId`
- Event nghe update: `notification:read`

### Delete notification

- Event gui: `notification:delete`
- Payload: `notificationId`
- Event nghe update: `notification:delete`

## 4) Chinh FE hien tai cho khop

## 4.1 `Chat.jsx`

Can doi payload gui:

- Message send: bo `senderId`, chi gui `receiverId`, `roomId`, `content`.
- Typing events: bo `senderId`, chi gui `receiverId`.

Vi du:

```js
emitEvent("user:typing", { receiverId: otherUserId });
emitEvent("user:stop-typing", { receiverId: otherUserId });

emitEvent("message:send", {
  receiverId: otherUserId,
  roomId,
  content: input,
});
```

## 4.2 Access token source

Nen lay access token tu Redux auth store hoac localStorage roi truyen vao `useSocket(accessToken)`.

Neu access token thay doi (login/refresh/logout), hook can reconnect voi token moi.

## 4.3 Khong can emit `user:online` thu cong

Backend da tu mark online khi connect thanh cong va join user room.

## 5) Realtime + REST song song

Vi backend da emit realtime ngay trong HTTP controllers:

- message create/update/delete qua REST van realtime.
- notification create/update/delete qua REST van realtime.

Nen FE co 2 lua chon:

- Lua chon A: goi Socket event truc tiep cho thao tac realtime.
- Lua chon B: tiep tuc goi REST, va chi lang nghe event realtime de cap nhat UI.

Co the ket hop ca 2 tuy use case.

## 6) Test checklist FE

- Connect socket voi token hop le -> thanh cong.
- Connect khong co token/het han -> `connect_error`.
- Gui `message:send` nhan ack success.
- User nhan duoc `message:receive` theo room/user.
- Typing indicator hien dung nguoi.
- Gui `notification:send` -> receiver nhan `notification:receive`.
- Mark read/delete notification -> nhan event cap nhat.
- Logout -> disconnect socket va clear listeners.

## 7) Goi y implementation strategy

- Tao 1 `SocketProvider` o cap App de duy tri 1 ket noi socket duy nhat.
- Hooks/UI component chi subscribe/unsubscribe event, tranh tao nhieu connection.
- Toan bo event name nen de trong 1 file constants o FE de tranh typo.
