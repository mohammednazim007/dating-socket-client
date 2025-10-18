import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const friendApi = createApi({
  reducerPath: "friendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // your API base
    prepareHeaders: (headers, { getState }) => {
      // 🔐 Optional: attach JWT token from auth state if needed
      const token = (getState() as any)?.auth?.user?.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),

  tagTypes: ["Friends"], // 🏷 used for cache invalidation

  endpoints: (builder) => ({
    // ✅ 1. Get all friends
    getFriends: builder.query<any, void>({
      query: () => `/friend/all-friends`,
      providesTags: ["Friends"],
    }),

    // ✅ 2. Add a friend
    addFriend: builder.mutation({
      query: (friendId: string) => ({
        url: `/friend/add/${friendId}`,
        method: "POST",
      }),
      invalidatesTags: ["Friends"], // 👈 auto refetch list after add
    }),

    // ✅ 3. Remove a friend
    removeFriend: builder.mutation({
      query: (friendId: string) => ({
        url: `/friend/remove/${friendId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Friends"], // 👈 auto refetch list after remove
    }),
  }),
});

// 🚀 Export React hooks
export const {
  useGetFriendsQuery,
  useAddFriendMutation,
  useRemoveFriendMutation,
} = friendApi;
