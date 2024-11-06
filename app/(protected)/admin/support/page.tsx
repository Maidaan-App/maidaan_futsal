import React from "react";
import FutsalSupport from "./_components/FutsalSupport";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  const current_user = await currentUser();

  return <FutsalSupport current_user={current_user} />;
};

export default Page;
