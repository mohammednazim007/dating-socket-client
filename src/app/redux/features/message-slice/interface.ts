export interface IMessage {
  text?: string;
  media?: string;
  sender_id: string;
  receiver_id: string;
}

export interface IChatMessage {
  chat: IMessage[];
  loading: boolean;
  error: string | null;
}
