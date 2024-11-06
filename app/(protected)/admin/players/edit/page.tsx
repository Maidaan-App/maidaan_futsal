import React from "react";
import { currentUser } from "@/lib/auth";
import PlayerEditPage from "../_components/PlayerEditPage";

const Page = async () => {
  const current_user = await currentUser();

  return <PlayerEditPage current_user={current_user} />;
};

export default Page;
