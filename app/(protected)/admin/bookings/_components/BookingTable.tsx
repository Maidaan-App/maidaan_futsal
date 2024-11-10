"use client";

import React from "react";
import { useGetAllAdminBookingsQuery } from "@/store/api/Admin/adminBookings";
import {
  convertToHumanReadableNoTime,
} from "@/lib/helper";
import BookingTableComponent, { Column } from "./BookingTableComponent";
import Loader from "@/components/Loader";
import { adminBookingStatusTypes, MINIOURL } from "@/lib/constants";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

const columns: Column<any>[] = [
  {
    header: "Player Name",
    accessor: "name",
    render: (data) => (
      <div className="flex items-center gap-2">
        {data.image ? (
          <img
            src={`${MINIOURL}${data.image}`}
            alt={data.name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
            {data.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span>{data.name}</span>
      </div>
    ),
  },
  { header: "Phone", accessor: "phone" },
  {
    header: "Booked Date",
    accessor: "selectedDate",
    render: (item: any) => (
      <span>{convertToHumanReadableNoTime(item.selectedDate)}</span>
    ),
  },
  {
    header: "Time Slots",
    accessor: "selectedslots",
    render: (item: any) => (
      <span style={{ whiteSpace: "pre-wrap" }}>
        {item.selectedslots?.length > 0
          ? item.selectedslots.join("\n")
          : "No slots selected"}
      </span>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    render: (item: any) => (
      <span
        className={`${
          item.status === "Reserved"
            ? "bg-[#009858] bg-opacity-10 text-[#009858]"
            : item.status === "Pre-Booked"
            ? "bg-[#0A41CC] bg-opacity-[8%] text-[#0A41CC]"
            : item.status === "Booked"
            ? "bg-[#D8211D] bg-opacity-10 text-[#D8211D]"
            : item.status === "Completed"
            ? "bg-[#009858] bg-opacity-10 text-[#1e855a]"
            : item.status === "Cancelled"
            ? "bg-[#D8211D] bg-opacity-10 text-[#ce3e3c]"
            : ""
        } px-5 py-3 rounded-lg text-xs font-semibold`}
      >
        {item.status}
      </span>
    ),
  },
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const BookingTable = ({ current_user }: any) => {
  const { data: BookingsData, isLoading: BookingsDataLoading } =
    useGetAllAdminBookingsQuery("");
  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <Layout.Header sticky>
        <Search />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav current_user={current_user} />
        </div>
      </Layout.Header>
      <div className="md:p-5">
        <h1 className="text-[#232D42] font-medium text-[1.5rem] my-3 px-3 lg:px-0">
          Bookings
        </h1>
        {BookingsDataLoading ? (
          <div className="flex h-[80vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <BookingTableComponent
              data={BookingsData ?? []}
              columns={columns}
              filterTabs={adminBookingStatusTypes}
              statusKey="status"
              sortOptions={sortOptions}
              searchKeys={["name", "phone"]}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default BookingTable;
