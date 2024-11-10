import { paths } from "@/lib/paths";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminDashboardApi = createApi({
  reducerPath: "adminDashboardApi",
  tagTypes: ["Admin Dashboard"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<any, string>({
      query: () => `${paths.admin.dashboardapi}`,
      providesTags: ["Admin Dashboard"],
    }),
  }),
});

export const { useGetAdminDashboardQuery } = adminDashboardApi;
