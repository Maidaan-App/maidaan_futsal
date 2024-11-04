"use client";

import React from "react";
import { useGetAllAdminBookingsQuery } from "@/store/api/Admin/adminBookings";
import { convertToHumanReadable } from "@/lib/helper";
import BookingTableComponent, { Column } from "./BookingTableComponent";
import Loader from "@/components/Loader";
import ReusableTable from "@/components/ReusableTable";
import TableComponent from "@/components/TableComponent";

const columns: Column<any>[] = [
  { header: "Player Name", accessor: "name" },
  { header: "Phone", accessor: "phone" },
  {
    header: "Booked Date",
    accessor: "selectedDate",
    render: (item: any) => (
      <span>{convertToHumanReadable(item.selectedDate)}</span>
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
            ? "bg-[#0A41CC1A] bg-opacity-10 text-[#0A41CC]"
            : item.status === "Pre-Booked"
            ? "bg-[#FFAC30] bg-opacity-10 text-[#FFA500]"
            : item.status === "Booked"
            ? "bg-[#009858] bg-opacity-10 text-[#00A560]"
            : item.status === "Cancelled"
            ? "bg-[#D8211D] bg-opacity-10 text-[#D8211D]"
            : ""
        } px-5 py-3 rounded-lg text-xs font-semibold`}
      >
        {item.status}
      </span>
    ),
  },
];

const filterTabs = ["All", "Booked", "Pre-booked", "Reserved", "Cancelled"];

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
            <TableComponent
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
