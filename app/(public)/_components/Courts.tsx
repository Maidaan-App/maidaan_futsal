/* eslint-disable @next/next/no-img-element */
"use client";
import { MINIOURL, montserrat } from "@/lib/constants";
import React from "react";
import { motion } from "framer-motion";
import { COURT } from "@/lib/types";

interface props {
  CourtsData: COURT[];
}

const Courts = ({ CourtsData }: props) => {
  return (
    <div
      className={`py-20 md:mx-20 mx-10 flex flex-col gap-10 font-medium ${montserrat.className}`}
    >
      {/* Title */}
      <h2 className="text-center text-[#f1f1f1] font-bold text-2xl uppercase md:text-4xl">
        Our Courts
      </h2>

      {/* Courts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
        {CourtsData &&
          CourtsData.length > 0 &&
          CourtsData.map((court, index) => (
            <div
              key={index}
              className={`relative w-full flex justify-start ${
                CourtsData.length % 2 !== 0 && index === CourtsData.length - 1
                  ? "md:col-span-2 md:justify-center" // Center-align the last item if odd
                  : ""
              }`}
            >
              <motion.div
                className="relative w-full md:w-[650px] md:h-[324px] rounded-xl overflow-hidden"
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Alternate starting positions
                animate={{ opacity: 1, x: 0 }} // Slide in to the center
                transition={{ duration: 0.8 }} // Adjust duration as needed
              >
                <img
                  src={`${MINIOURL}${court.image}`}
                  alt={court.name}
                  className="w-full h-full object-cover object-top"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                {/* Court Name */}
                <div className="absolute bottom-5 left-5 text-white text-xl font-semibold">
                  {court.name}
                </div>
              </motion.div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Courts;
