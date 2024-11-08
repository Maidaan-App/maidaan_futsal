import React from "react";
import BookingEditPage from "../_components/BookingEditPage";
import { currentUser } from "@/lib/auth";

const EditBooking = async () => {
  const current_user = await currentUser();

  return <BookingEditPage current_user={current_user} />;
};

export default EditBooking;
