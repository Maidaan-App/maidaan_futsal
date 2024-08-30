"use client";

import React from "react";
import ReusableTable, { Column } from "./ReusableTable";
import { PlayerType } from "./PlayerRow";
import ActionMenu from "./ActionMenu";

const players = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    contact: "+977 9812345678",
    address: "Kathmandu, Nepal",
    date: "16th August, 2024",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    contact: "+977 9812345679",
    address: "Pokhara, Nepal",
    date: "17th August, 2024",

    status: "Pending",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob@example.com",
    contact: "+977 9812345680",
    address: "Lalitpur, Nepal",
    date: "18th August, 2024",
    status: "Banned",
  },
];

const columns: Column<PlayerType>[] = [
  { header: "#", accessor: "name" },
  { header: "Total", accessor: "email" },
  { header: "ISSUED DATE", accessor: "contact" },
  { header: "STATUS", accessor: "address" },
  { header: "ACTION", accessor: "date" },
  {
    header: "Status",
    accessor: "status",
    render: (item: any) => (
      <span
        className={`${
          item.status === "Active"
            ? "bg-[#009858] bg-opacity-10 text-[#009858]"
            : item.status === "Pending"
            ? "bg-[#0A41CC] bg-opacity-[8%] text-[#0A41CC]"
            : item.status === "Banned"
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

const PlayerTable = () => {
  return (
    <div className="mt-10">
      <ReusableTable
        data={players}
        columns={columns}
        filterTabs={filterTabs}
        statusKey="status"
        sortOptions={sortOptions}
        searchKeys={["name", "email", "contact", "address"]}
      />
    </div>
  );
};

export default PlayerTable;
