import React from "react";
import PlayerReportTable from "./PlayerReportTable";
import { PLAYERREPORT } from "@/lib/types";

interface props {
  reportsData: PLAYERREPORT[] | undefined;
  ExistingDetail: any;
}

const Reports = ({ reportsData, ExistingDetail }: props) => {
  return (
    <div>
      <PlayerReportTable
        reportsData={reportsData}
        ExistingDetail={ExistingDetail}
      />
    </div>
  );
};

export default Reports;
