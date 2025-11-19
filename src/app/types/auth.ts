import { KeyboardEvent, RefObject } from "react";

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
  avatar?: File | null | string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface IProfileForm {
  name: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  image: File | null;
}

export interface IResponse {
  success: boolean;
  message: string;
  email?: string;
  users?: User[];
}
export interface ILoginResponse {
  success: boolean;
  message: string;
  accessToken: string;
  user: User;
}
export interface IOtpVerify {
  email: string;
  otpCode: string;
}
export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  inputRef: RefObject<HTMLInputElement | null>;
  isFocused: boolean;
}
//** */ Define the shape of the form data
export type PasswordFields = {
  newPassword: string;
  confirmPassword: string;
};
