import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

export const getFriends = createAsyncThunk(
  "friends/get-all-friends",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`friend/all-friends`);

      return res.data;
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      return rejectWithValue(
        apiError.data?.message || "Failed to load friends"
      );
    }
  }
);
