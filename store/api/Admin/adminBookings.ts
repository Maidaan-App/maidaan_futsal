import { paths } from "@/lib/paths";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminBookingsApi = createApi({
  reducerPath: "adminBookingsApi",
  tagTypes: ["Admin Bookings"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Add Update Bookings
    AdminAddUpdateBookings: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `${paths.admin.bookings}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Bookings"],
    }),

    //Get All Bookings
    getAllAdminBookings: builder.query<any[], string>({
      query: () => `${paths.admin.bookings}`,
      providesTags: ["Admin Bookings"],
    }),

    // Booking by Id
    getAdminBookingById: builder.query<any, string>({
      query: (id) => `${paths.admin.bookings}/byid?id=${id}`,
      providesTags: ["Admin Bookings"],
    }),
  }),
});

export const {
  useAdminAddUpdateBookingsMutation,
  useGetAllAdminBookingsQuery,
  useGetAdminBookingByIdQuery
} = adminBookingsApi;
