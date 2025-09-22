"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import React from "react";
import MessageArea from "./Message-area";
import FriendsProfile from "./FriendsProfile";

interface ChatAreaProps {
  onToggleSidebar: () => void;
}

const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
  const friends = useAppSelector((state: RootState) => state.friend);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#1e293b]">
        <div className="flex items-center gap-x-2">
          {/* Mobile toggle button */}
          <button
            onClick={onToggleSidebar}
            className="md:hidden px-3 py-1 rounded-lg bg-[#334155] hover:bg-[#475569]"
          >
            ☰
          </button>

          <FriendsProfile
            currentFriends={friends?.activeUser}
            isDisable={true}
          />
          <span>
            <p className="font-semibold">{friends?.activeUser?.name}</p>
            <p className="text-xs text-gray-400">Last seen 10:20pm</p>
          </span>
        </div>
        <button className="p-2 hover:bg-[#334155] rounded-lg">⋮</button>
      </div>

      {/* Message area */}
      <MessageArea />

      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-[#1e293b] flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-lg bg-[#334155] px-3 py-2 text-sm outline-none"
        />
        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
