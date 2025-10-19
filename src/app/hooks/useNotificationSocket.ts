"use client";

import { useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "@/app/socket-io/socket-io";
import { useAppSelector } from "@/app/hooks/hooks";
import { INotification } from "../types/notificationType";

export const useNotificationSocket = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [notifications, setNotifications] = useState<INotification[]>([]);

  useEffect(() => {
    if (!user?._id) return;

    const socket = connectSocket(user._id);
    console.log("🔌 Connected socket for user:", user._id);

    // ✅ Listen for unread notifications
    socket.on("unread_notifications", (data: INotification[]) => {
      console.log("📬 Unread notifications:", data);
      setNotifications(data);
      console.log("un read", data);
    });

    // ✅ Listen for new friend requests
    socket.on("friend_request_received", (data: { message: string }) => {
      console.log("📩 Friend request:", data);
      // You could add toast or play a sound here
      alert(data.message);
    });

    // ✅ Cleanup
    return () => {
      socket.off("unread_notifications");
      socket.off("friend_request_received");
      disconnectSocket();
      console.log("🔌 Socket disconnected");
    };
  }, [user?._id]);

  return { notifications, count: notifications.length };
};
