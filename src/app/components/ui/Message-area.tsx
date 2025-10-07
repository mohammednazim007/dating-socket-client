"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useSocket } from "@/app/hooks/useChatSocket";
import { TypingIndicator } from "@/app/shared/TypingIndicator/TypingIndicator";
import { connectSocket, getSocket } from "@/app/socket-io/socket-io";
import { fetchChatHistory } from "@/app/utility/fetchChatHistory";
import React, { useEffect, useRef, useState } from "react";

const MessageArea = () => {
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useAppDispatch();
  const { activeUser, chat } = useAppSelector((state) => state.friend);
  const currentUser = useAppSelector((state) => state.auth.user);

  // ✅ Connect socket and listen for events
  useSocket(currentUser?._id || "");
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Fetch chat history when active user changes
  useEffect(() => {
    if (currentUser && activeUser) {
      dispatch(
        fetchChatHistory({
          sender_id: currentUser._id,
          receiver_id: activeUser._id,
        })
      );
    }
  }, [currentUser, activeUser, dispatch]);

  // ✅ Listen for incoming messages typing indicator
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !currentUser || !activeUser) return;

    socket.on("user_typing", (senderId: string) => {
      if (senderId === activeUser._id) setIsTyping(true);
    });

    socket.on("user_stop_typing", (senderId: string) => {
      if (senderId === activeUser._id) setIsTyping(false);
    });

    return () => {
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [activeUser, currentUser]);

  // ✅ Scroll to bottom whenever chat updates
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat, isTyping]);

  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-slate-900">
        {chat?.map((msg, i) => {
          const isSender = msg.sender_id === currentUser?._id;
          return (
            <div
              key={i}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-sm p-3 rounded-lg ${
                  isSender
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-gray-100"
                }`}
              >
                {msg.text && <p className="text-sm">{msg.text}</p>}
                {msg.media && (
                  <img
                    src={msg.media}
                    alt="media"
                    className="rounded-lg mt-2 max-h-48"
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Typing Indicator */}
        <TypingIndicator isTyping={isTyping} name={activeUser?.name} />
        <div ref={messageEndRef} />
      </div>
    </>
  );
};

export default MessageArea;
