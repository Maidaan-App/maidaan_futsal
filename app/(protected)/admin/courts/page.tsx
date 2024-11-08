import React from "react";
import CourtsPage from "./_components/CourtsPage";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  const current_user = await currentUser();

  return <CourtsPage current_user={current_user} />;
};

export default Page;
