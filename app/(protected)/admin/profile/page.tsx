import React from "react";
import Tabs from "./_component/Tabs";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  const current_user = await currentUser();
  return <Tabs current_user={current_user} />;
};

export default Page;
