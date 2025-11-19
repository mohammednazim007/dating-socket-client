// src/app/redux/features/friends/friendApi.ts
import { IResponse } from "@/app/types/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "../../base-query/baseQueryWithAuth";

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["Auth", "User", "Friends"],

  endpoints: (builder) => ({
    // ✅ 1. Get all friends + pending requests
    getFriends: builder.query<IResponse, void>({
      query: () => `/friend/non-friends`,
      providesTags: ["Friends"],
    }),

    // 2. Get the accepted friends list
    getAcceptedFriends: builder.query<IResponse, void>({
      query: () => `/friend/accepted-friends`,
      providesTags: ["Friends"],
    }),

    // ✅ 2. Send friend request
    sendFriendRequest: builder.mutation({
      query: ({
        senderId,
        receiverId,
      }: {
        senderId: string;
        receiverId: string;
      }) => ({
        url: `/friend/send-request`,
        method: "PUT",
        body: { senderId, receiverId },
      }),
      invalidatesTags: ["Friends", "Auth", "User"],
    }),

    // ✅ 3. Accept friend request
    acceptFriendRequest: builder.mutation({
      query: ({
        senderId,
        receiverId,
      }: {
        senderId: string;
        receiverId: string;
      }) => ({
        url: `/friend/accept-request`,
        method: "PUT",
        body: { senderId, receiverId },
      }),
      invalidatesTags: ["Friends", "Auth", "User"],
    }),

    // ✅ 4. Reject friend request
    deleteFriendRequest: builder.mutation({
      query: (receiverId: string) => ({
        url: `/friend/cancel-request/${receiverId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends", "Auth", "User"],
    }),

    // ✅ 4. Cancel friend request by me
    cancelFriendRequestMe: builder.mutation({
      query: (friendId: string) => ({
        url: `/friend/cancel-request-by-me/${friendId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends", "Auth", "User"],
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetAcceptedFriendsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useDeleteFriendRequestMutation,
  useCancelFriendRequestMeMutation,
} = friendApi;
