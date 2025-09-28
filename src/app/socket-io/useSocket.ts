"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socket) {
      const url = process.env.NEXT_PUBLIC_SOCKET_URL;
      const newSocket = io(url!, {
        withCredentials: true,
        transports: ["websocket", "polling"],
      });

      newSocket.on("connect", () => {
        console.log("✅ Socket connected:", newSocket.id);
      });

      newSocket.on("connect_error", (err) => {
        console.error("❌ Socket connect_error:", err.message, err);
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  return socket;
};
