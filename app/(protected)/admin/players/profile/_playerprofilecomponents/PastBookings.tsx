import React from "react";
import PlayerBookingTable from "./PlayerBookingTable";
import { BOOKING } from "@/lib/types";

interface props {
  BookingsData: BOOKING[] | undefined;
}
const PastBookings = ({ BookingsData }: props) => {
  return (
    <div>
      <PlayerBookingTable BookingsData={BookingsData} />
    </div>
  );
};

export default PastBookings;
