"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import UserProfile from "../ui/User-profile";
import useFriendListUser from "@/app/hooks/useActiveUser";
import { setActiveUser } from "@/app/redux/features/friend-slice/friendSlice";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const currentUser = useAppSelector((state: RootState) => state.auth);
  const { activeFriendUsers } = useFriendListUser(currentUser?.user?._id || "");
  const dispatch = useAppDispatch();

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
          <button className="text-blue-400 font-semibold hover:text-blue-300 transition">
            Direct
          </button>
          <button className="text-slate-400 hover:text-white transition">
            Group
          </button>
          <button className="text-slate-400 hover:text-white transition">
            Public
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

        {/* Chat Users */}
        <div className="flex-1 overflow-y-auto">
          {activeFriendUsers?.length ? (
            activeFriendUsers.map((friend) => (
              <motion.div
                key={friend._id}
                onClick={() => dispatch(setActiveUser(friend))}
                className="flex items-center gap-3 p-3 hover:bg-slate-700 cursor-pointer transition rounded-lg mx-2 my-1"
                whileHover={{ scale: 1.02 }}
              >
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  {friend?.avatar ? (
                    <Image
                      width={40}
                      height={40}
                      src={friend.avatar}
                      alt="Avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center text-white">
                      {friend?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">
                    {friend?.name || "Unknown User"}
                  </p>
                  <p className="text-xs text-slate-400 transition-all">
                    View chat
                  </p>
                </div>

                {/* Time placeholder */}
                <span className="text-xs text-slate-400">10:00pm</span>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-slate-400 p-4">No friends found</p>
          )}
        </div>

        {/* Profile + Sign Out */}
        {currentUser?.user && (
          <div className="p-2 border-t border-slate-700 flex items-center justify-between gap-2 bg-slate-900">
            <UserProfile currentUser={currentUser.user} isDisable={false} />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default Sidebar;
