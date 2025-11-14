import { useEffect, useState, useCallback } from "react";

/**
 * Reusable countdown timer hook for OTPs
 * @param initialTimeSeconds number of seconds to count down from (default 300 = 5min)
 */
export const useOtpTimer = (initialTimeSeconds: number = 300) => {
  const [timeLeft, setTimeLeft] = useState(initialTimeSeconds);

  // Start countdown
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  // Reset timer
  const resetTimer = useCallback(() => {
    setTimeLeft(initialTimeSeconds);
  }, [initialTimeSeconds]);

  // Format MM:SS
  const formatTime = useCallback((seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }, []);

  return { timeLeft, resetTimer, formatTime };
};
