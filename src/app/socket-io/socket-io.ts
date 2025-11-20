import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

/**
 * Connects the socket for the given user.
 * Returns the socket instance or null if user_id is missing.
 */
export const connectSocket = (user_id: string): Socket | null => {
  if (!user_id) {
    console.warn("⚠️ No user_id provided, socket not connected");
    return null;
  }

  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      query: { user_id },
      transports: ["websocket"],
      autoConnect: true,
    });
  }

  return socket;
};

/**
 * Returns the connected socket instance.
 * Throws an error if socket is not initialized.
 */
export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket not initialized. Call connectSocket first.");
  }
  return socket;
};

/** Disconnects the socket and cleans up */
export const disconnectSocket = () => {
  socket?.disconnect();
  socket = null;
};
