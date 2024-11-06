import React from "react";
import BookingTable from "./_components/BookingTable";
import { currentUser } from "@/lib/auth";

const Bookings = async() => {
  const current_user = await currentUser();

  return <BookingTable current_user={current_user}/>;
};

export default Bookings;
