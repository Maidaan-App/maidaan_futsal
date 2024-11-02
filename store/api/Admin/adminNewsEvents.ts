import { paths } from "@/lib/paths";
import { NEWSEVENT } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminNewsEvents = createApi({
  reducerPath: "adminNewsEvents",
  tagTypes: ["Admin NewsEvent"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All NewsEvents
    getAllAdminNewsEvents: builder.query<NEWSEVENT[], string>({
      query: () => `${paths.admin.newsevents}`,
      providesTags: ["Admin NewsEvent"],
    }),

    // NEWSEVENT by Id
    getAdminNEWSEVENTById: builder.query<NEWSEVENT, string>({
      query: (id) => `${paths.admin.newsevents}/byid?id=${id}`,
      providesTags: ["Admin NewsEvent"],
    }),

    // Admin Delete NewsEvents
    AdminDeleteNEWSEVENTById: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `${paths.admin.newsevents}?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin NewsEvent"],
    }),

    //Add Update NewsEvents
    AdminAddUpdateNewsEvents: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `${paths.admin.newsevents}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin NewsEvent"],
    }),

    //Delete Multiple
    deleteMultipleNewsEventsAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `${paths.admin.newsevents}/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin NewsEvent"],
    }),
  }),
});

export const {
  useAdminAddUpdateNewsEventsMutation,
  useAdminDeleteNEWSEVENTByIdMutation,
  useDeleteMultipleNewsEventsAdminMutation,
  useGetAdminNEWSEVENTByIdQuery,
  useGetAllAdminNewsEventsQuery,
} = adminNewsEvents;
