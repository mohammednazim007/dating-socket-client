"use client";
import React from "react";
import { motion } from "motion/react";

const InputArea = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-2 border-t border-slate-700 bg-slate-800 flex gap-3"
    >
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
      />
      <button className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium shadow">
        Send
      </button>
    </motion.div>
  );
};

export default InputArea;
