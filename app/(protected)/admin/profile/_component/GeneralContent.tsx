import React from "react";

import AdminProfileEditForm from "./AdminProfileEditForm";
import { FUTSALPROFILE } from "@/lib/types";

interface props {
  ProfileDetail: FUTSALPROFILE | undefined;
}

const GeneralContent = ({ ProfileDetail }: props) => {
  return <AdminProfileEditForm ExistingDetail={ProfileDetail} />;
};

export default GeneralContent;
