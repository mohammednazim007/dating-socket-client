// useSocket.ts
import { useEffect } from "react";
import { connectSocket, getSocket } from "@/app/socket-io/socket-io";
import { useAppDispatch } from "@/app/hooks/hooks";
import {
  addNewMessage,
  setOnlineUsers,
} from "@/app/redux/features/user-slice/message-user-slice";
import { IChatMessage } from "../redux/features/user-slice/interface";

export const useSocket = (userId: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId) return;

    // Connect socket
    connectSocket(userId);
    const socket = getSocket();
    if (!socket) return;

    //** add message
    const handleNewMessage = (msg: IChatMessage) =>
      dispatch(addNewMessage(msg));

    // ** set online user
    const handleOnlineUsers = (users: string[]) =>
      dispatch(setOnlineUsers(users));

    socket.on("new_message", handleNewMessage);
    socket.on("get_online_users", handleOnlineUsers);

    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("get_online_users", handleOnlineUsers);
    };
  }, [userId, dispatch]);
};
