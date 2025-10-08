"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useSocket } from "@/app/hooks/useChatSocket";
import { TypingIndicator } from "@/app/shared/TypingIndicator/TypingIndicator";
import { getSocket } from "@/app/socket-io/socket-io";
import { fetchChatHistory } from "@/app/utility/fetchChatHistory";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

// Fallback avatar path for safety
const DEFAULT_AVATAR = "/default-avatar.png";

const MessageArea = () => {
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useAppDispatch();
  const { activeUser, chat } = useAppSelector((state) => state.friend);
  const currentUser = useAppSelector((state) => state.auth.user);

  // ... (Hooks and useEffects remain the same) ...
  useSocket(currentUser?._id || "");
  const messageEndRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  return (
    // Ensure the main container doesn't overflow
    <div className="flex flex-col flex-1 min-h-0 bg-slate-900 w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full py-4 space-y-3 min-h-0">
        {chat?.map((msg, i) => {
          const isSender = msg.sender_id === currentUser?._id;
          const isActiveUser = activeUser && activeUser?._id === msg?.sender_id;

          return (
            // Outer container for the whole message row, with padding applied here
            <div
              key={i}
              className={`flex items-start px-3 sm:px-6 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* Receiver avatar on the left */}
              {!isSender && isActiveUser && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  <Image
                    width={36}
                    height={36}
                    src={activeUser?.avatar || DEFAULT_AVATAR}
                    alt="Receiver avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              {/* ✅ Conditional rendering for text or media messages */}
              {msg.text && ( // If it's a text message, render the text bubble
                <div
                  className={`
                    p-3 rounded-lg text-balance 
                    ${
                      isSender
                        ? "bg-blue-600 text-white"
                        : "bg-slate-700 text-gray-100"
                    }
                    max-w-[80%] sm:max-w-[65%] lg:max-w-[50%] 
                  `}
                >
                  <p className="text-sm break-all">{msg.text}</p>
                </div>
              )}

              {msg.media && (
                <div
                  className={`
                    
                    max-w-[80%] sm:max-w-[65%] lg:max-w-[50%] 
                    rounded-lg border border-gray-600 p-1
                    ${isSender ? "ml-auto" : ""}
                  `}
                >
                  <Image
                    width={250}
                    height={200}
                    src={msg.media}
                    alt="media"
                    className="rounded-md max-w-full h-auto object-cover"
                  />
                </div>
              )}

              {/* Sender avatar on the right */}
              {isSender && (
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ml-2 flex-shrink-0">
                  <Image
                    width={36}
                    height={36}
                    src={currentUser?.avatar || DEFAULT_AVATAR}
                    alt="Sender avatar"
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        <div className="px-3 sm:px-6">
          <TypingIndicator isTyping={isTyping} name={activeUser?.name} />
        </div>

        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default MessageArea;
