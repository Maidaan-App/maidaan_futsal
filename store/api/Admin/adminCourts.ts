import { paths } from "@/lib/paths";
import { COURT } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminCourtsApi = createApi({
  reducerPath: "adminCourtsApi",
  tagTypes: ["Admin Courts"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Courts
    getAllAdminCourts: builder.query<COURT[], string>({
      query: () => `${paths.admin.courts}`,
      providesTags: ["Admin Courts"],
    }),

    // Court by Id
    getAdminCourtById: builder.query<COURT, string>({
      query: (id) => `${paths.admin.courts}/byid?id=${id}`,
      providesTags: ["Admin Courts"],
    }),

    // Admin Delete Courts
    AdminDeleteCourtById: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `${paths.admin.courts}?id=${id}`,
        method: "DELETE",
      }),  
      invalidatesTags: ["Admin Courts"],
    }), 

    //Add Update Courts
    AdminAddUpdateCourts: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `${paths.admin.courts}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Courts"],
    }),
  }),
});

export const {
  useAdminAddUpdateCourtsMutation,
  useGetAllAdminCourtsQuery,
  useAdminDeleteCourtByIdMutation,
  useGetAdminCourtByIdQuery
} = adminCourtsApi;
