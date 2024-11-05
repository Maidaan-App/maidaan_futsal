/* eslint-disable @next/next/no-img-element */
import React from "react";

const Heading = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-4" />
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
