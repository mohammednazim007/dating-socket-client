"use client";
import React, { useState, useCallback, memo } from "react";
import Image from "next/image";
import { User } from "@/app/types/auth";
import { FriendListItemProps, FriendListProps } from "./interface";

const FriendList = ({ friends, onlineUsers, onClick }: FriendListProps) => {
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  const handleFriendClick = useCallback(
    (friend: User) => {
      setSelectedFriendId(friend._id);
      onClick?.(friend); // optional chaining is cleaner
    },
    [onClick]
  );

  return (
    <div className="flex flex-col">
      {friends?.map((friend) => {
        const isOnline = onlineUsers.includes(friend._id);
        const isSelected = friend._id === selectedFriendId;

        return (
          <FriendListItem
            key={friend._id}
            friend={friend}
            isOnline={isOnline}
            isSelected={isSelected}
            onClick={handleFriendClick}
          />
        );
      })}
    </div>
  );
};

const FriendListItem = memo(
  ({ friend, isOnline, isSelected, onClick }: FriendListItemProps) => {
    const baseClasses =
      "flex items-center gap-3 p-3 cursor-pointer transition rounded-lg mx-2 my-[3px]";
    const selectionClasses = isSelected ? "bg-slate-700" : "hover:bg-slate-700";

    return (
      <div
        onClick={() => onClick(friend)}
        className={`${baseClasses} ${selectionClasses}`}
      >
        {/* Avatar + Online Indicator */}
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-50">
            {friend.avatar ? (
              <Image
                src={friend.avatar}
                alt={friend.name}
                width={400}
                height={400}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white">
                {friend.name?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
          </div>

          <span
            className={`absolute bottom-2 right-0 w-3 h-3 rounded-full border-2 border-slate-900 z-50 translate-x-1 translate-y-1 ${
              isOnline ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
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
  }
);

FriendListItem.displayName = "FriendListItem";
export default FriendList;
