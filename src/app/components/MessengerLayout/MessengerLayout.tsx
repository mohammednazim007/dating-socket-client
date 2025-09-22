"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "../ui/Sidebar";
import ChatArea from "../ui/ChatArea";

const MessengerLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ✅ Responsive behavior
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    setIsSidebarOpen(mediaQuery.matches);

    // Listener for resize
    const handleResize = (e: MediaQueryListEvent) => {
      setIsSidebarOpen(e.matches); // true on desktop, false on mobile
    };

    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Sidebar with animation */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed md:static z-40 h-full"
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatArea onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      </div>
    </div>
  );
};

export default MessengerLayout;
