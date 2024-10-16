import { paths } from "@/lib/paths";
import { PLAYER } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminBookingsApi = createApi({
  reducerPath: "adminBookingsApi",
  tagTypes: ["Admin Bookings"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Players
    // getAllAdminPlayers: builder.query<PLAYER[], string>({
    //   query: () => `${paths.admin.players}`,
    //   providesTags: ["Admin Bookings"],
    // }),

    // Player by Id
    // getAdminPlayerById: builder.query<PLAYER, string>({
    //   query: (id) => `${paths.admin.players}/byid?id=${id}`,
    //   providesTags: ["Admin Bookings"],
    // }),

    // Admin Delete Players
    // AdminDeletePlayerById: builder.mutation<{ message: string }, any>({
    //   query: (id) => ({
    //     url: `${paths.admin.players}?id=${id}`,
    //     method: "DELETE",
    //   }),  
    //   invalidatesTags: ["Admin Bookings"],
    // }), 

    //Add Update Players
    AdminAddUpdateBookings: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `${paths.admin.bookings}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Bookings"],
    }),

    //Delete Multiple
    // deleteMultiplePlayersAdmin: builder.mutation<
    //   { message: string },
    //   { ids: string[] }
    // >({
    //   query: (body) => ({
    //     url: `${paths.admin.players}/deletemultiple`,
    //     method: "DELETE",
    //     body: body,
    //   }),   
    //   invalidatesTags: ["Admin Bookings"],
    // }),
  }),
});

export const {
  useAdminAddUpdateBookingsMutation,
} = adminBookingsApi;
