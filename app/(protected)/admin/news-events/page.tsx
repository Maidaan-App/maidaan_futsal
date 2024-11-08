import React from "react";
import NewsEventsTable from "./_components/NewsEventsTable";
import { currentUser } from "@/lib/auth";

const NewsEvents = async () => {
  const current_user = await currentUser();

  return <NewsEventsTable current_user={current_user} />;
};

export default NewsEvents;
