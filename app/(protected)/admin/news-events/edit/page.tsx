import React from "react";
import NewsEventBeforeAddEditForm from "../_components/NewsEventBeforeAddEditForm";
import { currentUser } from "@/lib/auth";

const Edit = async() => {
  const current_user = await currentUser();

  return (
      <NewsEventBeforeAddEditForm current_user={current_user}  />
  );
};

export default Edit;
