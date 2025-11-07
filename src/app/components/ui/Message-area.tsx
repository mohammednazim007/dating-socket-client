"use client";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { useSocket } from "@/app/hooks/useChatSocket";
import { useTypingIndicator } from "@/app/hooks/useTypingIndicator";
import { TypingIndicator } from "@/app/shared/TypingIndicator/TypingIndicator";
import { fetchChatHistory } from "@/app/utility/fetchChatHistory";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
import DEFAULT_AVATAR from "@/app/assets/profile.png";
import NoChatSelected from "../../shared/NoChatSelected/NoChatSelected";
import { useCurrentUserQuery } from "@/app/redux/features/authApi/authApi";
import TextAnimation from "@/app/shared/TextAnimation/TextAnimation";

const MessageArea = () => {
  const { data } = useCurrentUserQuery();
  const { activeUser, chat } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const user = data?.user;

  // ** Initialize socket connection
  useSocket(user?._id || "");
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [isTyping] = useTypingIndicator(user?._id, activeUser);

  // ** fetch the chat history
  useEffect(() => {
    if (activeUser?._id) {
      dispatch(fetchChatHistory({ friend_id: activeUser?._id }));
    }
  }, [activeUser?._id, dispatch, user?._id]);

  // ** Scroll message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, isTyping]);

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-slate-900 w-full overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full py-4 space-y-3 min-h-0">
        {!chat || chat.length === 0 ? (
          <NoChatSelected />
        ) : (
          chat.map((msg, i) => {
            const isSender = msg.user_id === user?._id;
            const isActiveUser =
              activeUser && activeUser?._id === msg?.friend_id;

            return (
              <div
                key={i}
                className={`flex items-start px-3 sm:px-6 ${
                  isSender ? "justify-end" : "justify-start"
                }`}
              >
                {/* Receiver avatar (left) */}
                {!isSender && isActiveUser && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <Image
                      width={36}
                      height={36}
                      src={activeUser?.avatar || DEFAULT_AVATAR.src}
                      alt="Receiver avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Text message bubble */}
                {msg.text && (
                  <div
                    className={`p-3 rounded-lg text-balance ${
                      isSender
                        ? "bg-[#A7AAE1] text-white"
                        : "bg-slate-700 text-gray-100"
                    } max-w-[80%] sm:max-w-[65%] lg:max-w-[50%]`}
                  >
                    <p className="text-sm break-all">
                      <TextAnimation
                        text={
                          "Hello there! This text will appear word by word like GPT."
                        }
                        delay={400}
                      />
                    </p>
                    {/* <p className="text-sm break-all">{msg.text}</p> */}
                  </div>
                )}

                {/* Media message bubble */}
                {msg.media && (
                  <div
                    className={`max-w-[80%] sm:max-w-[65%] lg:max-w-[50%] rounded-lg border border-gray-600 p-1 ${
                      isSender ? "ml-auto" : ""
                    }`}
                  >
                    <Image
                      width={250}
                      height={200}
                      src={msg.media}
                      alt="media"
                      className="rounded-md max-w-full h-auto object-cover"
                    />
                  </div>
                )}

                {/* Sender avatar (right) */}
                {isSender && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden ml-2 flex-shrink-0">
                    <Image
                      width={36}
                      height={36}
                      src={user?.avatar || DEFAULT_AVATAR.src}
                      alt="Sender avatar"
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        <div className="px-3 sm:px-6">
          <TypingIndicator isTyping={isTyping} name={activeUser?.name} />
        </div>

        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default MessageArea;
