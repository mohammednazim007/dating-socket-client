import { User } from "@/app/types/auth";

export interface IChatMessage {
  _id?: string;
  friend_id?: string;
  user_id?: string;
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
