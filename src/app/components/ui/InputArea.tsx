"use client";
import { motion } from "motion/react";
import { FiSend, FiImage, FiSmile, FiX, FiEdit3 } from "react-icons/fi";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useEmojiPicker } from "@/app/hooks/useEmojiPicker";
import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import api from "@/app/lib/axios";
import { useState } from "react";
import { getSocket } from "@/app/socket-io/socket-io";
import { RootState } from "@/app/redux/store";
import { sendMessage } from "@/app/utility/sendMessage";

const InputArea = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { activeUser } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state: RootState) => state.auth.user); // Assuming you store current user

  const { pickerRef, setShowEmojiPicker, showEmojiPicker } = useEmojiPicker();
  const isSendEnabled = message.trim().length > 0 || image !== null;
  const socket = getSocket();

  // Add selected emoji into the message input
  const handleEmojiSelect = (emoji: any) =>
    setMessage((prev) => prev + emoji.native);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // ** Handle Send Message
  const handleSubmit = () => {
    if (!currentUser || !activeUser) return;

    dispatch(
      sendMessage({
        sender_id: currentUser._id,
        receiver_id: activeUser._id,
        text: message,
        media: image || undefined,
      })
    );

    setMessage("");
    setImage(null);
    handleBlur();
  };

  // ** typing indicator ==== HTMLInputElement
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (socket && activeUser && currentUser) {
      socket.emit("typing", {
        sender_id: currentUser._id,
        receiver_id: activeUser._id,
      });
    }
  };

  // ** stop typing on blur
  const handleBlur = () => {
    if (socket && activeUser && currentUser) {
      socket.emit("stop_typing", {
        sender_id: currentUser._id,
        receiver_id: activeUser._id,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative p-[7px] px-3 border-t border-slate-700 bg-slate-800 flex flex-col"
    >
      {/* Preview Section - Floating */}
      {image && (
        <div className="absolute -top-16 left-2 w-fit max-w-xs inline-flex items-center gap-3 px-3 py-2 bg-slate-900 rounded-lg border border-slate-700 shadow-lg">
          <div className="relative">
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="h-12 w-12 object-cover rounded-lg border border-slate-600"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 p-1 bg-red-600 rounded-full text-white hover:bg-red-700"
            >
              <FiX size={12} />
            </button>
          </div>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div ref={pickerRef} className="absolute bottom-14 left-2 z-50">
          <Picker data={data} onEmojiSelect={handleEmojiSelect} theme="dark" />
        </div>
      )}

      {/* Input Controls */}
      <div className="flex items-center gap-2">
        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="p-2 rounded-lg hover:bg-slate-700 transition text-slate-300 relative"
        >
          <FiSmile size={20} />
        </button>

        {/* Image Upload Button */}
        <label className="p-2 rounded-lg hover:bg-slate-700 transition text-slate-300 cursor-pointer">
          <FiImage size={20} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>

        {/* Input Box */}
        {/* <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
          onBlur={handleBlur}
          className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        /> */}
        <textarea
          rows={1}
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (isSendEnabled) handleSubmit();
            }
          }}
          className="flex-1 resize-none px-4 py-2 rounded-lg bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />

        {/* Send Button */}
        <button
          disabled={!isSendEnabled}
          onClick={handleSubmit}
          className={`p-3 rounded-lg transition shadow flex items-center justify-center 
            ${
              isSendEnabled
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-slate-700 text-slate-500 cursor-not-allowed"
            }`}
        >
          <FiSend size={18} />
        </button>
      </div>
    </motion.div>
  );
};

export default InputArea;
