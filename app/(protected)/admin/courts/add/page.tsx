import { poppins } from "@/lib/constants";
import React from "react";
import CourtAddEditForm from "../_components/CourtAddEditForm";

const AddCourt = () => {
  return (
    <div className={`container my-5 flex flex-col gap-6 ${poppins.className}`}>
      <CourtAddEditForm type={"Add"} />
    </div>
  );
};

export default AddCourt;
