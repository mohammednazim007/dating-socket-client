import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

export const getFriends = createAsyncThunk(
  "friends/get-all-friends",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(`friend/all-friends`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load chat history"
      );
    }
  }
);
