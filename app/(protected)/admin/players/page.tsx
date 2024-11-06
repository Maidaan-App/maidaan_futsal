import React from "react";
import PlayerTable from "./_components/PlayerTable";
import { currentUser } from "@/lib/auth";

const Players = async() => {
  const current_user = await currentUser();

  return <PlayerTable current_user={current_user} />;
};

export default Players;
