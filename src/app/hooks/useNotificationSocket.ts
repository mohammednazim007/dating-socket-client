import { useEffect, useState, useCallback } from "react";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "@/app/socket-io/socket-io";
import { INotification } from "../types/notificationType";
import { useCurrentUserQuery } from "../redux/features/authApi/authApi";

export const useNotificationSocket = () => {
  const { data } = useCurrentUserQuery();
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const user = data?.user;

  // Connect socket when user exists
  useEffect(() => {
    if (!user?._id) return;

    const socketInstance = connectSocket(user._id);
    if (!socketInstance) return;

    // Listen for all notifications
    socketInstance.on("all_notifications", (data: INotification[]) => {
      setNotifications(data);
    });

    return () => {
      socketInstance.off("all_notifications");
      disconnectSocket();
      console.log("🔌 Socket disconnected");
    };
  }, [user?._id]);

  // Update unread count
  useEffect(() => {
    const count = notifications.reduce(
      (acc, notification) => acc + (notification.isRead ? 0 : 1),
      0
    );
    setUnreadCount(count);
  }, [notifications]);

  // Mark single notification as read
  const readSingleNotification = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
    );

    try {
      const socket = getSocket();
      socket.emit("read_single_notification", { notificationId: id });
    } catch {
      console.warn("Socket not initialized yet");
    }
  }, []);

  // Mark all notifications as read
  const markAllNotificationsRead = useCallback(() => {
    if (!user?._id) return;

    try {
      const socket = getSocket();
      socket.emit("read_all_notifications", { receiver_id: user._id });
    } catch {
      console.warn("Socket not initialized yet");
    }
  }, [user?._id]);

  return {
    notifications,
    unreadCount,
    readSingleNotification,
    markAllNotificationsRead,
  };
};
