import React from "react";
import { currentUser } from "@/lib/auth";
import PlayerAddPage from "../_components/PlayerAddPage";

const Page = async () => {
  const current_user = await currentUser();

  return <PlayerAddPage current_user={current_user} />;
};

export default Page;
