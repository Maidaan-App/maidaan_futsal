import React from "react";
import PlayerBookingTable from "./PlayerBookingTable";
import { BOOKING } from "@/lib/types";

interface props {
  BookingsData: BOOKING[] | undefined;
}

const UpcomingBookings = ({ BookingsData }: props) => {
  return (
    <div>
      <PlayerBookingTable BookingsData={BookingsData} />
    </div>
  );
};

export default UpcomingBookings;
