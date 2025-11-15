"use client";
import { motion } from "motion/react";
import React from "react";
import ButtonIndicator from "../buttonIndicator/ButtonIndicator";

const initialProps = { opacity: 0, y: 30 };

const NoChatSelected = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col items-center justify-center h-full text-center text-slate-400 bg-slate-900 overflow-hidden p-6"
    >
      <div className="mb-4">
        <ButtonIndicator width={10} height={10} />
      </div>
      {/* Animated Title */}
      <motion.h2
        initial={initialProps}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-extrabold text-white tracking-tight"
      >
        Start the Conversation
      </motion.h2>

      {/* Animated Subtitle */}
      <motion.p
        initial={initialProps} // Inline initial state
        animate={{ opacity: 1, y: 0 }} // Inline animate state
        className="text-base mt-3 max-w-sm text-indigo-300 font-light"
      >
        Select a friend from your list on the left to begin your private chat.
      </motion.p>
    </motion.div>
  );
};

export default NoChatSelected;
