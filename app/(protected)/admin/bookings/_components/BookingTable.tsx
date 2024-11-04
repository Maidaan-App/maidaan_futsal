"use client";

import React from "react";
import { useGetAllAdminBookingsQuery } from "@/store/api/Admin/adminBookings";
import { convertToHumanReadable, convertToHumanReadableNoTime } from "@/lib/helper";
import BookingTableComponent, { Column } from "./BookingTableComponent";
import Loader from "@/components/Loader";
import { MINIOURL } from "@/lib/constants";

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
            className="w-8 h-8 rounded-full"
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
            : ""
        } px-5 py-3 rounded-lg text-xs font-semibold`}
      >
        {item.status}
      </span>
    ),
  },
];

const filterTabs = ["All", "Reserved", "Pre-Booked", "Booked"];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const BookingTable = () => {
  const { data: BookingsData, isLoading: BookingsDataLoading } =
    useGetAllAdminBookingsQuery("");
  return (
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
          {BookingsData && (
            <BookingTableComponent
              data={BookingsData}
              columns={columns}
              filterTabs={filterTabs}
              statusKey="status"
              sortOptions={sortOptions}
              searchKeys={["name", "phone", "address"]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default BookingTable;
