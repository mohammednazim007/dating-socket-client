import { useState, useRef, useEffect } from "react";

export const useEmojiPicker = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePicker = () => setShowEmojiPicker((prev) => !prev);

  return { showEmojiPicker, togglePicker, pickerRef, setShowEmojiPicker };
};
