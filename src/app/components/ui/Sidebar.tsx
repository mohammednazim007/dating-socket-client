"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import UserProfile from "../ui/User-profile";
import { motion, AnimatePresence } from "motion/react";
import { setActiveUser } from "@/app/redux/features/user-slice/message-user-slice";
import FriendList from "@/app/shared/FriendSidebarList/FriendSidebarList";
import { CiSettings } from "react-icons/ci";
import { useRouter } from "next/navigation";
import FriendListSkeleton from "@/app/shared/FriendListSkeleton/FriendListSkeleton";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import NonFriendList from "./NonFriendList";
import { useGetAcceptedFriendsQuery } from "@/app/redux/features/friends/friendApi";
import SidebarTabs from "@/app/shared/SidebarTabs/SidebarTabs";
import { debounce } from "@/app/utility/debounce";
import { useFilteredFriends } from "@/app/hooks/useFilteredFriends";
interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const [activeTab, setActiveTab] = useState<"chat" | "friends">("friends");
  const [inputValue, setInputValue] = useState(""); // ✅ back, but lightweight
  const [searchTerm, setSearchTerm] = useState(""); // ✅ used for filtering

  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetAcceptedFriendsQuery();
  const { onlineUsers } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  const route = useRouter();

  // ✅ Debounce searchTerm updates (searchTerm is only for filtering)
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 800),
    []
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  // ✅** Handle friend to add active user
  const handleClick = (friend: any) => {
    dispatch(setActiveUser(friend));

    // Only close sidebar on mobile (width < 768px)
    if (window.innerWidth < 768 && onClose) {
      onClose();
    }
  };

  // ✅ Update input instantly & trigger debounce for searchTerm
  const handleUserSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    debouncedSearch(value);
  };

  // ✅ Memoized filtering
  const filteredFriends = useFilteredFriends(data?.users, searchTerm);

  // ✅** handle routes
  const handleRouteClick = () => route.push("/profile");

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

        {/* SidebarTabs */}
        <SidebarTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {/* Search */}
        <div className="p-3">
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => handleUserSearch(e)}
            className="w-full rounded-lg bg-slate-700 px-3 py-2 text-sm placeholder-slate-400 text-white outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Friend list profile */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {isLoading ? (
            <FriendListSkeleton count={6} />
          ) : activeTab === "chat" ? (
            filteredFriends?.length ? (
              <FriendList
                friends={filteredFriends}
                onlineUsers={onlineUsers}
                onClick={handleClick}
              />
            ) : (
              <p className="text-center text-slate-400 p-4">No friends found</p>
            )
          ) : (
            <NonFriendList searchTerm={searchTerm} />
          )}
        </div>
        {/* Profile + Sign Out */}
        {user && (
          <div className="px-2 border-t border-slate-700 flex items-center justify-between gap-2 bg-slate-900 ">
            <UserProfile currentUser={user} isTimeAvailable={false} />
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
