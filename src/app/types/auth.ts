export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
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
