"use client";
import React from "react";
import { HeroParallax } from "@/components/hero-parallax";
import { motion } from "framer-motion";
import Bookings from "./Bookings";
import Courts from "./Courts";
import Facilities from "./Facilities";
import { NewsAndEvents } from "./NewsAndEvents";
import Footer from "./Footer";

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
  return (
    <motion.div
      className="bg-[#182b2a]"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <HeroParallax products={sampleProducts} />

      {/* Wrapping each section in motion.div for animations */}
      <SectionAnimation>
        <Courts />
      </SectionAnimation>

      <SectionAnimation>
        <Bookings />
      </SectionAnimation>

      <SectionAnimation>
        <Facilities />
      </SectionAnimation>

      <SectionAnimation>
        <NewsAndEvents />
      </SectionAnimation>

      {/* Footer without padding */}
      <SectionAnimation noPadding>
        <Footer />
      </SectionAnimation>
    </motion.div>
  );
}

// Reusable Section Animation Component
const SectionAnimation = ({
  children,
  noPadding,
}: {
  children: React.ReactNode;
  noPadding?: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 50 }} // Optional: Add exit animation
    transition={{ duration: 0.6, ease: "easeInOut" }}
    viewport={{ once: false }} // Run animation every time it comes into view
    className={noPadding ? "" : "py-20"} // Conditional padding
  >
    {children}
  </motion.div>
);
