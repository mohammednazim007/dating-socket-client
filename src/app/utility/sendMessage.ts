import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";
import { IChatMessage } from "../redux/features/user-slice/interface";

// ✅ Send message (text or media)
export const sendMessage = createAsyncThunk<
  IChatMessage,
  { sender_id: string; receiver_id: string; text?: string; media?: File }
>("message/sendMessage", async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("sender_id", data.sender_id);
    formData.append("text", data.text || "");
    if (data.media) formData.append("media", data.media);

    const res = await api.post(`/message/send/${data.receiver_id}`, formData);
    return res.data.data as IChatMessage;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to send message"
    );
  }
});
