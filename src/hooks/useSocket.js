import { useEffect, useRef, useCallback } from "react";
import io from "socket.io-client";
import { getToken } from "../utils/helper";

const SOCKET_URL = import.meta.env.VITE_NODE_ENV === "production"
  ? import.meta.env.VITE_SOCKET_URL
  : import.meta.env.VITE_SOCKET_URL || "http://localhost:5995";
const MAX_RECONNECT = 5;

let sharedSocket = null;
let activeConnections = 0;
let sharedSocketToken = null;

const createSocket = (accessToken) => {
  if (!accessToken) {
    return null;
  }

  return io(SOCKET_URL, {
    auth: {
      token: `Bearer ${accessToken}`,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: MAX_RECONNECT,
    transports: ["websocket", "polling"],
    withCredentials: true,
  });
};

export const useSocket = (token) => {
  const socketRef = useRef(null);
  const accessToken = token || getToken();

  useEffect(() => {
    if (!accessToken) {
      return undefined;
    }

    if (sharedSocket && sharedSocketToken !== accessToken) {
      sharedSocket.disconnect();
      sharedSocket = null;
      sharedSocketToken = null;
    }

    if (!sharedSocket) {
      sharedSocket = createSocket(accessToken);
      sharedSocketToken = accessToken;

      if (sharedSocket) {
        const socketInstance = sharedSocket;

        sharedSocket.on("connect", () => {
          console.log("Socket connected:", socketInstance.id);
        });

        sharedSocket.on("connect_error", (error) => {
          console.error("Socket connect error:", error.message);
        });

        sharedSocket.on("disconnect", (reason) => {
          console.log("Socket disconnected:", reason);
        });
      }
    } else if (
      sharedSocket.auth?.token !== `Bearer ${accessToken}` ||
      !sharedSocket.connected
    ) {
      sharedSocket.auth = { token: `Bearer ${accessToken}` };
      sharedSocketToken = accessToken;
      sharedSocket.connect();
    }

    socketRef.current = sharedSocket;
    activeConnections += 1;

    return () => {
      activeConnections -= 1;

      if (activeConnections <= 0 && sharedSocket) {
        sharedSocket.disconnect();
        sharedSocket = null;
        sharedSocketToken = null;
        activeConnections = 0;
      }
    };
  }, [accessToken]);

  const emitEvent = useCallback((event, data) => {
    if (!socketRef.current?.connected) {
      console.warn("Socket not connected");
      return;
    }

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
    if (!socketRef.current) {
      return () => {};
    }

    socketRef.current.on(event, callback);
    return () => socketRef.current?.off(event, callback);
  }, []);

  return {
    socket: socketRef.current,
    emitEvent,
    emitEventWithAck,
    onEvent,
  };
};