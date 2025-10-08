"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useSocket } from "@/app/hooks/useChatSocket";
import { TypingIndicator } from "@/app/shared/TypingIndicator/TypingIndicator";
import { connectSocket, getSocket } from "@/app/socket-io/socket-io";
import { fetchChatHistory } from "@/app/utility/fetchChatHistory";
import Image from "next/image";
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
      <div className="container mx-auto flex flex-col gap-4 p-4 bg-slate-900 w-full ">
        {chat?.map((msg, i) => {
          const isSender = msg.sender_id === currentUser?._id;
          const isActiveUser = activeUser && activeUser?._id === msg?.sender_id;

          return (
            <div
              key={i}
              className={`flex items-start ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              {/* For received messages, show avatar on the left */}
              {!isSender && isActiveUser && (
                <div className="border-[1px] border-b-blue-200 w-9 h-9 rounded-full mr-2">
                  <Image
                    width={200}
                    height={200}
                    src={activeUser?.avatar || ""}
                    alt="avatar"
                    priority={true}
                    className="rounded-full p-[2px]"
                  />
                </div>
              )}

              <div
                className={`p-3 rounded-lg text-balance break-words
    ${isSender ? "bg-blue-600 text-white" : "bg-slate-700 text-gray-100"}
    max-w-[50%] sm:max-w-[65%]`}
              >
                {msg.text && <p className="text-sm break-words">{msg.text}</p>}
              </div>

              {/* For sent messages, optionally show your own avatar */}
              {msg.media && (
                <Image
                  width={200}
                  height={200}
                  src={msg?.media || ""}
                  alt="avatar"
                  className="w-8 h-8 rounded-full ml-2"
                />
              )}
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
