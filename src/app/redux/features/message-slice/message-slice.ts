import { createSlice } from "@reduxjs/toolkit";
import { IChatMessage } from "./interface";

const initialState: IChatMessage = {
  chat: [],
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.chat.push(action.payload);
    },
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
