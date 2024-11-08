import React from "react";
import { currentUser } from "@/lib/auth";
import CourtAddPage from "../_components/CourtAddPage";

const AddCourt = async () => {
  const current_user = await currentUser();

  return <CourtAddPage current_user={current_user} />;
};

export default AddCourt;
