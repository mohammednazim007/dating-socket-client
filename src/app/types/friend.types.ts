export interface IFriend {
  _id: string;
  name: string;
  email: string;
  avatar?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface FriendListProps {
  friends: IFriend[];
  onlineUsers: string[];
  onClick?: (friend: IFriend) => void;
}
export interface FriendListItemProps {
  friend: IFriend;
  isOnline: boolean;
  isSelected: boolean;
  onClick: (friend: IFriend) => void;
}
