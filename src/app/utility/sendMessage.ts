import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../lib/axios";
import { IChatMessage } from "../redux/features/user-slice/interface";

// ✅ Send message (text or media)
export const sendMessage = createAsyncThunk<
  IChatMessage,
  { user_id: string; friend_id: string; text?: string; media?: File }
>("message/sendMessage", async (data, { rejectWithValue }) => {
  try {
    const formData = new FormData();
    formData.append("user_id", data.user_id);
    formData.append("friend_id", data.friend_id);
    formData.append("text", data.text || "");
    if (data.media) formData.append("media", data.media);

    const res = await api.post(`/message/send/${data.friend_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data as IChatMessage;
  } catch (err: unknown) {
    const apiError = err as { data?: { message?: string } };
    return rejectWithValue(apiError.data?.message || "Failed to send message");
  }
});
