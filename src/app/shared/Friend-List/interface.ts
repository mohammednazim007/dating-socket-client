import { User } from "@/app/types/auth";

export interface FriendListProps {
  friends: User[];
  onlineUsers: string[];
  onClick: (friend: User) => void; // ← fixed: should accept a User
}

export interface FriendListItemProps {
  friend: User;
  isOnline: boolean;
  isSelected: boolean;
  onClick: (friend: User) => void;
}
