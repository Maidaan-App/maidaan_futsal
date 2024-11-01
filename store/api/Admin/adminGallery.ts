import { GALLERY } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminGalleryApi = createApi({
  reducerPath: "adminGalleryApi",
  tagTypes: ["Admin Gallery"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Gallery
    getAllAdminGallery: builder.query<GALLERY[], string>({
      query: () => `admin/gallery`,
      providesTags: ["Admin Gallery"],
    }),

    //Gallery by Id
    getAdminGalleryById: builder.query<GALLERY, string>({
      query: (id) => `admin/gallery/byid?id=${id}`,
      providesTags: ["Admin Gallery"],
    }),

    //Admin Delete Gallery
    AdminDeleteGallery: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/gallery?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Gallery"],
    }),

    //Add Update Gallery
    AdminAddUpdateGallery: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/gallery`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Gallery"],
    }),

  }),
});

export const {
  useAdminAddUpdateGalleryMutation,
  useAdminDeleteGalleryMutation,
  useGetAdminGalleryByIdQuery,
  useGetAllAdminGalleryQuery,

} = adminGalleryApi;
