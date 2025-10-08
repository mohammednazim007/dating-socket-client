"use client";
import React from "react";
import Image from "next/image";
import { IFriend } from "@/app/types/friend.types";

interface UserCharProfileProps {
  friends: IFriend[];
  onlineUsers: string[];
  onClick?: (friend: IFriend) => void;
}

const FriendList = ({
  friends,
  onlineUsers,
  onClick,
}: UserCharProfileProps) => {
  return (
    <div className="flex flex-col">
      {friends.map((friend) => {
        const isOnline = onlineUsers.includes(friend._id);

        return (
          <div
            key={friend._id}
            onClick={() => onClick && onClick(friend)}
            className="flex items-center gap-3 p-3 hover:bg-slate-700 cursor-pointer transition rounded-lg mx-2 my-1"
          >
            {/* Avatar + Online Indicator */}
            <div className="relative w-10 h-10">
              {friend.avatar ? (
                <Image
                  src={friend.avatar}
                  alt={friend.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white">
                  {friend.name?.charAt(0).toUpperCase() || "U"}
                </div>
              )}

              {isOnline && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {friend.name || "Unknown"}
              </p>
              <p className="text-xs text-slate-400">
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;
