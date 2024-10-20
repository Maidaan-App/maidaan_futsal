"use client";
import { useGetAdminBookingByIdQuery } from "@/store/api/Admin/adminBookings";
import { useSearchParams } from "next/navigation";
import React from "react";

const BookingEditPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") as string;
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminBookingByIdQuery(id);
  console.log("ExistingDetail:", ExistingDetail);
  return <div>BookingEditPage</div>;
};

export default BookingEditPage;
