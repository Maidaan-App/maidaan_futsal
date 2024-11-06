/* eslint-disable @next/next/no-img-element */
import { MINIOURL } from "@/lib/constants";
import { LOGOCONFIGURATION } from "@/lib/types";
import React from "react";

interface props {
  ConfigData: LOGOCONFIGURATION;
}

const Heading = ({ ConfigData }: props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      {ConfigData && (
        <img
          src={`${MINIOURL}${ConfigData.logo}`}
          alt="Logo"
          className="w-24 h-24 mb-4"
        />
      )}
      <h1 className="font-bold text-4xl text-center text-gray-800 mb-2">
        Contact Our Friendly Team
      </h1>
      <p className="text-gray-600 text-center text-lg">
        Let us know how we can help.
      </p>
    </div>
  );
};

export default Heading;
