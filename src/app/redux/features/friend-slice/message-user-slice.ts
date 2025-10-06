import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChatMessage, OnlineState } from "./interface";
import api from "@/app/lib/axios";
import { IFriend } from "@/app/types/friend.types";
import { fetchChatHistory } from "@/app/utility/fetchChatHistory";
import { sendMessage } from "@/app/utility/sendMessage";

const initialState: OnlineState = {
  onlineUsers: [],
  activeUser: null,
  chat: [],
  loading: false,
  error: null,
};

const onlineSlice = createSlice({
  name: "online-users",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setActiveUser: (state, action: PayloadAction<IFriend>) => {
      state.activeUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.chat = action.payload;
        state.error = null;
      })
      .addCase(fetchChatHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.chat.push(action.payload);
      });
  },
});

export const { setOnlineUsers, setActiveUser } = onlineSlice.actions;
export default onlineSlice.reducer; // ✅ export reducer, not slice
