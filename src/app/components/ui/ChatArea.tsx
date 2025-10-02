"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import React from "react";
import MessageArea from "./Message-area";
import FriendsProfile from "./FriendsProfile";
import { motion } from "motion/react";
import InputArea from "./InputArea";
import HeaderArea from "./HeaderArea";

interface ChatAreaProps {
  onToggleSidebar: () => void;
}

const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
  const { activeUser } = useAppSelector((state: RootState) => state.friend);

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] text-slate-100">
      {/* Header */}
      <HeaderArea
        onToggleSidebar={onToggleSidebar}
        selectedFriends={activeUser}
      />

      {/* Message area */}
      <div className="flex-1 overflow-y-auto bg-slate-900">
        <MessageArea />
      </div>

      {/* Input area */}
      <InputArea />
    </div>
  );
};

export default ChatArea;
