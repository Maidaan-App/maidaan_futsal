import React from "react";
import { currentUser } from "@/lib/auth";
import PlayerProfileTabs from "./_playerprofilecomponents/PlayerProfileTabs";

const Page = async () => {
  const current_user = await currentUser();
  return <PlayerProfileTabs current_user={current_user} />;
};

export default Page;
