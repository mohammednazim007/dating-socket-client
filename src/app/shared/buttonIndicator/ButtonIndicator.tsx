"use client";
import { motion } from "motion/react";

interface ButtonIndicatorProps {
  width?: number;
  height?: number;
  text?: string;
}

const COLORS = ["#ECF4E8", "#6E8CFB", "#9ECFD4"];

const ButtonIndicator: React.FC<ButtonIndicatorProps> = ({
  width = 15,
  height = 15,
  text,
}) => {
  return (
    <div className="flex items-center gap-2 text-xs px-2 py-1 justify-center">
      {text && (
        <span className="text-sm font-medium text-slate-200">{text}</span>
      )}
      {COLORS.map((color, i) => (
        <motion.span
          key={i}
          className="rounded-full inline-block"
          style={{
            width,
            height,
            backgroundColor: color,
            filter: "var(--indicator-brightness, brightness(1))",
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      <style jsx global>{`
        :root {
          --indicator-brightness: brightness(1);
        }
        .dark {
          --indicator-brightness: brightness(0.8);
        }
      `}</style>
    </div>
  );
};

export default ButtonIndicator;
