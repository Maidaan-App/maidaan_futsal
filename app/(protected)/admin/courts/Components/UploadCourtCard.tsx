"use client";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch"; // ShadCN Switch
import Image from "next/image";
import { poppins } from "@/app/lib/constants";

const UploadCourtCard = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <div
      className={`bg-white rounded-lg  p-4 lg:w-[300px] lg:h-[420px] flex flex-col gap-5  ${poppins.className} `}
    >
      {/* Status Badge */}
      <div className=" flex justify-end">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            isActive
              ? "bg-green-100 text-[#00A76F]"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Dropzone */}
      <div className="border-dashed border border-[#28353D1A] rounded-xl px-5 py-6 flex flex-col items-center justify-center lg:w-[262px] lg:h-[208px]">
        {/* Placeholder Image */}
        <Image
          src="/images/courtAdd.png" // Replace with your placeholder image
          alt="Cover"
          width={150}
          height={110}
          className="mb-4"
        />
        <p className=" text-[#6F797A] font-medium text-base">
          Drop or select cover image
        </p>
      </div>

      {/* File Type Info */}
      <div className=" text-center text-sm font-normal text-[#919EAB]">
        <p>Allowed *.jpeg, *.jpg, *.png, *.gif</p>
        <p>max size of 3 Mb</p>
      </div>

      {/* Status Toggle with ShadCN Switch */}
      <div>
        <div className="flex justify-between items-center">
          <p className="text-[#28353D] font-medium text-sm">Status</p>
          <Switch
            checked={isActive}
            onCheckedChange={setIsActive} // ShadCN uses this prop
            className={isActive ? "bg-green-500" : "bg-gray-200"}
          />
        </div>
        <p className="text-gray-500 font-normal text-sm mt-1">
          Current court status
        </p>
      </div>
    </div>
  );
};

export default UploadCourtCard;
