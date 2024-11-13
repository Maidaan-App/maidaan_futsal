"use client";

import React from "react";
import { PLAYER } from "@/lib/types";
import { useGetAllAdminMyPlayersQuery } from "@/store/api/Admin/adminPlayers";
import ReusableTable, { Column } from "@/components/ReusableTable";
import {
  convertToHumanReadable,
  convertToHumanReadableNoTime,
} from "@/lib/helper";
import { MINIOURL } from "@/lib/constants";
import Loader from "@/components/Loader";
import moment from "moment";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";
import Link from "next/link";
import { paths } from "@/lib/paths";

const columns: Column<PLAYER>[] = [
  {
    header: "Name",
    accessor: "name",
    render: (data) => (
      <Link
        href={`${paths.admin.players}/profile?id=${data._id}`}
        className="flex items-center gap-2"
      >
        {data.image ? (
          <img
            src={`${MINIOURL}${data.image}`}
            alt={data.name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
            {data.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="flex flex-col">
          <p>{data.name}</p>
          <p className="text-[#919eab] text-sm">{data?.email}</p>
        </span>
      </Link>
    ),
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
    render: (item: any) => {
      const date = moment(item.createdDate).format("MMM Do YYYY");
      const time = moment(item.createdDate).format("h:mm:ss A");

      return (
        <div>
          <span>{date}</span>
          <br />
          <span className="text-[#919eab] text-sm">{time}</span>
        </div>
      );
    },
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

const PlayerTable = ({ current_user }: any) => {
  const { data: PlayersData, isLoading: PlayersDataLoading } =
    useGetAllAdminMyPlayersQuery("");

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
        {PlayersDataLoading ? (
          <div className="flex h-[80vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <h1 className="text-[#232D42] font-medium text-[1.5rem] my-3 px-3 lg:px-0">
              Players
            </h1>
            <ReusableTable
              data={PlayersData ?? []}
              columns={columns}
              filterTabs={filterTabs}
              statusKey="status"
              sortOptions={sortOptions}
              searchKeys={["name", "email", "phone", "address"]}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default PlayerTable;
