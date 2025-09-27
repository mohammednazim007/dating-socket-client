// // "use client";
// // import { useAppSelector } from "@/app/hooks/hooks";
// // import { RootState } from "@/app/redux/store";
// // import React from "react";
// // import MessageArea from "./Message-area";
// // import FriendsProfile from "./FriendsProfile";
// // import { motion } from "motion/react";

// // interface ChatAreaProps {
// //   onToggleSidebar: () => void;
// // }

// // const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
// //   const selectedFriends = useAppSelector((state: RootState) => state.friend);

// //   return (
// //     <div className="flex-1 flex flex-col bg-[#0f172a] text-slate-100">
// //       {/* Header */}
// //       <motion.div
// //         initial={{ y: -20, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         transition={{ duration: 0.3 }}
// //         className="flex items-center justify-between p-2 pl-3 border-b border-slate-700 bg-slate-800 shadow-md"
// //       >
// //         <div className="flex items-center gap-3">
// //           {/* Mobile toggle button */}
// //           <button
// //             onClick={onToggleSidebar}
// //             className="md:hidden px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
// //           >
// //             ☰
// //           </button>

// //           <FriendsProfile
// //             currentFriends={selectedFriends?.activeUser}
// //             isDisable={true}
// //           />
// //           <div>
// //             <p className="font-semibold text-white">
// //               {selectedFriends?.activeUser?.name || "Select a chat"}
// //             </p>
// //             <p className="text-xs text-slate-400">Last seen 10:20pm</p>
// //           </div>
// //         </div>
// //         <button className="p-2 rounded-lg hover:bg-slate-700 transition">
// //           ⋮
// //         </button>
// //       </motion.div>

// //       {/* Message area */}
// //       <div className="flex-1 overflow-y-auto bg-slate-900">
// //         <MessageArea />
// //       </div>

// //       {/* Input area */}
// //       <motion.div
// //         initial={{ y: 20, opacity: 0 }}
// //         animate={{ y: 0, opacity: 1 }}
// //         transition={{ duration: 0.3 }}
// //         className="p-2 border-t border-slate-700 bg-slate-800 flex gap-3"
// //       >
// //         <input
// //           type="text"
// //           placeholder="Type a message..."
// //           className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
// //         />
// //         <button className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium shadow">
// //           Send
// //         </button>
// //       </motion.div>
// //     </div>
// //   );
// // };

// // export default ChatArea;
// "use client";
// import { useAppSelector } from "@/app/hooks/hooks";
// import { RootState } from "@/app/redux/store";
// import React, { useEffect, useState } from "react";
// import MessageArea from "./Message-area";
// import FriendsProfile from "./FriendsProfile";
// import { motion } from "motion/react";
// import { useSocket } from "@/app/hooks/useSocket";

// interface ChatAreaProps {
//   onToggleSidebar: () => void;
// }

// interface Message {
//   senderId: string;
//   room: string;
//   content: string;
// }

// const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
//   const selectedFriends = useAppSelector((state: RootState) => state.friend);
//   const socket = useSocket();

//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
//   const room = selectedFriends?.activeUser?._id; // each friend = separate room

//   console.log("active user:", selectedFriends?.activeUser);

//   // Join room when active friend changes
//   useEffect(() => {
//     if (socket && room) {
//       socket.emit("join_room", room);
//     }
//   }, [socket, room]);

//   // Listen for new messages
//   useEffect(() => {
//     if (!socket) return;

//     socket.on("receive_message", (data: Message) => {
//       setMessages((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.off("receive_message");
//     };
//   }, [socket]);

//   // Send message
// const handleSend = () => {
//   if (socket && message.trim() && room) {
//     socket.emit("send_message", {
//       senderId: socket.id!,
//       room,
//       content: message,
//     });
//     setMessage("");
//   }
// };

//   return (
//     <div className="flex-1 flex flex-col bg-[#0f172a] text-slate-100">
//       {/* Header */}
//       <motion.div
//         initial={{ y: -20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="flex items-center justify-between p-2 pl-3 border-b border-slate-700 bg-slate-800 shadow-md"
//       >
//         <div className="flex items-center gap-3">
//           <button
//             onClick={onToggleSidebar}
//             className="md:hidden px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
//           >
//             ☰
//           </button>

