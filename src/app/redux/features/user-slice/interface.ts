import { User } from "@/app/types/auth";

export interface IChatMessage {
  _id?: string;
  sender_id: string;
  receiver_id: string;
  text?: string;
  media?: string;
  createdAt?: string;
}

export interface OnlineState {
  onlineUsers: string[];
  activeUser: User | null;
  chat: IChatMessage[];
  loading: boolean;
  error: string | null;
}
