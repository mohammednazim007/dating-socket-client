import { User } from "@/app/types/auth";

export interface IFriendsState {
  friends: User[];
  isLoading: boolean;
  isError: null | string;
}
