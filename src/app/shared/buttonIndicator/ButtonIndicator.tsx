"use client";
import { motion } from "motion/react";

interface ButtonIndicatorProps {
  withText?: number;
  heightText?: number;
}

const COLORS = ["#ECF4E8", "#6E8CFB", "#9ECFD4"];

const ButtonIndicator: React.FC<ButtonIndicatorProps> = ({
  withText = 2,
  heightText = 2,
}) => {
  return (
    <div className="flex items-center gap-1.5">
      {COLORS.map((color, i) => (
        <motion.span
          key={i}
          className={`rounded-full w-${withText} h-${heightText}`}
          style={{
            backgroundColor: color,
            // Slight transparency in dark mode
            filter: "var(--indicator-brightness, brightness(1))",
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.5,
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
