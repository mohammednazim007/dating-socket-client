export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

export interface AuthState {
  user: User | null;
  activeUser: User | null;
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
