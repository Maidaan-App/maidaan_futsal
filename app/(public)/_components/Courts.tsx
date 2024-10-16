/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";

const Courts = () => {
  return (
    <div className={`py-52 mx-20 flex flex-col gap-10 font-medium`}>
      {/* Title */}
      <h2 className="text-center text-white font-medium text-xl md:text-2xl">
        Our Courts
      </h2>

      {/* Banner Images */}
      <div className="flex flex-col md:flex-row gap-10 w-full justify-between">
        {/* Left Image */}
        <div className="relative w-full md:w-1/2 flex justify-start">
          <img
            src="/images/Court1.avif" // Path to the image in the public directory
            alt="Lakme"
            className="w-full h-auto md:w-[650px] md:h-[324px] object-cover object-top rounded-xl"
          />
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-1/2 flex justify-end">
          <img
            src="/images/Court2.avif" // Path to the image in the public directory
            alt="Maybelline"
            className="w-full h-auto md:w-[650px] md:h-[324px] object-cover object-top rounded-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Courts;
