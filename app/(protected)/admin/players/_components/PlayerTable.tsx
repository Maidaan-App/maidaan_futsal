"use client";

import React from "react";
import { PLAYER } from "@/lib/types";
import { useGetAllAdminPlayersQuery } from "@/store/api/Admin/adminPlayers";
import ReusableTable, { Column } from "@/components/ReusableTable";

const columns: Column<PLAYER>[] = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Address", accessor: "address" },
  { header: "Created Date", accessor: "createdDate" },
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
  const { data: PlayersData, isLoading: PlayersDataLoading } =
    useGetAllAdminPlayersQuery("");
  return (
    <div className="md:p-5">
      <h1 className="text-[#232D42] font-medium text-[1.5rem] my-3 px-3 lg:px-0">
        Players
      </h1>
      {PlayersDataLoading ? (
        <div>
          <div className="loader"></div>
        </div>
      ) : (
        <>
          {PlayersData && (
            <ReusableTable
              data={PlayersData}
              columns={columns}
              filterTabs={filterTabs}
              statusKey="status"
              sortOptions={sortOptions}
              searchKeys={["name", "email", "phone", "address"]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PlayerTable;
