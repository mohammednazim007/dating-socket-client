"use client";

import { useState, useEffect, useRef } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import avatar from "@/app/assets/profile.png";
import { useNotificationSocket } from "@/app/hooks/useNotificationSocket";
import timeAgo from "@/app/utility/timeAgo";

const Notification = () => {
  const {
    notifications,
    unreadCount,
    readSingleNotification,
    markAllNotificationsRead,
  } = useNotificationSocket();

  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showBadge = unreadCount > 0;
  const displayUnreadCount = unreadCount > 20 ? "20+" : unreadCount;

  return (
    <div className="relative" ref={popupRef}>
      {/* Notification Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition-all group text-white"
        aria-label="Notifications"
      >
        <IoMdNotificationsOutline
          size={22}
          className="group-hover:text-orange-400 transition-colors"
        />

        {showBadge && (
          <motion.span
            key={unreadCount} // animate when unreadCount changes
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute top-2 right-2 translate-x-1/2 -translate-y-1/2 px-1.5 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full min-w-[16px] text-center border border-gray-900"
          >
            {displayUnreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Popup */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-gray-900 shadow-2xl rounded-md border border-gray-800 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-gray-700">
              <span className="text-white font-semibold text-lg">
                Notifications
              </span>
              <button
                className="text-gray-400 text-xs hover:text-orange-400 transition-colors font-medium cursor-pointer"
                onClick={markAllNotificationsRead}
              >
                Mark all as read
              </button>
            </div>

            {/* Notification List */}
            {notifications.length ? (
              notifications.map((item) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => readSingleNotification(item._id)}
                  className={`flex items-start gap-3 p-3 border-b cursor-pointer transition hover:bg-gray-800 ${
                    !item.isRead ? "bg-gray-800" : ""
                  }`}
                >
                  <div className="relative">
                    <Image
                      src={item.avatar || avatar.src}
                      alt="avatar"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    {!item.isRead && (
                      <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-gray-900"></span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-100 font-medium">
                      {item?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-100 truncate">
                      {item.message}
                    </p>
                    <span className="text-xs text-gray-400">
                      {timeAgo(item.createdAt)}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="p-4 text-sm text-gray-400 text-center">
                No new notifications
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
