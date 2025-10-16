"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import UserProfile from "../ui/User-profile";
import useFriendListUser from "@/app/hooks/useFriendList";
import { motion, AnimatePresence } from "motion/react";
import { setActiveUser } from "@/app/redux/features/friend-slice/message-user-slice";
import FriendList from "@/app/shared/Friend-List/FriendList";
import { CiSettings } from "react-icons/ci";
import { useRouter } from "next/navigation";
import FriendListSkeleton from "@/app/shared/FriendListSkeleton/FriendListSkeleton";
import { useState } from "react";
import NonFriendList from "./NonFriendList";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<"chat" | "friends">("chat");

  const currentUser = useAppSelector((state: RootState) => state.auth);
  const { activeFriendUsers, isLoading } = useFriendListUser(
    currentUser?.user?._id || ""
  );
  const { onlineUsers } = useAppSelector((state: RootState) => state.friend);
  const dispatch = useAppDispatch();

  const route = useRouter();

  // ** Handle friend to add active user
  const handleClick = (friend: any) => {
    dispatch(setActiveUser(friend));

    // Only close sidebar on mobile (width < 768px)
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  // ** handle routes
  const handleRouteClick = () => route.push("/profile");
  const handleAddFriend = (user: any) => {
    console.log("Add friend clicked:", user);
    // TODO: call your backend / dispatch Redux action
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="w-72 md:w-80 bg-slate-800 text-slate-100 border-r border-slate-700 flex flex-col h-full"
      >
        {/* Mobile Close Button */}
        <div className="md:hidden flex justify-end p-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 transition"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex justify-around py-4 border-b border-slate-700">
          <button
            onClick={() => setActiveTab("chat")}
            className={`font-semibold transition ${
              activeTab === "chat"
                ? "text-blue-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab("friends")}
            className={`font-semibold transition ${
              activeTab === "friends"
                ? "text-blue-400"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Friends
          </button>
        </div>

        {/* Search */}
        <div className="p-3">
          <input
            type="text"
            placeholder="Search"
            className="w-full rounded-lg bg-slate-700 px-3 py-2 text-sm placeholder-slate-400 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Friend list profile */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <FriendListSkeleton count={6} />
          ) : activeTab === "chat" ? (
            activeFriendUsers?.length ? (
              <FriendList
                friends={activeFriendUsers}
                onlineUsers={onlineUsers}
                onClick={handleClick}
              />
            ) : (
              <p className="text-center text-slate-400 p-4">No friends found</p>
            )
          ) : (
            <NonFriendList
              currentUserId={currentUser?.user?._id}
              onAddFriend={handleAddFriend}
            />
          )}
        </div>

        {/* Profile + Sign Out */}
        {currentUser?.user && (
          <div className="p-2 border-t border-slate-700 flex items-center justify-between gap-2 bg-slate-900 ">
            <UserProfile
              currentUser={currentUser.user}
              isTimeAvailable={false}
            />
            <CiSettings
              onClick={() => handleRouteClick()}
              size={29}
              className="hover:animate-spin"
            />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
