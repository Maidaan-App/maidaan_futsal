import { poppins } from "@/app/lib/constants";
import React from "react";

interface Props {
  description: string;
}

const Copyright = () => {
  return (
    <div
      className={`font-normal text-[1rem] text-[#6F797A] text-opacity-60 leading-[1.75rem] text-center lg:text-start ${poppins.className}`}
    >
      © 2024 | maidaan.com
    </div>
  );
};

export default Copyright;
