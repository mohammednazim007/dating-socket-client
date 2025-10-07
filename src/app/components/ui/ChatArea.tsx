"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import React, { useEffect, useRef } from "react";
import MessageArea from "./Message-area";
import InputArea from "./InputArea";
import HeaderArea from "./HeaderArea";
import NoChatSelected from "./NoChatSelected";

interface ChatAreaProps {
  onToggleSidebar: () => void;
}

const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
  const { activeUser, chat } = useAppSelector(
    (state: RootState) => state.friend
  );
  // const { user } = useAppSelector((state: RootState) => state.auth);

  // ✅ Auto scroll ref
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // ✅ Scroll to bottom whenever chat updates
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  return (
    <div className="flex flex-col h-full bg-[#0f172a] text-slate-100">
      {/* Header */}
      {
        <HeaderArea
          onToggleSidebar={onToggleSidebar}
          selectedFriends={activeUser}
        />
      }

      {/* Message area */}
      <div className="flex-1 overflow-y-auto bg-slate-900">
        {!activeUser ? (
          <NoChatSelected /> // 👈 Show placeholder when no user selected
        ) : (
          <>
            <MessageArea />
            <div ref={messageEndRef} />
          </>
        )}
      </div>

      {/* Input area */}
      {activeUser && <InputArea />}
    </div>
  );
};

export default ChatArea;
