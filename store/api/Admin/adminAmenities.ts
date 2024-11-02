import { paths } from "@/lib/paths";
import { AMENITIES } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminAmenities = createApi({
  reducerPath: "adminAmenities",
  tagTypes: ["Admin Amenities"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Amenities
    getAllAdminAmenities: builder.query<AMENITIES, string>({
      query: () => `${paths.admin.amenities}`,
      providesTags: ["Admin Amenities"],
    }),

    //Add Update Amenities
    AdminAddUpdateAmenities: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `${paths.admin.amenities}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Amenities"],
    }),
  }),
});

export const {
  useAdminAddUpdateAmenitiesMutation,
  useGetAllAdminAmenitiesQuery,
} = adminAmenities;
