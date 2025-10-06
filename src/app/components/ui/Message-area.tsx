import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { addNewMessage } from "@/app/redux/features/friend-slice/message-user-slice";
import { RootState } from "@/app/redux/store";
import { getSocket } from "@/app/socket-io/socket-io";
import { fetchChatHistory } from "@/app/utility/fetchChatHistory";
import React, { useEffect } from "react";

const MessageArea = () => {
  const dispatch = useAppDispatch();
  const { activeUser, chat } = useAppSelector(
    (state: RootState) => state.friend
  );
  const currentUser = useAppSelector((state: RootState) => state.auth.user);

  // ✅ Fetch chat on friend select
  useEffect(() => {
    if (currentUser && activeUser) {
      dispatch(
        fetchChatHistory({
          sender_id: currentUser._id,
          receiver_id: activeUser._id,
        })
      );
    }
  }, [dispatch, currentUser, activeUser]);

  // ✅ Listen for new messages and scroll to bottom
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    socket.on("new_message", (message: any) => {
      dispatch(addNewMessage(message));
    });

    return () => {
      socket.off("new_message");
    };
  }, [dispatch]);

  return (
    <>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-900">
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
// <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//   <div className="max-w-sm p-3 rounded-lg bg-[#334155]">
//     <p className="text-sm">
//       What do you think about our plans for this product launch?
//     </p>
//     <span className="block text-right text-xs text-gray-400">09:25</span>
//   </div>

//   <div className="max-w-sm p-3 rounded-lg bg-[#334155]">
//     <p className="text-sm">
//       It looks to me like you have a lot planned before your deadline. I
//       would suggest you push your deadline back so you have time to run a
//       successful campaign.
//     </p>
//     <span className="block text-right text-xs text-gray-400">09:28</span>
//   </div>

//   {/* Right Side Messages */}
//   <div className="flex justify-end">
//     <div className="max-w-sm p-3 rounded-lg bg-blue-600">
//       <p className="text-sm">
//         I would suggest you discuss this further with the advertising team.
//       </p>
//       <span className="block text-right text-xs text-gray-200">09:41</span>
//     </div>
//   </div>

//   <div className="flex justify-end">
//     <div className="max-w-sm p-3 rounded-lg bg-blue-600">
//       <p className="text-sm">
//         I am very busy at the moment and on top of everything, I forgot my
//         umbrella today.
//       </p>
//       <span className="block text-right text-xs text-gray-200">09:41</span>
//     </div>
//   </div>
// </div>
