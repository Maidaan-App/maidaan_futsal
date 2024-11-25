import { paths } from "@/lib/paths";
import { AMENITIES, FUTSALPROFILE, GALLERY, NEWSEVENT } from "@/lib/types";
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
      query: () => `${paths.publicApi.profile}`,
      providesTags: ["Public Futsal"],
    }),

    //Gallery
    getPublicFutsalGallery: builder.query<GALLERY[], string>({
      query: () => `${paths.publicApi.gallery}`,
      providesTags: ["Public Futsal"],
    }),

    //Amenities
    getPublicFutsalAmenities: builder.query<AMENITIES, string>({
      query: () => `${paths.publicApi.amenities}`,
      providesTags: ["Public Futsal"],
    }),

    //News Events
    getPublicFutsalNewsEvents: builder.query<NEWSEVENT[], string>({
      query: () => `${paths.publicApi.newsEvents}`,
      providesTags: ["Public Futsal"],
    }),

    // Get News Event by slug
    getAdminNewseventBySlug: builder.query<NEWSEVENT, string>({
      query: (slug) => `${paths.publicApi.newsEvents}/byslug?slug=${slug}`,
      providesTags: ["Public Futsal"],
    }),
  }),
});

export const {
  useGetPublicFutsalProfileQuery,
  useGetPublicFutsalGalleryQuery,
  useGetPublicFutsalAmenitiesQuery,
  useGetPublicFutsalNewsEventsQuery,
  useGetAdminNewseventBySlugQuery,
} = publicFutsalApi;
