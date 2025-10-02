import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IChatMessage } from "./interface";
import api from "@/app/lib/axios";

export const getMessage = createAsyncThunk(
  "message/getMessage",
  async (userId: string | undefined, thunkAPI) => {
    try {
      if (!userId) return thunkAPI.rejectWithValue("User ID is undefined");

      const response = await api.get(`/message/${userId}`);
      return response.data;
    } catch (error) {
      console.log("get message error", error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState: IChatMessage = {
  chat: [],
  loading: false,
  error: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.chat.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessage.fulfilled, (state, action) => {
        state.chat = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
