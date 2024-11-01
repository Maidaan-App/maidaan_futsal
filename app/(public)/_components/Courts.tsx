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
      <h2 className="text-center text-[#f1f1f1] font-bold text-xl md:text-4xl">
        Our Courts
      </h2>

      {/* Banner Images */}
      <div className="flex flex-col md:flex-row gap-10 w-full justify-between">
        {CourtsData &&
          CourtsData.length > 0 &&
          CourtsData.map((court, index) => (
            <div key={index} className="relative w-full md:w-1/2 flex justify-start">
              <motion.div
                className="relative w-full h-auto md:w-[650px] md:h-[324px] 2xl:w-[800px] 2xl:h-[500px] rounded-xl overflow-hidden"
                initial={{ opacity: 0, x: -100 }} // Start from the left
                animate={{ opacity: 1, x: 0 }} // Slide in to the center
                transition={{ duration: 8 }}
              >
                <img
                  // src="/images/court.png" // Path to the image in the public directory
                  src={`${MINIOURL}${court.image}`}
                  alt="Court1"
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
        {/* Left Image */}
        {/* <div className="relative w-full md:w-1/2 flex justify-start">
          <motion.div
            className="relative w-full h-auto md:w-[650px] md:h-[324px] 2xl:w-[800px] 2xl:h-[500px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -100 }} // Start from the left
            animate={{ opacity: 1, x: 0 }} // Slide in to the center
            transition={{ duration: 8 }}
          >
            <img
              src="/images/court.png" // Path to the image in the public directory
              alt="Court1"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
            <div className="absolute bottom-5 left-5 text-white text-xl font-semibold">
              Court Name 1
            </div>
          </motion.div>
        </div> */}

        {/* Right Image */}
        {/* <div className="relative w-full md:w-1/2 flex justify-end">
          <motion.div
            className="relative w-full h-auto md:w-[650px] md:h-[324px] 2xl:w-[800px] 2xl:h-[500px] rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 100 }} // Start from the right
            animate={{ opacity: 1, x: 0 }} // Slide in to the center
            transition={{ duration: 8 }}
          >
            <img
              src="/images/Court1.jpg" // Path to the image in the public directory
              alt="Court2"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
            <div className="absolute bottom-5 left-5 text-white text-xl font-semibold">
              Court Name 2
            </div>
          </motion.div>
        </div> */}
      </div>
    </div>
  );
};

export default Courts;
