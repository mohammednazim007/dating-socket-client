import { io } from "socket.io-client";

let socket: any = null;

// ** connect Socket
export const connectSocket = (user_id: string) => {
  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
    query: { user_id },
    transports: ["websocket"],
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
