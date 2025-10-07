"use client";
import { motion, AnimatePresence } from "motion/react";

interface TypingIndicatorProps {
  isTyping: boolean;
  name?: string;
}

export const TypingIndicator = ({ isTyping, name }: TypingIndicatorProps) => {
  return (
    <AnimatePresence>
      {isTyping && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-gray-400 text-sm italic mt-2"
        >
          <span>{name ? `${name} is typing` : "Someone is typing"}</span>
          <div className="flex items-center gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 bg-gray-400 rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
