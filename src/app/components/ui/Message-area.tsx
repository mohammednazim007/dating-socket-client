"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useSocket } from "@/app/hooks/useChatSocket";
import { addNewMessage } from "@/app/redux/features/friend-slice/message-user-slice";
import { RootState } from "@/app/redux/store";
import { connectSocket, getSocket } from "@/app/socket-io/socket-io";
import { fetchChatHistory } from "@/app/utility/fetchChatHistory";
import React, { useEffect } from "react";

const MessageArea = () => {
  const dispatch = useAppDispatch();
  const { activeUser, chat } = useAppSelector(
    (state: RootState) => state.friend
  );
  const currentUser = useAppSelector((state: RootState) => state.auth.user);
  // ✅ Connect socket and listen for events
  useSocket(currentUser?._id || "");

  // ✅ Fetch chat history when active user changes
  useEffect(() => {
    if (currentUser && activeUser) {
      dispatch(
        fetchChatHistory({
          sender_id: currentUser._id,
          receiver_id: activeUser._id,
        })
      );
    }
  }, [currentUser, activeUser, dispatch]);
  return (
    <>
      <div className="flex flex-col gap-4 p-4 bg-slate-900">
        {chat?.map((msg, i) => {
          const isSender = msg.sender_id === currentUser?._id;
          return (
            <div
              key={i}
              className={`flex ${isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-sm p-3 rounded-lg ${
                  isSender
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-gray-100"
                }`}
              >
                {msg.text && <p className="text-sm">{msg.text}</p>}
                {msg.media && (
                  <img
                    src={msg.media}
                    alt="media"
                    className="rounded-lg mt-2 max-h-48"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MessageArea;
