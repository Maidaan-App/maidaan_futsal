import { paths } from "@/lib/paths";
import { FUTSALPROFILE, GALLERY } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicFutsalApi = createApi({
  reducerPath: "publicFutsalApi",
  tagTypes: ["Public Futsal"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Profile
    getPublicFutsalProfile: builder.query<FUTSALPROFILE, string>({
      query: () => `${paths.public.profile}`,
      providesTags: ["Public Futsal"],
    }),

    //Gallery
    getPublicFutsalGallery: builder.query<GALLERY[], string>({
      query: () => `${paths.public.gallery}`,
      providesTags: ["Public Futsal"],
    }),
  }),
});

export const {
  useGetPublicFutsalProfileQuery,
  useGetPublicFutsalGalleryQuery,
} = publicFutsalApi;
