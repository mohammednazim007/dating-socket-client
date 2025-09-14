import { useAppSelector, useAppDispatch } from "@/app/hooks/hooks";
import { signOut } from "@/app/redux/features/auth/authSlice";

export const useAuth = () => {
  const { user, token, loading, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isAuthenticated = !!token && !!user;

  const logout = () => {
    dispatch(signOut());
  };

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    logout,
  };
};
