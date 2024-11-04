/* eslint-disable @next/next/no-img-element */
import { MINIOURL, montserrat } from "@/lib/constants";
import React from "react";
import { motion } from "framer-motion";
import { FUTSALPROFILE } from "@/lib/types";
import { paths } from "@/lib/paths";
import TransitionWrapper from "./TransitionWrapper";

type NavbarProps = {
  isScrolled: boolean;
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

const Navbar: React.FC<NavbarProps> = ({ isScrolled, FutsalProfile }) => {
  const handleScrollToSection = (section: string) => {
    // Check if on home page
    if (window.location.pathname === "/") {
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Navigate to home page with the section in the URL
      window.location.href = `/#${section}`;
    }
  };

  return (
    <div
      className={`text-[#f1f1f1] transition-all duration-300 h-20 md:px-20 px-7 flex justify-center ${
        isScrolled
          ? "bg-[#182b2a] bg-opacity-80 backdrop-blur-md shadow-lg"
          : "bg-[#182b2a]"
      }`}
    >
      <ul
        className={`flex w-full justify-between items-center list-none h-full cursor-pointer ${montserrat.className}`}
      >
        <li>
          <a
            href="#book-now"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("book-now");
            }}
          >
            <FlipLink>BOOK-NOW</FlipLink>
          </a>
        </li>
        <li className="hidden md:block">
          <a
            href={paths.public.gallery}
            onClick={() => (window.location.href = paths.public.gallery)}
          >
            <TransitionWrapper key={paths.public.gallery}>
              <FlipLink>GALLERY</FlipLink>
            </TransitionWrapper>
          </a>
        </li>
        {FutsalProfile && (
          <li>
            <a href="/" onClick={() => (window.location.href = "/")}>
              <span className="flex w-20 h-10 items-center">
                <img
                  src={`${MINIOURL}${FutsalProfile.image}`}
                  alt="Logo"
                  className="w-14 md:w-auto"
                />
              </span>
            </a>
          </li>
        )}
        <li className="hidden md:block">
          <a
            href={paths.public.newsEvents}
            onClick={() => (window.location.href = paths.public.newsEvents)}
          >
            <TransitionWrapper key={paths.public.newsEvents}>
              <FlipLink>NEWS - EVENTS</FlipLink>
            </TransitionWrapper>
          </a>
        </li>
        <li>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleScrollToSection("contact");
            }}
          >
            <FlipLink>CONTACT</FlipLink>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
