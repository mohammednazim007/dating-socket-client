import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";
import { IChatMessage } from "../redux/features/user-slice/interface";

// ✅ Fetch chat history between two users
export const fetchChatHistory = createAsyncThunk<
  IChatMessage[],
  { friend_id: string }
>("message/fetchChatHistory", async (data, { rejectWithValue }) => {
  try {
    const res = await api.get(`/message/get_message/${data.friend_id}`);
    return res?.data?.data as IChatMessage[];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to load chat history"
    );
  }
});
