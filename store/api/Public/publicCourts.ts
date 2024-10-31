import { paths } from "@/lib/paths";
import { COURT } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicCourtsApi = createApi({
  reducerPath: "publicCourtsApi",
  tagTypes: ["Public Courts"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Courts
    getAllPublicCourts: builder.query<COURT[], string>({
      query: () => `${paths.public.courts}`,
      providesTags: ["Public Courts"],
    }),

    // // Court by Id
    // getAdminCourtById: builder.query<COURT, string>({
    //   query: (id) => `${paths.admin.courts}/byid?id=${id}`,
    //   providesTags: ["Admin Courts"],
    // }),
  }),
});

export const { useGetAllPublicCourtsQuery } = publicCourtsApi;
