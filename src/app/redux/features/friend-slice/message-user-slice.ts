import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { OnlineState } from "./interface";
import api from "@/app/lib/axios";

const initialState: OnlineState = {
  onlineUsers: [],
  activeUser: null,
  chat: [],
};

const onlineSlice = createSlice({
  name: "online-users",
  initialState,
  reducers: {
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },

    setActiveUser: (state, action) => {
      state.activeUser = action.payload;
    },
  },
});

export const { setOnlineUsers, setActiveUser } = onlineSlice.actions;
export default onlineSlice.reducer; // ✅ export reducer, not slice
