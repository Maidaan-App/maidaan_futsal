/* eslint-disable @next/next/no-img-element */
"use client";
import { montserrat } from "@/lib/constants";
import React from "react";
import { motion } from "framer-motion";

const Courts = () => {
  return (
    <div
      className={`py-20 mx-20 flex flex-col gap-10 font-medium ${montserrat.className}`}
    >
      {/* Title */}
      <h2 className="text-center text-[#f1f1f1] font-bold text-xl md:text-4xl">
        Our Courts
      </h2>

      {/* Banner Images */}
      <div className="flex flex-col md:flex-row gap-10 w-full justify-between">
        {/* Left Image */}
        <div className="relative w-full md:w-1/2 flex justify-start">
          <motion.img
            src="/images/court.png" // Path to the image in the public directory
            alt="Court1"
            className="w-full h-auto md:w-[650px] md:h-[324px] object-cover object-top rounded-xl"
            initial={{ opacity: 0, x: -100 }} // Start from the left
            animate={{ opacity: 1, x: 0 }} // Slide in to the center
            transition={{ duration: 8 }}
          />
        </div>

        {/* Right Image */}
        <div className="relative w-full md:w-1/2 flex justify-end">
          <motion.img
            src="/images/Court1.jpg" // Path to the image in the public directory
            alt="Court2"
            className="w-full h-auto md:w-[650px] md:h-[324px] object-cover object-top rounded-xl"
            initial={{ opacity: 0, x: 100 }} // Start from the right
            animate={{ opacity: 1, x: 0 }} // Slide in to the center
            transition={{ duration: 8 }}
          />
        </div>
      </div>
    </div>
  );
};

export default Courts;
