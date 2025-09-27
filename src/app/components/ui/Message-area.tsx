// import React from "react";

// const MessageArea = () => {
//   return (
//     <div className="flex-1 p-4 space-y-4 overflow-y-auto">
//       <div className="max-w-sm p-3 rounded-lg bg-[#334155]">
//         <p className="text-sm">
//           What do you think about our plans for this product launch?
//         </p>
//         <span className="block text-right text-xs text-gray-400">09:25</span>
//       </div>

//       <div className="max-w-sm p-3 rounded-lg bg-[#334155]">
//         <p className="text-sm">
//           It looks to me like you have a lot planned before your deadline. I
//           would suggest you push your deadline back so you have time to run a
//           successful campaign.
//         </p>
//         <span className="block text-right text-xs text-gray-400">09:28</span>
//       </div>

//       {/* Right Side Messages */}
//       <div className="flex justify-end">
//         <div className="max-w-sm p-3 rounded-lg bg-blue-600">
//           <p className="text-sm">
//             I would suggest you discuss this further with the advertising team.
//           </p>
//           <span className="block text-right text-xs text-gray-200">09:41</span>
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <div className="max-w-sm p-3 rounded-lg bg-blue-600">
//           <p className="text-sm">
//             I am very busy at the moment and on top of everything, I forgot my
//             umbrella today.
//           </p>
//           <span className="block text-right text-xs text-gray-200">09:41</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MessageArea;
import React from "react";
import { Message } from "./ChatArea";

interface Props {
  messages: Message[];
  currentUserId: string;
}

const MessageArea = ({ messages, currentUserId }: Props) => {
  return (
    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId;
        return (
          <div
            key={msg._id}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-sm p-3 rounded-lg ${
                isMe ? "bg-blue-600 text-white" : "bg-[#334155] text-slate-100"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <span className="block text-right text-xs opacity-70">
                {new Date(msg.createdAt || "").toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageArea;
