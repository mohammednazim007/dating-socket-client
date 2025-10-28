// src/app/redux/features/auth/userSlice.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/app/types/auth";
import api from "@/app/lib/axios";

// Thunk to fetch the latest user data
export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/current-user`
      );
      return res.data.user as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to refresh user");
    }
  }
);
