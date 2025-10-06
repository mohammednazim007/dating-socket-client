import { IFriend } from "@/app/types/friend.types";

export interface IChatMessage {
  _id?: string;
  sender_id: string;
  receiver_id: string;
  text?: string;
  media?: string;
  createdAt?: string;
}

export interface OnlineState {
  onlineUsers: IFriend[];
  activeUser: IFriend | null;
  chat: IChatMessage[];
  loading: boolean;
  error: string | null;
}
