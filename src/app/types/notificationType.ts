export interface INotification {
  _id: string;
  avatar?: string;
  name: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  senderId: string;
  receiverId: string;
  type: string;
}
