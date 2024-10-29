"use client";
import React from "react";
import { HeroParallax } from "@/components/hero-parallax";
import { motion } from "framer-motion";
import Bookings from "./Bookings";
import Courts from "./Courts";
import Facilities from "./Facilities";
import { NewsAndEvents } from "./NewsAndEvents";
import Footer from "./Footer";
import { useGetAllPublicCourtsQuery } from "@/store/api/Public/publicCourts";

const sampleProducts = [
  { title: "Product 1", link: "/product1", thumbnail: "/images/futsal.jpg" },
  { title: "Product 2", link: "/product2", thumbnail: "/images/futsal2.jpg" },
  { title: "Product 3", link: "/product3", thumbnail: "/images/futsal3.jpg" },
  { title: "Product 4", link: "/product4", thumbnail: "/images/futsal.jpg" },
  { title: "Product 5", link: "/product5", thumbnail: "/images/futsal2.jpg" },
  { title: "Product 6", link: "/product6", thumbnail: "/images/futsal3.jpg" },
  { title: "Product 7", link: "/product7", thumbnail: "/images/futsal.jpg" },
  { title: "Product 8", link: "/product8", thumbnail: "/images/futsal2.jpg" },
  { title: "Product 9", link: "/product9", thumbnail: "/images/futsal3.jpg" },
  { title: "Product 10", link: "/product10", thumbnail: "/images/futsal.jpg" },
  { title: "Product 11", link: "/product11", thumbnail: "/images/futsal2.jpg" },
  { title: "Product 12", link: "/product12", thumbnail: "/images/futsal3.jpg" },
  { title: "Product 13", link: "/product13", thumbnail: "/images/futsal.jpg" },
  { title: "Product 14", link: "/product14", thumbnail: "/images/futsal2.jpg" },
  { title: "Product 15", link: "/product15", thumbnail: "/images/futsal3.jpg" },
];

const pageVariants = {
  initial: { opacity: 0, y: 100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -50 },
};

export default function ImagesSliderDemo() {
  const { data: CourtsData, isLoading: CourtsDataLoading } =
    useGetAllPublicCourtsQuery("");
  console.log("CourtsData:", CourtsData);
  return (
    <motion.div
      className="bg-[#182b2a] overflow-x-hidden"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <HeroParallax products={sampleProducts} />

      <StaggeredSection>
        <Courts />
        {CourtsData && <Bookings CourtsData={CourtsData} />}
        <Facilities />
        <NewsAndEvents />
      </StaggeredSection>
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
