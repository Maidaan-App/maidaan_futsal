import React from "react";

import {FUTSALPROFILE, PLAYER } from "@/lib/types";
import AdminProfileEditForm from "./AdminProfileEditForm";

interface props {
  ProfileDetail: FUTSALPROFILE | undefined;
}

const GeneralContent = ({ ProfileDetail }: props) => {
  return <AdminProfileEditForm type={"Edit"} ExistingDetail={ProfileDetail} />;
};

export default GeneralContent;
