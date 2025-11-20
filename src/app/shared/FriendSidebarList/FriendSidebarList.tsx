// "use client";

// import React, { useState, useCallback, memo } from "react";
// import { User } from "@/app/types/auth";
// import { FriendListProps } from "./interface";
// import FriendListItem from "./FriendListItem";

// const SidebarFriendList = ({
//   friends,
//   onlineUsers,
//   onClick,
// }: FriendListProps) => {
//   const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);

//   const handleFriendClick = useCallback(
//     (friend: User) => {
//       setSelectedFriendId(friend?._id);
//       onClick?.(friend);
//     },
//     [onClick]
//   );

//   return (
//     <div className="flex flex-col space-y-1.5 pb-4">
//       {friends?.map((friend) => {
//         const isOnline = onlineUsers.includes(friend?._id);
//         const isSelected = friend._id === selectedFriendId;

//         return (
//           <FriendListItem
//             key={friend._id}
//             friend={friend}
//             isOnline={isOnline}
//             isSelected={isSelected}
//             onClick={handleFriendClick}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default memo(SidebarFriendList);

"use client";

import React, { useCallback, memo } from "react";
import { User } from "@/app/types/auth";
import { FriendListProps } from "./interface";
import FriendListItem from "./FriendListItem";
import { useAppSelector } from "@/app/hooks/hooks";

const SidebarFriendList = ({
  friends,
  onlineUsers,
  onClick,
}: FriendListProps) => {
  const { activeUser } = useAppSelector((state) => state.user);

  const handleFriendClick = useCallback(
    (friend: User) => {
      onClick?.(friend);
    },
    [onClick]
  );

  return (
    <div className="flex flex-col space-y-1.5 pb-4">
      {friends?.map((friend) => {
        const isOnline = onlineUsers.includes(friend._id);
        const isSelected = activeUser?._id === friend._id;

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

export default memo(SidebarFriendList);
