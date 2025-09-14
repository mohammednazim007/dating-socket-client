import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, AuthState } from "@/app/types/auth";

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const signOut = createAsyncThunk("auth/signOut", async () => {
  // localStorage.removeItem("token");
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer;
