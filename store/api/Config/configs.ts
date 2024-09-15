import { paths } from "@/lib/paths";
import { AUTHCONFIGURATION } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const configsApi = createApi({
  reducerPath: "configsApi",
  tagTypes: ["Auth Config"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAuthConfig: builder.query<AUTHCONFIGURATION, string>({
      query: () => `${paths.configuration.authConfiguration}`,
      providesTags: ["Auth Config"],
    }),
  }),
});

export const { useGetAuthConfigQuery } = configsApi;
