import { useEffect, useRef, useCallback } from 'react';
import io from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5995';

export const useSocket = () => {
  const socketRef = useRef(null);
  const reconnectAttempts = useRef(0);
  const MAX_RECONNECT = 5;

  useEffect(() => {
    // Initialize socket
    socketRef.current = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: MAX_RECONNECT,
      transports: ['websocket', 'polling'],
      withCredentials: true,
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected:', socketRef.current.id);
      reconnectAttempts.current = 0;
    });

    socketRef.current.on('connect_error', (error) => {
      console.error('Socket error:', error);
    });

    socketRef.current.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const emitEvent = useCallback((event, data) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit(event, data);
    } else {
      console.warn('Socket not connected');
    }
  }, []);

  const onEvent = useCallback((event, callback) => {
    socketRef.current?.on(event, callback);
    return () => socketRef.current?.off(event, callback);
  }, []);

  return {
    socket: socketRef.current,
    emitEvent,
    onEvent
  };
};