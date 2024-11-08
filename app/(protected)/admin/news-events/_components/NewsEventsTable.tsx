"use client";

import React from "react";
import { convertToHumanReadable } from "@/lib/helper";
import Loader from "@/components/Loader";
import NewsEventsTableComponent, { Column } from "./NewsEventsTableComponent";
import { useGetAllAdminNewsEventsQuery } from "@/store/api/Admin/adminNewsEvents";
import { MINIOURL } from "@/lib/constants";
import moment from "moment";
import { Layout } from "@/components/custom/layout";
import { Search } from "@/components/search";
import ThemeSwitch from "@/components/theme-switch";
import { UserNav } from "@/components/user-nav";

const columns: Column<any>[] = [
  {
    header: "Title",
    accessor: "title",
    render: (data) => (
      <div className="flex items-center gap-2">
        {data.image && (
          <img
            src={`${MINIOURL}${data.image}`}
            alt={data.name}
            className="w-8 h-8 rounded-sm object-cover"
          />
        )}
        <span>{data.title}</span>
      </div>
    ),
  },
  // {
  //   header: "Added Date",
  //   accessor: "createdDate",
  //   render: (item: any) => (
  //     <span>{convertToHumanReadable(item.createdDate)}</span>
  //   ),
  // },
  {
    header: "Added Date",
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
];

const filterTabs = ["All"];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const NewsEventsTable = ({current_user}:any) => {
  const { data: NewsEventsData, isLoading: NewsEventsDataLoading } =
    useGetAllAdminNewsEventsQuery("");
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
        <h1 className="text-[#232D42] font-medium text-[1.5rem] my-3 px-3 lg:px-0">
          News & Events
        </h1>
        {NewsEventsDataLoading ? (
          <div className="flex h-[80vh] items-center justify-center">
            <Loader />
          </div>
        ) : (
          <>
            <NewsEventsTableComponent
              data={NewsEventsData ?? []}
              columns={columns}
              filterTabs={filterTabs}
              statusKey="status"
              sortOptions={sortOptions}
              searchKeys={["title"]}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default NewsEventsTable;
