//** socket.io
import { io } from "socket.io-client";

let socket: any = null;

// ** connect Socket
export const connectSocket = (user_id: string) => {
  if (!user_id) {
    console.warn("⚠️ No user_id provided, socket not connected");
    return null;
  }

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
    query: { user_id },
    transports: ["websocket"],
    autoConnect: true,
  });

  return socket;
};

// ** Get Socket
export const getSocket = () => socket;

// ** Disconnect Socket
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
