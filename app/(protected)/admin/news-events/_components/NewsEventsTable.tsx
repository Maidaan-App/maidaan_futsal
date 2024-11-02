"use client";

import React from "react";
import { useGetAllAdminBookingsQuery } from "@/store/api/Admin/adminBookings";
import { convertToHumanReadable } from "@/lib/helper";
import Loader from "@/components/Loader";
import NewsEventsTableComponent, { Column } from "./NewsEventsTableComponent";
import { useGetAllAdminNewsEventsQuery } from "@/store/api/Admin/adminNewsEvents";
import { MINIOURL } from "@/lib/constants";

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
  {
    header: "Added Date",
    accessor: "createdDate",
    render: (item: any) => (
      <span>{convertToHumanReadable(item.createdDate)}</span>
    ),
  },
];

const filterTabs = ["All"];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

const NewsEventsTable = () => {
  const { data: NewsEventsData, isLoading: NewsEventsDataLoading } =
    useGetAllAdminNewsEventsQuery("");
  console.log("NewsEventsData:", NewsEventsData);
  return (
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
          {NewsEventsData && (
            <NewsEventsTableComponent
              data={NewsEventsData}
              columns={columns}
              filterTabs={filterTabs}
              statusKey="status"
              sortOptions={sortOptions}
              searchKeys={["title"]}
            />
          )}
        </>
      )}
    </div>
  );
};

export default NewsEventsTable;
