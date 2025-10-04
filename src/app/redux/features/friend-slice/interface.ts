import { IFriend } from "@/app/types/friend.types";

export interface IChatMessage {
  text: string;
  media?: string;
  sender_id: string;
  receiver_id: string;
  timestamp: Date;
}

export interface OnlineState {
  onlineUsers: IFriend[];
  activeUser: IFriend | null;
  chat: IChatMessage[];
}
