import { paths } from "@/lib/paths";
import { FUTSALPROFILE } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminProfileApi = createApi({
  reducerPath: "adminProfileApi",
  tagTypes: ["Admin Profile"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    // // Profile by Id
    getAdminMyPlayerById: builder.query<FUTSALPROFILE, string>({
      query: () => `${paths.admin.profile}`,
      providesTags: ["Admin Profile"],
    }),

    //Add Update Profile
    AdminAddUpdateProfile: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `${paths.admin.profile}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Profile"],
    }),
  }),
});

export const {
  useAdminAddUpdateProfileMutation,
  useGetAdminMyPlayerByIdQuery,
} = adminProfileApi;
