import React from "react";
import { currentUser } from "@/lib/auth";
import NewsEventAddPage from "../_components/NewsEventAddPage";

const AddNewsEvent = async () => {
  const current_user = await currentUser();

  return <NewsEventAddPage current_user={current_user} />;
};

export default AddNewsEvent;
