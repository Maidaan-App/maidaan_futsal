import { paths } from "@/lib/paths";
import { BILLINGS } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminBillingspi = createApi({
  reducerPath: "adminBillingspi",
  tagTypes: ["Admin Billings"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    // Billing by Id
    getAdminMyBillingById: builder.query<BILLINGS, string>({
      query: () => `${paths.admin.billings}`,
      providesTags: ["Admin Billings"],
    }),

    //Add Update Billing
    AdminAddUpdateBilling: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `${paths.admin.billings}`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Billings"],
    }),

  }),
});

export const {
  useAdminAddUpdateBillingMutation,
  useGetAdminMyBillingByIdQuery
} = adminBillingspi;
