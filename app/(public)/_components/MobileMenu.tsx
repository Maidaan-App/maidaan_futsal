/* eslint-disable @next/next/no-img-element */
// MobileMenu.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { MINIOURL, montserrat } from "@/lib/constants";
import { FUTSALPROFILE } from "@/lib/types";
import { paths } from "@/lib/paths";

type MobileMenuProps = {
  FutsalProfile: FUTSALPROFILE | undefined;
};
const DURATION = 0.25;
const STAGGER = 0.025;

type FlipLinkProps = {
  children: string;
};

const FlipLink: React.FC<FlipLinkProps> = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hovered"
      className="relative block overflow-hidden whitespace-nowrap text-xs font-bold md:text-2xl"
      style={{ lineHeight: 1 }}
    >
      <div>
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{
              duration: DURATION,
              ease: "easeInOut",
              delay: STAGGER * i,
            }}
            className="inline-block"
            key={i}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ FutsalProfile }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <>
      <div
        className={`flex items-center justify-center ${montserrat.className} pointer  `}
        onClick={toggleMenu}
      >
        {" "}
        <button className="text-white md:hidden p-3 focus:outline-none rounded-s-sm  bg-[#001715]">
          <span className="block w-6 h-0.5 bg-[#feff01] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#feff01] mb-1"></span>
          <span className="block w-6 h-0.5 bg-[#feff01] mb-1"></span>
        </button>
        <p className="p-2 pointer ">
          {" "}
          <FlipLink>MENU</FlipLink>
        </p>
      </div>

      {/* Mobile Menu Canvas */}
      <motion.div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[2000] md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
        initial={{ opacity: 0 }} // Ensure the background is invisible initially
        animate={{ opacity: isOpen ? 1 : 0 }} // Only show when isOpen is true
        exit={{ opacity: 0 }}
        onClick={toggleMenu}
      />

      <motion.div
        className={`fixed top-0 left-0 w-full h-full bg-[#182b2a] text-white p-6 z-[2000] transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        initial={{ x: "-100%" }} // Start the menu off-screen
        animate={{ x: isOpen ? 0 : "-100%" }} // Move it up when opened, and back down when closed
        exit={{ x: "-100%" }} // Slide back down when closed
      >
        {/* Close Button */}
        {/* Close Button */}
        <div
          className={`flex absolute bottom-5 right-[35%] rounded-sm   items-center justify-center bg-[#c1cbc9]    ${montserrat.className} pointer  `}
          onClick={toggleMenu}
        >
          {" "}
          <button className="text-white md:hidden px-4 py-2  focus:outline-none rounded-s-sm  bg-[#001715]">
            <span className="p-0 m-0">X</span>
          </button>
          <p className="px-2 py-1 text-[#001715]  pointer">
            {" "}
            <FlipLink>CLOSE</FlipLink>
          </p>
        </div>

        <ul className="flex flex-col space-y-6">
          <li>
            <a href="#book-now" onClick={(e) => e.preventDefault()}>
              <FlipLink>BOOK-NOW</FlipLink>
            </a>
          </li>
          <li>
            <a href="/gallery">
              <FlipLink>GALLERY</FlipLink>
            </a>
          </li>
          {FutsalProfile && (
            <li>
              <a href="/">
                <img
                  src={`${MINIOURL}${FutsalProfile.image}`}
                  alt="Logo"
                  className="w-14 h-10 object-contain"
                />
              </a>
            </li>
          )}
          <li>
            <a href={paths.public.newsEvents}>
              <FlipLink>NEWS - EVENTS</FlipLink>
            </a>
          </li>
          <li>
            <a href="#contact" onClick={(e) => e.preventDefault()}>
              <FlipLink>CONTACT</FlipLink>
            </a>
          </li>
        </ul>
      </motion.div>
    </>
  );
};

export default MobileMenu;