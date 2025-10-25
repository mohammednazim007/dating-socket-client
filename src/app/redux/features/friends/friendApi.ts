// src/app/redux/features/friends/friendApi.ts

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers) => headers,
  }),
  tagTypes: ["Friends"],

  endpoints: (builder) => ({
    // ✅ 1. Get all friends + pending requests
    getFriends: builder.query<any, void>({
      query: () => `/friend/non-friends`,
      providesTags: ["Friends"], // 👈 this query will auto-refetch when invalidated
    }),

    // 2. Get the accepted friends list
    getAcceptedFriends: builder.query<any, void>({
      query: () => `/friend/accepted-friends`,
      providesTags: ["Friends"],
    }),

    // ✅ 2. Send friend request
    addFriend: builder.mutation({
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
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Friends"], // 👈 triggers getFriends() refetch
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
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Friends"], // 👈 auto refresh friends state
    }),

    // ✅ 4. Remove / Cancel friend or request
    removeFriend: builder.mutation({
      query: (friendId: string) => ({
        url: `/friend/remove/${friendId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends"], // 👈 triggers getFriends() refetch
    }),

    // ✅ 5. Reject friend request
    rejectFriendRequest: builder.mutation({
      query: ({
        senderId,
        receiverId,
      }: {
        senderId: string;
        receiverId: string;
      }) => ({
        url: `/friend/reject-request`,
        method: "PUT",
        body: { senderId, receiverId },
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Friends"], // 👈 auto refresh friends state
    }),
  }),
});

export const {
  useGetFriendsQuery,
  useGetAcceptedFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
  useAcceptFriendRequestMutation,
  useRejectFriendRequestMutation,
} = friendApi;
