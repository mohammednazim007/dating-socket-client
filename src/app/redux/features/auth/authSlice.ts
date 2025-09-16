import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "@/app/types/auth";

const initialState: AuthState = {
  user: null,
  activeUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = null;
    },

    setActiveUser: (state, action: PayloadAction<User>) => {
      state.activeUser = action.payload;
      state.error = null;
    },

    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, clearUser, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