//           <FriendsProfile
//             currentFriends={selectedFriends?.activeUser}
//             isDisable={true}
//           />
//           <div>
//             <p className="font-semibold text-white">
//               {selectedFriends?.activeUser?.name || "Select a chat"}
//             </p>
//             <p className="text-xs text-slate-400">Last seen 10:20pm</p>
//           </div>
//         </div>
//         <button className="p-2 rounded-lg hover:bg-slate-700 transition">
//           ⋮
//         </button>
//       </motion.div>

//       {/* Message area */}
//       <div className="flex-1 overflow-y-auto bg-slate-900">
//         <MessageArea messages={messages} socketId={socket?.id} />
//       </div>

//       {/* Input area */}
//       <motion.div
//         initial={{ y: 20, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.3 }}
//         className="p-2 border-t border-slate-700 bg-slate-800 flex gap-3"
//       >
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
//         />
//         <button
//           onClick={handleSend}
//           className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium shadow"
//         >
//           Send
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default ChatArea;
"use client";
import { useAppSelector } from "@/app/hooks/hooks";
import { RootState } from "@/app/redux/store";
import React, { useEffect, useState, useRef } from "react";
import MessageArea from "./Message-area";
import FriendsProfile from "./FriendsProfile";
import { motion } from "motion/react";
import api from "@/app/lib/axios";
import { useSocket } from "@/app/socket-io/useSocket";
interface ChatAreaProps {
  onToggleSidebar: () => void;
}

export interface Message {
  _id?: string;
  senderId: string | null;
  room: string;
  content: string;
  createdAt?: string;
}

const ChatArea = ({ onToggleSidebar }: ChatAreaProps) => {
  const selectedFriends = useAppSelector((state: RootState) => state.friend);
  const currentUser = useAppSelector((state: RootState) => state.auth.user) ?? {
    _id: "",
  };

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const socket = useSocket();
  console.log("current user:", currentUser);

  const activeFriend = selectedFriends?.activeUser;
  const roomId =
    currentUser && activeFriend
      ? [currentUser._id, activeFriend._id].sort().join("_")
      : "";

  // 🔹 Fetch old messages from DB
  useEffect(() => {
    if (!roomId) return;
    const fetchMessages = async () => {
      const res = await api.get(`/messages/${roomId}`);
      setMessages(res.data);
    };
    fetchMessages();
  }, [roomId]);

  // 🔹 Listen for new socket messages
  useEffect(() => {
    if (!socket || !roomId) return;

    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket, roomId]);

  // 🔹 Send message
  const handleSend = async () => {
    if (!message.trim() || !roomId) return;

    const newMsg: Message = {
      senderId: currentUser._id,
      room: roomId,
      content: message,
    };

    // Save to DB
    const res = await api.post("/messages", newMsg);
    const savedMsg = res.data;

    // Emit via socket
    socket?.emit("sendMessage", savedMsg);

    setMessages((prev) => [...prev, savedMsg]);
    setMessage("");
  };

  // 🔹 Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-[#0f172a] text-slate-100">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between p-2 pl-3 border-b border-slate-700 bg-slate-800 shadow-md"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="md:hidden px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
          >
            ☰
          </button>

          <FriendsProfile
            currentFriends={selectedFriends?.activeUser}
            isDisable={true}
          />
          <div>
            <p className="font-semibold text-white">
              {activeFriend?.name || "Select a chat"}
            </p>
            <p className="text-xs text-slate-400">Last seen 10:20pm</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-slate-700 transition">
          ⋮
        </button>
      </motion.div>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto bg-slate-900">
        <MessageArea messages={messages} currentUserId={currentUser._id} />
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-2 border-t border-slate-700 bg-slate-800 flex gap-3"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 rounded-lg bg-slate-900 text-slate-100 placeholder-slate-500 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition text-white font-medium shadow"
        >
          Send
        </button>
      </motion.div>
    </div>
  );
};

export default ChatArea;
