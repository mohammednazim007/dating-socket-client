"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import SignOutButton from "./Sign-out";
import UserProfile from "../ui/User-profile";

const Sidebar = () => {
  const user = useAppSelector((state: RootState) => state.auth);
  console.log(user);

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
        {["Mical Clark", "Collin Nathan", "Nathan John", "Semi Dee"].map(
          (user, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3 hover:bg-[#334155] cursor-pointer"
            >
              <div className="w-10 h-10 bg-gray-500 rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{user}</p>
                <p className="text-xs text-gray-400">
                  Nullam facilisis velit...
                </p>
              </div>
              <span className="text-xs text-gray-400">10:00pm</span>
            </div>
          )
        )}
      </div>

      {/* Profile + Sign Out */}
      {user?.user && (
        <div className="p-2 border-t border-gray-700 flex items-center justify-between gap-2">
          {/* Profile (Avatar Button) */}
          <UserProfile currentUser={user.user} isDisable={false} />

          {/* Sign Out (Circle Icon Button) */}
          <SignOutButton />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
