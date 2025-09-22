"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import SignOutButton from "./Sign-out";
import UserProfile from "../ui/User-profile";
import useFriendListUser from "@/app/hooks/useActiveUser";
import { setActiveUser } from "@/app/redux/features/friend-slice/friendSlice";
import Image from "next/image";

const Sidebar = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth);
  const { activeFriendUsers } = useFriendListUser(currentUser?.user?._id || "");
  const dispatch = useAppDispatch();

  console.log("currentUser:", currentUser);

  return (
    <div className="w-80 bg-[#1e293b] border-r border-gray-700 flex flex-col">
      {/* Tabs */}
      <div className="flex justify-around py-4 border-b border-gray-600">
        <button className="text-blue-400 font-semibold">Direct</button>
        <button className="text-gray-400 hover:text-white">Group</button>
        <button className="text-gray-400 hover:text-white">Public</button>
      </div>

      {/* Search */}
      <div className="p-3">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-lg bg-[#334155] px-3 py-2 text-sm outline-none"
        />
      </div>

      {/* Chat Users */}
      <div className="flex-1 overflow-y-auto">
        {activeFriendUsers?.length ? (
          activeFriendUsers.map((activeFriend) => (
            <div
              onClick={() => dispatch(setActiveUser(activeFriend))}
              key={activeFriend._id} // better to use unique id instead of index
              className="flex items-center gap-3 p-3 hover:bg-[#334155] cursor-pointer"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                {activeFriend?.avatar ? (
                  <Image
                    width={40}
                    height={40}
                    src={activeFriend.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center text-white">
                    {activeFriend?.name?.charAt(0) || "U"}
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <p className="text-sm font-semibold">
                  {activeFriend?.name || "Unknown User"}
                </p>
                <p className="text-xs text-gray-400 hover:tracking-tight transition-all">
                  View chat
                </p>
              </div>

              {/* Time (placeholder for now) */}
              <span className="text-xs text-gray-400">10:00pm</span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 p-4">No friends found</p>
        )}
      </div>

      {/* Profile + Sign Out */}
      {currentUser?.user && (
        <div className="p-2 border-t border-gray-700 flex items-center justify-between gap-2">
          {/* Profile (Avatar Button) */}
          <UserProfile currentUser={currentUser.user} isDisable={false} />

          {/* Sign Out (Circle Icon Button) */}
          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
