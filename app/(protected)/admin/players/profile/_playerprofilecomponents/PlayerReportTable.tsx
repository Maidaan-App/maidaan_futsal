"use client";

import React from "react";
import { convertToHumanReadableNoTime } from "@/lib/helper";
import { adminBookingStatusTypes, adminReportCategoryTypes } from "@/lib/constants";
import PlayerBookingTableComponent, {
  Column,
} from "./PlayerBookingTableComponent";
import { BOOKING, PLAYERREPORT } from "@/lib/types";
import PlayerReportTableComponent from "./PlayerReportTableComponent";

const columns: Column<PLAYERREPORT>[] = [
  {
    header: "Category",
    accessor: "category",
    render: (item: any) => (
      <span>{item.category}</span>
    ),
  },

  {
    header: "Description",
    accessor: "description",
    render: (item: any) => (
      <span>{item.description}</span>
    ),
  },

  {
    header: "Reported Date",
    accessor: "reportedDate",
    render: (item: any) => (
      <span>{convertToHumanReadableNoTime(item.reportedDate)}</span>
    ),
  },
  
  
];

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  
];

interface props {
  reportsData: PLAYERREPORT[] | undefined;
  ExistingDetail:any;
}

const PlayerReportTable = ({ reportsData,ExistingDetail }: props) => {
  return (
    <PlayerReportTableComponent
      data={reportsData ?? []}
      ExistingDetail={ExistingDetail}
      columns={columns}
      filterTabs={adminReportCategoryTypes}
      statusKey="category"
      sortOptions={sortOptions}
      searchKeys={["category", "description"]}
    />
  );
};

export default PlayerReportTable;
