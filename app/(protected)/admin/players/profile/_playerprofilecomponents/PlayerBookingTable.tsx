"use client";

import React from "react";
import { convertToHumanReadableNoTime } from "@/lib/helper";
import { adminBookingStatusTypes } from "@/lib/constants";
import PlayerBookingTableComponent, {
  Column,
} from "./PlayerBookingTableComponent";
import { BOOKING } from "@/lib/types";

const columns: Column<any>[] = [
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

interface props {
  BookingsData: BOOKING[] | undefined;
}

const PlayerBookingTable = ({ BookingsData }: props) => {
  return (
    <PlayerBookingTableComponent
      data={BookingsData ?? []}
      columns={columns}
      filterTabs={adminBookingStatusTypes}
      statusKey="status"
      sortOptions={sortOptions}
      searchKeys={["name", "phone"]}
    />
  );
};

export default PlayerBookingTable;
