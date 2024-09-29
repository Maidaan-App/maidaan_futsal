import React from "react";
import Tabs from "./_component/Tabs";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  const current_user = await currentUser();
  return (
    <div className="py-6 container bg-[#F4F4F5] min-h-screen">
      <Tabs current_user={current_user} />
    </div>
  );
};

export default Page;
