// src/app/redux/features/auth/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IOtpVerify, SendOtpResponse, User } from "@/app/types/auth";
import { baseQueryWithReauth } from "../../base-query/baseQueryWithReauth";
import { SignInFormData } from "@/app/lib/schemas/authSchemas";

interface CurrentUser {
  user: User;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "User"],
  endpoints: (builder) => ({
    //** Get current user */
    currentUser: builder.query<CurrentUser, void>({
      query: () => "/user/current-user",
      providesTags: ["Auth", "User"],
    }),

    //** Update user profile */
    updateProfile: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/user/profile",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Register user */
    registerUser: builder.mutation<any, any>({
      query: (formData) => ({
        url: "/user/register",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Login user */
    login: builder.mutation<any, SignInFormData>({
      query: (body) => ({
        url: "/user/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Logout user */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/user/logout",
        method: "GET",
      }),
      invalidatesTags: ["Auth", "User"],
    }),

    //** Send OTP for password reset */
    sendOtp: builder.mutation<SendOtpResponse, { email: string }>({
      query: (body) => ({
        url: "/auth/send-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),

    // ** Verify OTP for password reset */
    verifyOtp: builder.mutation<
      SendOtpResponse,
      { email: string; otpCode: string }
    >({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useRegisterUserMutation,
  useLoginMutation,
  useLogoutMutation,
  useUpdateProfileMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
// useRefreshUserQuery
