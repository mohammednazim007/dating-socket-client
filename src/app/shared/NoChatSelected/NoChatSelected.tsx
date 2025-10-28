"use client";
import { motion } from "motion/react";
import { FiMessageCircle } from "react-icons/fi";
import React from "react";

const NoChatSelected = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center h-full text-center text-slate-400 bg-slate-900"
    >
      <FiMessageCircle size={60} className="mb-4 text-slate-500" />
      <h2 className="text-xl font-semibold text-slate-200">No Chat Selected</h2>
      <p className="text-sm mt-2 text-slate-400">
        Choose a friend from the sidebar to start messaging.
      </p>
    </motion.div>
  );
};

export default NoChatSelected;
