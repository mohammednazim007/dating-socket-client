"use client";

import { useEffect, useState, useCallback } from "react";
import { connectSocket, disconnectSocket } from "@/app/socket-io/socket-io";
import { useAppSelector } from "@/app/hooks/hooks";
import { INotification } from "../types/notificationType";

export const useNotificationSocket = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [socket, setSocket] = useState<any>(null);

  // Connect socket when user exists
  useEffect(() => {
    if (!user?._id) return;

    const socketInstance = connectSocket(user._id);
    setSocket(socketInstance);

    // ✅ Listen for all notifications

    socketInstance.on("all_notifications", (data: INotification[]) => {
      setNotifications(data);
      console.log("📬 All notifications:", data);
    });

    // ✅ Cleanup on unmount
    return () => {
      socketInstance.off("all_notifications");
      disconnectSocket();
      console.log("🔌 Socket disconnected");
    };
  }, [user?._id]);

  // ----------------- FUNCTIONS -----------------
  // unread count calculation
  useEffect(() => {
    const count = notifications?.reduce(
      (acc, notification) => acc + (notification.isRead ? 0 : 1),
      0
    );
    setUnreadCount(count);
  }, [notifications]);

  // Mark single notification as read
  const readSingleNotification = useCallback(
    (id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      socket?.emit("read_single_notification", { notificationId: id });
    },
    [socket]
  );

  // Mark all notifications as read
  const markAllNotificationsRead = useCallback(() => {
    // Notify backend
    socket?.emit("read_all_notifications", { receiver_id: user?._id });
  }, [socket, user?._id]);

  return {
    notifications,
    unreadCount,
    readSingleNotification,
    markAllNotificationsRead,
  };
};
