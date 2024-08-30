"use client";

import React from "react";
import ReusableTable, { Column } from "@/components/ReusableTable";
import { BillingType, PlayerType } from "@/components/PlayerRow";

const players = [
  {
    id: 1,
    unique: "#123",

    total: "Rs. 3545",
    date: "16th August, 2024",
    status: "Payed",
  },
  {
    id: 2,
    unique: "#124",

    total: "Rs. 3546",
    date: "17th August, 2024",

    status: "Not Payed",
  },
  {
    id: 3,
    unique: "#123",
    total: "Rs. 3547",
    date: "18th August, 2024",
    status: "Payed",
  },
];

const columns: Column<BillingType>[] = [
  { header: "#", accessor: "unique" },
  { header: "TOTAL", accessor: "total" },
  { header: "ISSUED DATE ", accessor: "date" },
  {
    header: "Status",
    accessor: "status",
    render: (item: any) => (
      <span
        className={`${
          item.status === "Payed"
            ? "bg-[#009858] bg-opacity-10 text-[#009858]"
            : item.status === "Pending"
            ? "bg-[#0A41CC] bg-opacity-[8%] text-[#0A41CC]"
            : item.status === "Not Payed"
            ? "bg-[#D8211D] bg-opacity-10 text-[#D8211D]"
            : "bg-gray-100 text-gray-800"
        } px-5 py-3 rounded-lg text-xs font-semibold`}
      >
        {item.status}
      </span>
    ),
  },
];

const filterTabs = ["All", "Payed", "Not Payed"];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const Test = () => {
  return (
    <div className="mt-10">
      <ReusableTable
        data={players}
        columns={columns}
        filterTabs={filterTabs}
        statusKey="status"
        sortOptions={sortOptions}
        searchKeys={["unique", "date", "total", "status"]}
      />
    </div>
  );
};

export default Test;
