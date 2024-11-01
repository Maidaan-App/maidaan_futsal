"use client";
import React from "react";
import { HeroParallax } from "@/components/hero-parallax";
import { motion } from "framer-motion";
import Bookings from "./Bookings";
import Courts from "./Courts";
import Facilities from "./Facilities";
import { NewsAndEvents } from "./NewsAndEvents";
import { useGetAllPublicCourtsQuery } from "@/store/api/Public/publicCourts";
import {
  useGetPublicFutsalGalleryQuery,
  useGetPublicFutsalProfileQuery,
} from "@/store/api/Public/publicFutsal";
import Loader from "@/components/Loader";

const pageVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export default function ImagesSliderDemo() {
  const { data: CourtsData, isLoading: CourtsDataLoading } =
    useGetAllPublicCourtsQuery("");

  const { data: FutsalProfile, isLoading: FutsalProfileLoading } =
    useGetPublicFutsalProfileQuery("");

  const { data: GalleyData, isLoading: GalleyDataLoading } =
    useGetPublicFutsalGalleryQuery("");

  return (
    <motion.div
      className="bg-[#182b2a] overflow-x-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {CourtsDataLoading || FutsalProfileLoading || GalleyDataLoading ? (
        <div className="flex h-[100vh] items-center justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {FutsalProfile && GalleyData && (
            <HeroParallax
              FutsalProfile={FutsalProfile}
              GalleyData={GalleyData}
            />
          )}

          <StaggeredSection>
            {CourtsData && <Courts CourtsData={CourtsData} />}
            {CourtsData && <Bookings CourtsData={CourtsData} />}
            <Facilities />
            <NewsAndEvents />
          </StaggeredSection>
        </>
      )}
    </motion.div>
  );
}

// Staggered Animation Component
const StaggeredSection = ({ children }: any) => {
  const staggerChildren = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Adjust stagger duration for faster/slower effect
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 }, // Starting from 30px below
    show: { opacity: 1, y: 0 }, // Move to original position
  };

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      animate="show"
      className="py-20"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={childVariants}
          // style={{ marginLeft: `${index * 10}px`, marginBottom: "10px" }} // Creates the staircase effect
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
