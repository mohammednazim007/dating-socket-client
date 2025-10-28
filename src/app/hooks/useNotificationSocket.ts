"use client";

import { useEffect, useState, useCallback } from "react";
import { connectSocket, disconnectSocket } from "@/app/socket-io/socket-io";
import { useAppSelector } from "@/app/hooks/hooks";
import { INotification } from "../types/notificationType";

export const useNotificationSocket = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [socket, setSocket] = useState<any>(null);

  // Connect socket when user exists
  useEffect(() => {
    if (!user?._id) return;

    const socketInstance = connectSocket(user._id);
    setSocket(socketInstance);

    // ✅ Listen for unread notifications
    socketInstance.on("unread_notifications", (data: INotification[]) => {
      console.log("📬 Unread notifications:", data);
      setNotifications(data);
    });

    // ✅ Listen for new friend requests or other notifications
    socketInstance.on("friend_request_received", (data: INotification) => {
      console.log("📩 Friend request received:", data);
      setNotifications((prev) => [data, ...prev]); // Add new notification to top
    });

    // ✅ Cleanup on unmount
    return () => {
      socketInstance.off("unread_notifications");
      socketInstance.off("friend_request_received");
      disconnectSocket();
      console.log("🔌 Socket disconnected");
    };
  }, [user?._id]);

  // ----------------- FUNCTIONS -----------------

  // Mark single notification as read
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );
    socket?.emit("notification_read", { id });
  }, []);

  // Mark all notifications as read
  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));

    // Notify backend
    socket?.emit("mark_as_read_all_notifications", { receiver_id: user?._id });
  }, [socket, user?._id]);

  // Optionally, add a new notification manually
  const addNotification = useCallback((notification: INotification) => {
    setNotifications((prev) => [notification, ...prev]);
  }, []);

  return {
    notifications,
    count: notifications.length,
    markNotificationRead,
    markAllNotificationsRead,
    addNotification,
  };
};
