import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";

interface IMessage {
  _id?: string;
  sender_id: string;
  receiver_id: string;
  text?: string;
  media?: string;
  createdAt?: string;
}

// ✅ Fetch chat history between two users
export const fetchChatHistory = createAsyncThunk<
  IMessage[],
  { sender_id: string; receiver_id: string }
>("messages/fetchChatHistory", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post(`/message/history`, data);
    return res.data.data as IMessage[];
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to load chat history"
    );
  }
});
