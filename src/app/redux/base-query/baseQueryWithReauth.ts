// src/app/redux/baseQueryWithReauth.ts
import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

let isRefreshing = false;
let failedQueue: Array<{ resolve: () => void; reject: (err: any) => void }> =
  [];

const processQueue = (error: any = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve();
  });
  failedQueue = [];
};

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    credentials: "include", // cookies sent automatically
  });

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshResult = await baseQuery(
          { url: "/user/refresh-token", method: "POST" },
          api,
          extraOptions
        );

        if (refreshResult.error) {
          // refresh failed → redirect to login
          if (typeof window !== "undefined")
            window.location.href = "/auth/signin";
          return refreshResult;
        }

        processQueue();
      } catch (err) {
        processQueue(err);
        return { error: err as any };
      } finally {
        isRefreshing = false;
      }
    } else {
      // Queue requests while refreshing
      await new Promise<void>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      });
    }

    // Retry original request
    result = await baseQuery(args, api, extraOptions);
  }

  return result;
};
