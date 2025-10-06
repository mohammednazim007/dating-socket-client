// // src/hooks/useChatSocket.ts
// "use client";
// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
// import { connectSocket, disconnectSocket } from "../socket-io/socket-io";
// import {
//   addMessage,
//   setChatHistory,
// } from "../redux/features/friend-slice/message-user-slice";
// import api from "../lib/axios";

// export const useChatSocket = () => {
//   const dispatch = useAppDispatch();
//   const { activeUser } = useAppSelector((state) => state.friend);
//   const { user } = useAppSelector((state) => state.auth); // assume logged in user

//   useEffect(() => {
//     if (!user?._id) return;

//     const socket = connectSocket(user._id);

//     socket.on("new_message", (message: any) => {
//       dispatch(addMessage(message));
//     });

//     return () => {
//       disconnectSocket();
//     };
//   }, [user, dispatch]);

//   // Fetch chat history whenever active user changes
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       if (!user?._id || !activeUser?._id) return;
//       const { data } = await api.post("/messages/history", {
//         sender_id: user._id,
//         receiver_id: activeUser._id,
//       });
//       dispatch(setChatHistory(data.data));
//     };

//     fetchChatHistory();
//   }, [activeUser, user, dispatch]);
// };
