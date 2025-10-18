import { createSlice } from "@reduxjs/toolkit";
import { IFriendsState } from "./interface";
import { getFriends } from "@/app/utility/getFriends";

const initialState: IFriendsState = {
  friends: [],
  isLoading: false,
  isError: null,
};

const friendSlice = createSlice({
  name: "friend-slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        console.log("Fetched friends:", action.payload);

        state.isLoading = false;
        state.friends = action.payload;
        state.isError = null;
      })
      .addCase(getFriends.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = action.payload as string;
      });
  },
});

export const {} = friendSlice.actions;
export default friendSlice.reducer;
