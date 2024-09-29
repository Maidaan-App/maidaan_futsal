import React from "react";

import AdminProfileEditForm from "./AdminProfileEditForm";
import { FUTSALPROFILE } from "@/lib/types";

interface props {
  ProfileDetail: FUTSALPROFILE | undefined;
  current_user:any;
}

const GeneralContent = ({ ProfileDetail,current_user }: props) => {
  return <AdminProfileEditForm ExistingDetail={ProfileDetail} current_user={current_user} />;
};

export default GeneralContent;
