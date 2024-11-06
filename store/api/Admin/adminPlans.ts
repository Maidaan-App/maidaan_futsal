import { paths } from "@/lib/paths";
import { COURT, PLANS } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminPlansApi = createApi({
  reducerPath: "adminPlansApi",
  tagTypes: ["Admin Plans"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAllAdminPlans: builder.query<PLANS[], string>({
      query: () => `${paths.admin.plans}`,
      providesTags: ["Admin Plans"],
    }),

    getAdminMyPlan: builder.query<PLANS, string>({
      query: () => `${paths.admin.plans}`,
      providesTags: ["Admin Plans"],
    }),
  }),
});

export const {
  useGetAdminMyPlanQuery,
  useGetAllAdminPlansQuery
} = adminPlansApi;
