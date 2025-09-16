"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import React from "react";
import UserProfile from "./User-profile";

const ChatArea = () => {
  const user = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-[#1e293b]">
        <div className="flex items-center gap-x-2">
          <UserProfile currentUser={user?.user} isDisable={true} />
          <span>
            <p className="font-semibold">Theron Trump</p>
            <p className="text-xs text-gray-400">Last seen 10:20pm</p>
          </span>
        </div>
        <button className="p-2 hover:bg-[#334155] rounded-lg">⋮</button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="max-w-sm p-3 rounded-lg bg-[#334155]">
          <p className="text-sm">
            What do you think about our plans for this product launch?
          </p>
          <span className="block text-right text-xs text-gray-400">09:25</span>
        </div>

        <div className="max-w-sm p-3 rounded-lg bg-[#334155]">
          <p className="text-sm">
            It looks to me like you have a lot planned before your deadline. I
            would suggest you push your deadline back so you have time to run a
            successful campaign.
          </p>
          <span className="block text-right text-xs text-gray-400">09:28</span>
        </div>

        {/* Right Side Messages */}
        <div className="flex justify-end">
          <div className="max-w-sm p-3 rounded-lg bg-blue-600">
            <p className="text-sm">
              I would suggest you discuss this further with the advertising
              team.
            </p>
            <span className="block text-right text-xs text-gray-200">
              09:41
            </span>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-sm p-3 rounded-lg bg-blue-600">
            <p className="text-sm">
              I am very busy at the moment and on top of everything, I forgot my
              umbrella today.
            </p>
            <span className="block text-right text-xs text-gray-200">
              09:41
            </span>
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 bg-[#1e293b] flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-lg bg-[#334155] px-3 py-2 text-sm outline-none"
        />
        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatArea;
