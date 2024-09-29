import { poppins } from "@/app/lib/constants";
import React from "react";
import UploadCourtCard from "../Components/UploadCourtCard";
import CourtForm from "../Components/CourtForm";

const AddCourt = () => {
  return (
    <div className={`container my-5 flex flex-col gap-6 ${poppins.className}`}>
      <h2 className="text-[#232D42] font-medium text-2xl">Add a New Court</h2>
      <div className="flex md:flex-row flex-col justify-between gap-4">
        <div>
          <UploadCourtCard />
        </div>
        <div className=" ">
          <CourtForm />
        </div>
      </div>
    </div>
  );
};

export default AddCourt;
