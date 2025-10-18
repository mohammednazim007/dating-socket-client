"use client";
import { useAppDispatch } from "@/app/hooks/hooks";
import { useGetFriendsQuery } from "@/app/redux/features/friends/friendApi";
import UserActionButtons from "@/app/shared/UserButtonCard/UserActionButtons";
import { User } from "@/app/types/auth";
import { formatLastSeenTime } from "@/app/utility/formatLastSeenTime";
import { getFriends } from "@/app/utility/getFriends";
import Image from "next/image";
import { useEffect, useState } from "react";

const NonFriendList = () => {
  const [selectId, setSelectedId] = useState<string>();

  // Use the friends data from the Redux store
  const { data, isLoading } = useGetFriendsQuery();
  const dispatch = useAppDispatch();

  const handleSelected = (id: string) => setSelectedId(id);

  // useEffect(() => {
  //   dispatch(getFriends());
  // }, [dispatch]);

  // Handle loading state
  if (isLoading) {
    return <div className="p-4 text-center text-white">Loading Friends...</div>;
  }

  // Handle empty state
  if (!data || data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">No friends found.</div>
    );
  }
  console.log("data", data);

  return (
    <div className="flex flex-col divide-y divide-slate-700">
      {/* FIX: Map over the 'friends' state from Redux, not 'nonFriends' */}
      {data?.map((user: User) => (
        <div
          onClick={() => handleSelected(user._id)}
          key={user._id}
          className={`flex justify-between items-center p-3 
            rounded-md cursor-pointer
            transition-colors duration-200 hover:bg-slate-700/50
            ${selectId === user._id ? "bg-slate-700 hover:bg-slate-700/50" : ""}
          `}
        >
          {/* START: WRAPPER FOR AVATAR AND NAME */}
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* 1. Avatar Indicator */}
            <div className="relative flex-shrink-0">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-50">
                {user.avatar ? (
                  <div>
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      // FIX: Set appropriate Image dimensions (w-10 h-10 is 40px)
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            </div>

            {/* 2. User Info (Name) */}
            <div className="flex-1 min-w-0">
              <h2 className="text-sm font-semibold text-white truncate">
                {user.name || "Unknown"}
              </h2>
              <p className={`text-xs text-gray-400`}>
                {/* Note: This assumes the friend object has a lastActive property */}
                {formatLastSeenTime(user.lastActive)}
              </p>
            </div>
          </div>

          {/* UserActionButtons component */}
          <UserActionButtons user={user} />
        </div>
      ))}
    </div>
  );
};

export default NonFriendList;
