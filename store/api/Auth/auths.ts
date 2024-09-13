import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authsApi = createApi({
  reducerPath: "authsApi",
  tagTypes: ["Auth"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    AuthForgotPassword: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `auth/forgotpassword`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),

    AuthResetPassword: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `auth/resetpassword`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useAuthForgotPasswordMutation,
  useAuthResetPasswordMutation
} = authsApi;
