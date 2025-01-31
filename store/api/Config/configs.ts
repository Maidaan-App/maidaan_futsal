import { paths } from "@/lib/paths";
import {
  AUTHCONFIGURATION,
  CONTACTCONFIGURATION,
  LOGOCONFIGURATION,
} from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const configsApi = createApi({
  reducerPath: "configsApi",
  tagTypes: ["Auth Config", "Contact Config", "Logo Config"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAuthConfig: builder.query<AUTHCONFIGURATION, string>({
      query: () => `${paths.configuration.authConfiguration}`,
      providesTags: ["Auth Config"],
    }),

    getContactConfig: builder.query<CONTACTCONFIGURATION, string>({
      query: () => `${paths.configuration.contactConfiguration}`,
      providesTags: ["Contact Config"],
    }),

    getLogoConfig: builder.query<LOGOCONFIGURATION, string>({
      query: () => `${paths.configuration.logoConfiguration}`,
      providesTags: ["Logo Config"],
    }),
  }),
});

export const {
  useGetAuthConfigQuery,
  useGetContactConfigQuery,
  useGetLogoConfigQuery,
} = configsApi;
