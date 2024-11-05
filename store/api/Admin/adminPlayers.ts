import { paths } from "@/lib/paths";
import { PLAYER } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminPlayersApi = createApi({
  reducerPath: "adminPlayersApi",
  tagTypes: ["Admin Players"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Players
    getAllAdminPlayers: builder.query<PLAYER[], string>({
      query: () => `${paths.admin.players}`,
      providesTags: ["Admin Players"],
    }),

       //Get All My Players
       getAllAdminMyPlayers: builder.query<PLAYER[], string>({
        query: () => `${paths.admin.players}/myplayers`,
        providesTags: ["Admin Players"],
      }),

    // Player by Id
    getAdminPlayerById: builder.query<PLAYER, string>({
      query: (id) => `${paths.admin.players}/byid?id=${id}`,
      providesTags: ["Admin Players"],
    }),

    // Admin Delete Players
    AdminDeletePlayerById: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `${paths.admin.players}?id=${id}`,
        method: "DELETE",
      }),  
      invalidatesTags: ["Admin Players"],
    }), 

    //Add Update Players
    AdminAddUpdatePlayers: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `${paths.admin.players}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Players"],
    }),

    //Delete Multiple
    deleteMultiplePlayersAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `${paths.admin.players}/deletemultiple`,
        method: "DELETE",
        body: body,
      }),   
      invalidatesTags: ["Admin Players"],
    }),
  }),
});

export const {
  useAdminAddUpdatePlayersMutation,
  useAdminDeletePlayerByIdMutation,
  useDeleteMultiplePlayersAdminMutation,
  useGetAdminPlayerByIdQuery,
  useGetAllAdminPlayersQuery,
  useGetAllAdminMyPlayersQuery
} = adminPlayersApi;
