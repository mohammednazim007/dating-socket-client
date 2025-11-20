"use client";

import React, { memo } from "react";
import Image from "next/image";
import { FriendListItemProps } from "./interface";

const FriendListItem = ({
  friend,
  isOnline,
  isSelected,
  onClick,
}: FriendListItemProps) => {
  return (
    <div
      onClick={() => onClick(friend)}
      className={`
        group relative flex items-center gap-3.5 p-2 mx-1 rounded-xl cursor-pointer
        transition-all duration-200 ease-out
        border border-[rgba(255,255,255,0.05)]
        ${
          isSelected
            ? "bg-indigo-600/10 border-indigo-500/20 shadow-md shadow-indigo-900/5"
            : "hover:bg-slate-500/10 hover:border-slate-700/50"
        }
      `}
    >
      {/* Avatar Container */}
      <div className="relative shrink-0">
        <div
          className={`
            w-11 h-11 rounded-full overflow-hidden border-2 transition-colors duration-200
            ${
              isSelected
                ? "border-indigo-500/40"
                : "border-slate-800 group-hover:border-slate-600"
            }
          `}
        >
          {friend.avatar ? (
            <Image
              src={friend.avatar}
              alt={friend.name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-slate-800 flex items-center justify-center">
              <span className="text-sm font-semibold text-slate-400 group-hover:text-slate-300">
                {friend.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          )}
        </div>

        {/* Online Indicator with Pulse Effect */}
        {isOnline && (
          <span className="absolute bottom-0.5 right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-slate-950"></span>
          </span>
        )}
        {!isOnline && (
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-slate-500 border-2 border-slate-950 rounded-full"></span>
        )}
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-baseline">
          <p
            className={`
              text-sm font-medium truncate transition-colors
              ${
                isSelected
                  ? "text-indigo-100"
                  : "text-slate-200 group-hover:text-white"
              }
            `}
          >
            {friend.name || "Unknown User"}
          </p>
        </div>

        <p
          className={`
            text-xs truncate transition-colors mt-0.5
            ${
              isSelected
                ? "text-indigo-300/80"
                : isOnline
                ? "text-emerald-400/80"
                : "text-slate-500 group-hover:text-slate-400"
            }
          `}
        >
          {isOnline ? "Online now" : "Offline"}
        </p>
      </div>

      {/* Active Indicator Bar (Subtle) */}
      {isSelected && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-indigo-500 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
      )}
    </div>
  );
};

export default memo(FriendListItem);
