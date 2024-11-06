import React from "react";
import AmenitiesPage from "./_components/AmenitiesPage";
import { currentUser } from "@/lib/auth";

const Page =async () => {
  const current_user = await currentUser();

  return <AmenitiesPage current_user={current_user} />;
};

export default Page;
