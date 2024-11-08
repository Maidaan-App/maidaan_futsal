import React from "react";
import CourtBeforeAddEditForm from "../_components/CourtBeforeAddEditForm";
import { currentUser } from "@/lib/auth";

const EditCourt = async() => {
  const current_user = await currentUser();

  return <CourtBeforeAddEditForm current_user={current_user} />;
};

export default EditCourt;
