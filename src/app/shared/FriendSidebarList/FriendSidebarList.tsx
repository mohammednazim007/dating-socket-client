"use client";

import React, { useState, useCallback, memo } from "react";
import { User } from "@/app/types/auth";
import { FriendListProps } from "./interface";
import FriendListItem from "./FriendListItem";

const FriendSidebarList = ({
  friends,
  onlineUsers,
  onClick,
}: FriendListProps) => {
  const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

  const handleFriendClick = useCallback(
    (friend: User) => {
      setSelectedFriendId(friend?._id);
      onClick?.(friend);
    },
    [onClick]
  );

  return (
    <div className="flex flex-col">
      {friends?.map((friend) => {
        const isOnline = onlineUsers.includes(friend?._id);
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

export default memo(FriendSidebarList);
