"use client";

import React, { useState } from "react";
import { PLAYER } from "@/lib/types";
import { useGetAllAdminPlayersQuery } from "@/store/api/Admin/adminPlayers";
import ReusableTable, { Column } from "@/components/ReusableTable";
import { convertToHumanReadable } from "@/lib/helper";
import { MINIOURL } from "@/lib/constants";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Loader from "@/components/Loader";

const columns: Column<PLAYER>[] = [
  {
    header: "Name",
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

  {
    header: "Email",
    accessor: "email",
    render: (data) =>
      data.email ? data.email : <div className="flex ">-</div>,
  },
  { header: "Phone", accessor: "phone" },

  {
    header: "Address",
    accessor: "address",
    render: (data) =>
      data.address ? data.address : <div className="flex ">-</div>,
  },
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
          item.status === "enrolled"
            ? "bg-[#009858] bg-opacity-10 text-[#009858]"
            : item.status === "pending"
            ? "bg-[#0A41CC] bg-opacity-[8%] text-[#0A41CC]"
            : item.status === "blocked"
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

  console.log("PlayerData", PlayersData);
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
