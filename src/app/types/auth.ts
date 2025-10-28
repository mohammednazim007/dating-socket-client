export interface User {
  _id: string;
  name: string;
  email: string;

  password?: string;
  avatar: string | null;
  isFriend?: boolean;

  friends?: string[]; // IDs of accepted friends
  friendRequests?: string[]; // IDs of incoming friend requests
  sentRequests?: string[]; // IDs of sent friend requests
  blockedUsers?: string[]; // IDs of blocked users
  lastActive?: string; // Last online timestamp
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
