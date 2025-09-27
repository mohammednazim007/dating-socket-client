"use client";
import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000";

export const useSocket = () => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(SOCKET_URL, {
        withCredentials: true,
        transports: ["websocket"],
      });
    }

    return () => {
      socket.current?.disconnect();
    };
  }, []);

  return socket.current;
};
