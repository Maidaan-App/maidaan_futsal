import React from "react";
import { currentUser } from "@/lib/auth";
import BookingAddPage from "../_components/BookingAddPage";

const Page = async () => {
  const current_user = await currentUser();

  return <BookingAddPage current_user={current_user} />;
};

export default Page;
