"use client";

import React, { useState } from "react";
import { PLAYER } from "@/lib/types";
import { useGetAllAdminPlayersQuery } from "@/store/api/Admin/adminPlayers";
import ReusableTable, { Column } from "@/components/ReusableTable";
import { convertToHumanReadable } from "@/lib/helper";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Loader from "@/components/Loader";

const columns: Column<PLAYER>[] = [
  { header: "Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: "Phone", accessor: "phone" },
  { header: "Address", accessor: "address" },
  {
    header: "Created Date",
    accessor: "createdDate",
    render: (item: any) => (
      <span>{convertToHumanReadable(item.createdDate)}</span>
    ),
  },

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
        } px-5 py-3 rounded-lg text-xs font-semibold capitalize`}
      >
        {item.status}
      </span>
    ),
  },
];

const filterTabs = ["All", "enrolled", "pending", "blocked"];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const PlayerTable = () => {
  const { data: PlayersData, isLoading: PlayersDataLoading } =
    useGetAllAdminPlayersQuery("");
  return (
    <div className="md:p-5">
      {PlayersDataLoading ? (
        <div className="flex h-[80vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-[#232D42] font-medium text-[1.5rem] my-3 px-3 lg:px-0">
            Players
          </h1>

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
