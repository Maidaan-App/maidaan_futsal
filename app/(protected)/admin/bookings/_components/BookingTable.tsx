"use client";

import React from "react";
import { useGetAllAdminBookingsQuery } from "@/store/api/Admin/adminBookings";
import { convertToHumanReadable } from "@/lib/helper";
import BookingTableComponent, { Column } from "./BookingTableComponent";

const columns: Column<any>[] = [
  { header: "Player Name", accessor: "name" },
  { header: "Phone", accessor: "phone" },
  {
    header: "Booked Date",
    accessor: "selectedDate",
    render: (item: any) => (
      <span>
        {convertToHumanReadable(item.selectedDate)}
      </span>
    ),
  },
  {
    header: "Time Slots",
    accessor: "selectedslots",
    render: (item: any) => (
      <span style={{ whiteSpace: "pre-wrap" }}>
        {item.selectedslots?.length > 0
          ? item.selectedslots.join("\n") // Join slots with a newline
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
            : "bg-gray-100 text-gray-800"
        } px-5 py-3 rounded-lg text-xs font-semibold`}
      >
        {item.status}
      </span>
    ),
  },
];

const filterTabs = ["All", "Active", "Pending", "Banned", "Rejected"];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const BookingTable = () => {
  const { data: BookingsData, isLoading: BookingsDataLoading } =
  useGetAllAdminBookingsQuery("");
  console.log("BookingsData:",BookingsData)
  return (
    <div className="md:p-5">
      <h1 className="text-[#232D42] font-medium text-[1.5rem] my-3 px-3 lg:px-0">
        Bookings
      </h1>
      {BookingsDataLoading ? (
        <div>
          <div className="loader"></div>
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

